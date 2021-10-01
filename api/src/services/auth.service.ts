import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';

import { SecurityConfig } from '../config/config.interface';
import { Token } from '../models/token.model';
import { PasswordService } from './password.service';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  public async login(email: string, password: string): Promise<Token> {
    const user = await this.usersService.user({ email });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.id,
    });
  }

  public async createUser(data: Prisma.UserCreateInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      data.password,
    );

    try {
      const user = await this.usersService.createUser({
        ...data,
        password: hashedPassword,
      });

      return this.generateTokens({
        userId: user.id,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${data.email} already used.`);
      } else {
        throw new Error(e);
      }
    }
  }

  public async validateUser(userId: number): Promise<User> {
    return this.usersService.user({ id: userId });
  }

  public async getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];

    return this.usersService.user({ id });
  }

  public generateTokens(payload: { userId: number }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: number }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: number }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  public async refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
