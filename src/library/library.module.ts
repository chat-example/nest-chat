import { DynamicModule, Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-client/prisma-client.service';

@Module({})
export class LibraryModule {
  static register(): DynamicModule {
    return {
      module: LibraryModule,
      global: true,
      providers: [PrismaClientService],
      exports: [PrismaClientService],
    };
  }
}
