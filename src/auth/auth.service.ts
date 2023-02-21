import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    // desctructure
    const { username, password } = authCredentialsDto;
    // cari username di database
    const user = await this.usersRepository.findOneBy({ username });
    // cek usernya dan komparasikan password yang diinput dengan di database
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'mission success';
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
