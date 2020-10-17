import { Repository, getRepository } from 'typeorm';
import Pet from '@modules/pets/infra/typeorm/entities/Pet';
import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import ICreatePetDTO from '@modules/pets/dtos/ICreatePetDTO';

class PetsRepository implements IPetsRepository {
  private ormRepository: Repository<Pet>;

  constructor() {
    this.ormRepository = getRepository(Pet);
  }

  public async create({
    name,
    description,
    size,
    type,
    sex,
    age,
    user_id,
  }: ICreatePetDTO): Promise<Pet> {
    const pet = this.ormRepository.create({
      name,
      description,
      size,
      type,
      sex,
      age,
      user_id,
    });

    await this.ormRepository.save(pet);

    return pet;
  }

  public async findById(id: string): Promise<Pet | undefined> {
    const pet = await this.ormRepository.findOne(id);

    return pet;
  }

  public async findAll(): Promise<Pet[]> {
    const pets = await this.ormRepository.find();

    return pets;
  }

  public async save(pet: Pet): Promise<Pet> {
    return this.ormRepository.save(pet);
  }
}

export default PetsRepository;
