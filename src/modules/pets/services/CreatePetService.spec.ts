import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';

import CreatePetService from './CreatePetService';

let fakePetsRepository: FakePetsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createPet: CreatePetService;

describe('CreatePet', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createPet = new CreatePetService(fakePetsRepository, fakeCacheProvider);
  });

  it('should be able to create a new pet', async () => {
    const pet = await createPet.execute({
      name: 'Boris',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      size: 'medium',
      sex: 'M',
      age: 0.3,
      type: 'dog',
      user_id: '3445',
    });

    expect(pet).toHaveProperty('id');
  });
});
