import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { SignInBodyDTO } from './dtos/signInBody.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpBodyDTO } from './dtos/signUpBody.dto';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './constants';
import { plainToInstance } from 'class-transformer';
import { CreateUserDTO } from 'src/users/dtos/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp({ email, password, nickname }: SignUpBodyDTO) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedEmail = await bcrypt.hash(email, salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUserBody = plainToInstance(CreateUserDTO, {
      email: hashedEmail,
      password: hashedPassword,
      nickname,
      salt,
    });

    const user = await this.userService.create(createUserBody);

    const payload = UserDTO.toPlain(user);
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }

  async signIn({ email, password }: SignInBodyDTO) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = UserDTO.toPlain(user);
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }
}
