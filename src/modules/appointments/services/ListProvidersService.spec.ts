import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListAllProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listAllProviders: ListAllProvidersService;

describe('listProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listAllProviders = new ListAllProvidersService(fakeUsersRepository);
  });

  it('should be able to show the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'diego',
      email: 'diego@rocketseat.com.br',
      password: 'password',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'diego3',
      email: 'diego3@rocketseat.com.br',
      password: 'password',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'diego4',
      email: 'diego4@rocketseat.com.br',
      password: 'password',
    });

    const providers = await listAllProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
