import UserMap from '@modules/users/mappers/UserMap';
import AuthenticateUserSerive from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserSerive);

    const { user, token } = await authenticateUser.execute({ email, password });

    const userWithoutPass = UserMap.UserWithoutPassword(user);
    // delete user.password;

    return response.json({ userWithoutPass, token });
  }
}
