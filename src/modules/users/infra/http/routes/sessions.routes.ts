import { Router } from 'express';
import AuthenticateUserSerive from '@modules/users/services/AuthenticateUserService';
import UserMap from '@modules/users/mappers/UserMap';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserSerive(usersRepository);

  const { user, token } = await authenticateUser.execute({ email, password });

  const userWithoutPass = UserMap.UserWithoutPassword(user);
  // delete user.password;

  return response.json({ userWithoutPass, token });
});

export default sessionsRouter;
