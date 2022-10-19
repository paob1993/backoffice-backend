import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    login(@Body() user: any) {
        return this.authService.validateUser(user.email, user.password);
    }

    @Get('token-verify')
    tokenVerify(@Query('token') token: string,) {
        return this.authService.tokenVerify(token);
    }
}
