import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientService } from 'src/library/prisma-client/prisma-client.service';
import { CreateUserDTO } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaClientService) {}

  async create({ email, nickname, password, salt }: CreateUserDTO) {
    return this.prismaService.user.create({
      data: { email: email, nickname: nickname, password: password, salt },
    });
  }

  async findOne(nickname: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: {
        nickname,
      },
    });
  }
}
