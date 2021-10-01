import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';

import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { PrismaService } from './services/prisma.service';
import { TasksService } from './services/tasks.service';
import { UsersService } from './services/users.service';

import { SecurityConfig } from './config/config.interface';
import config from './config/config';
import { JwtStrategy } from './jwt.strategy';
import { TasksController } from './controllers/tasks.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
      load: [config],
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');

        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController, TasksController],
  providers: [
    AuthService,
    ConfigService,
    PasswordService,
    PrismaService,
    TasksService,
    UsersService,
    JwtStrategy,
  ],
})
export class AppModule {}
