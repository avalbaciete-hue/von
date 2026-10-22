import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    if (!data.username || !data.password) {
      throw new BadRequestException('Username and password are required');
    }

    const existing = await this.usersService.findByUsername(data.username);
    if (existing) {
      throw new BadRequestException('Username already taken');
    }

    return this.usersService.createUser(data.username, data.password, data.role);
  }

  async login(data: any) {
    if (!data.username || !data.password) {
      throw new BadRequestException('Username and password are required');
    }

    const user = await this.usersService.findByUsername(data.username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.usersService.setRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}