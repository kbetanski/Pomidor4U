import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenInput } from '../dto/refresh-token-input.dto';
import { RegisterDto } from '../dto/register.dto';
import { Token } from '../models/token.model';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/models/user.model';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UsersService } from 'src/services/users.service';

@Controller('api')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @ApiBody({ type: User, required: true })
  @ApiResponse({ type: Token })
  public async register(@Body() data: RegisterDto): Promise<Token> {
    const { email, password, name } = data;

    return this.authService.createUser({
      email: email.toLowerCase(),
      password,
      name,
    });
  }

  @Post('login')
  @ApiResponse({ type: Token })
  public async login(@Body() data: LoginDto): Promise<Token> {
    const { email, password } = data;

    return this.authService.login(email.toLowerCase(), password);
  }

  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: Token })
  public async refreshToken(@Body() data: RefreshTokenInput): Promise<Token> {
    const { refreshToken } = data;

    return this.authService.refreshToken(refreshToken);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: User })
  public async profile(@Request() req): Promise<User> {
    return this.usersService.user({ id: req.user.id });
  }
}
