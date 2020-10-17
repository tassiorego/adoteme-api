import { Repository, getRepository, Not } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByDate(date: Date): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { date },
    });

    return findUser;
  }

  public async create({
    name,
    email,
    password,
    phone,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password, phone });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findAllProviders({
    expept_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (expept_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(expept_user_id),
        },
        select: ['id', 'name', 'email', 'avatar', 'created_at', 'updated_at'],
      });
    } else {
      users = await this.ormRepository.find();
    }
    return users;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
