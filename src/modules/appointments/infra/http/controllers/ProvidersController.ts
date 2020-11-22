import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const listAllProviders = container.resolve(ListAllProvidersService);

    const providers = await listAllProviders.execute({
      user_id,
    });

    return response.json(providers);
  }
}
