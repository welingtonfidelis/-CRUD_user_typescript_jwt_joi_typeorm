import { 
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate 
} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor(id: string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}

export default User;