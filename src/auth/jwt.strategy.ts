import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {
    super({
      secretOrKey: 'v3ryT0ps3cr3t',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    // desctructure payload yang dikirim dari header
    const { username } = payload;
    // cek availabale username di database
    const user: User = await this.userRepository.findOneBy({ username });
    // cek jika tidak ada, kirim pesan unauthorize
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
