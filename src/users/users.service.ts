import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: BigInt(1),
      nickname: 'john',
      email: 'john@email.com',
      password: 'changeme',
    },
    {
      id: BigInt(2),
      nickname: 'maria',
      email: 'maria@email.com',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
