import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserProfileService from './ShowUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfile: ShowUserProfileService;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserProfile = new ShowUserProfileService(fakeUsersRepository);
  });

  it('should be able show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Tássio Rego',
      email: 'tassiorego@gmail.com',
      password: '12345678',
    });

    const profile = await showUserProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Tássio Rego');
    expect(profile.email).toBe('tassiorego@gmail.com');
  });

  it('should not be able to show from non-existing user', async () => {
    await fakeUsersRepository.create({
      name: 'Tássio Rego',
      email: 'tassiorego@gmail.com',
      password: '12345678',
    });

    await expect(
      showUserProfile.execute({
        user_id: 'wrong-id-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
