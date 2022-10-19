import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MESSAGES } from '../shared/messages';
import { comparePassword } from '../shared/encrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await comparePassword(password, user.password)) {
      return {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        token: this.jwtService.sign({ user: user }),
      }
    }

    throw new HttpException({ error: MESSAGES.INVALID_CREDENTIALS }, HttpStatus.OK);
  }

  async tokenVerify(token: string): Promise<any> {
    if (token) {
      const expiredTime = this.jwtService.verify(token).exp;
      if (expiredTime < new Date().getTime()) {
        return { expired: false };
      } else {
        return { expired: true };
      }
    }
    throw new HttpException({ error: MESSAGES.ERROR_DATA }, HttpStatus.OK);
  }
}
