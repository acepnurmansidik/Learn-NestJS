import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    // desctructure
    const { username, password } = authCredentialsDto;

    // gen salt
    const salt = await bcrypt.genSalt();
    // hashing password
    const hassPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hassPassword });

    // simpan ke database
    // jika user tersebut belum mendaftar maka simpan datanya ke db, jika sudah kirim pesan error
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
