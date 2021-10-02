import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  Res,
} from '@nestjs/common';
import RegisterDto from '../dtos/register.dto';
import { Request, Response } from 'express';
import RequestWithUser from '../interfaces/request-user.interface';
import { LocalAuthGuard } from '../localAuth.guard';
import { AuthService } from '../services/auth.service';
import JwtAuthenticationGuard from '../jwt-authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto): Promise<RegisterDto> {
    return this.authenticationService.register(registrationData);
  }

  @Get('lista')
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
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
