import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  Res,
  Optional,
  Inject,
} from '@nestjs/common';

import { Request, Response } from 'express';
import RequestWithUser from '../interfaces/request-user.interface';
import { LocalAuthGuard } from '../localAuth.guard';
import { AuthService } from '../services/auth.service';
import JwtAuthenticationGuard from '../jwt-authentication.guard';
import { RegisterDto } from '../dtos/register.dto';
import CreateUserDto from 'src/users/dtos/create-user.dto';
import JwtRefreshGuard from '../jwt-refresh.guard';
import { UsersService } from 'src/users/services/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticationService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(request.user.id);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookiesForLogOut(),
    );
  }

  @Post('register')
  async register(
    @Body() registrationData: CreateUserDto,
  ): Promise<CreateUserDto> {
    return this.authenticationService.register(registrationData);
  }

  @Get('lista')
  @UseGuards(JwtAuthenticationGuard)
  async lista(): Promise<RegisterDto[]> {
    return this.authenticationService.lista();
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
