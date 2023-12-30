import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { SignInBodyDTO } from './dtos/signInBody.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
