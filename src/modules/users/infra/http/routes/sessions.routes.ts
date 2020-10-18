import { Router } from 'express';
import AuthenticateUserSerive from '@modules/users/services/AuthenticateUserService';
import UserMap from '@modules/users/mappers/UserMap';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserSerive);

  const { user, token } = await authenticateUser.execute({ email, password });

  const userWithoutPass = UserMap.UserWithoutPassword(user);
  // delete user.password;

  return response.json({ userWithoutPass, token });
});

export default sessionsRouter;
