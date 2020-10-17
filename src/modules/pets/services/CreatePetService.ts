import { injectable, inject } from 'tsyringe';
import Pet from '@modules/pets/infra/typeorm/entities/Pet';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICreatePetDTO from '../dtos/ICreatePetDTO';
import IPetsRepository from '../repositories/IPetsRepository';

@injectable()
class CreatePetService {
  constructor(
    @inject('UsersRepository')
    private petsRepository: IPetsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    description,
    age,
    type,
    sex,
    size,
    user_id,
  }: ICreatePetDTO): Promise<Pet> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      sex,
      size,
      type,
      user_id,
    });

    await this.cacheProvider.invalidatePrefix('pets-list');

    return pet;
  }
}

export default CreatePetService;
