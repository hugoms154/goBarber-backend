import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import UserMap from '../mappers/UserMap';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const userWithoutPassword = UserMap.UserWithoutPassword(user);

    return userWithoutPassword;
  }
}
