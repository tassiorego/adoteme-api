import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from './UpdateUserProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfileService: UpdateUserProfileService;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserProfileService = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Tássio Rego',
      email: 'tassiorego@gmail.com',
      password: '12345678',
    });

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'Tássio Vinícius Rego de Souza',
      email: 'tassio@example.com',
    });

    expect(updatedUser.name).toBe('Tássio Vinícius Rego de Souza');
    expect(updatedUser.email).toBe('tassio@example.com');
  });

  it('should be able to change update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Tássio Rego',
      email: 'tassiorego@gmail.com',
      password: '12345678',
    });

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'Tássio Rego',
      email: 'tassio@hotmail.com',
      old_password: '12345678',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should return an error when a user does not exist', async () => {
    await expect(
      updateUserProfileService.execute({
        user_id: 'wrong-user-id',
        name: 'Jonh Doe',
        email: 'jonhdoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the email to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Tássio Rego',
      email: 'tassiorego@gmail.com',
      password: '12345678',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '12345678',
    });

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Jonh Doe',
        email: 'tassiorego@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Tássio Rego',
      email: 'tassiorego@gmail.com',
      password: '12345678',
    });

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Tássio Rego',
        email: 'tassio@hotmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Tássio Rego',
      email: 'tassiorego@gmail.com',
      password: '12345678',
    });

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Tássio Rego',
        email: 'tassio@hotmail.com',
        password: '123123',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
