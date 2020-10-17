import { v4 as uuid } from 'uuid';
import Pet from '@modules/pets/infra/typeorm/entities/Pet';
import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import ICreatePetDTO from '@modules/pets/dtos/ICreatePetDTO';

class FakePetsRepository implements IPetsRepository {
  private pets: Pet[] = [];

  public async create(userData: ICreatePetDTO): Promise<Pet> {
    const pet = new Pet();

    Object.assign(pet, { id: uuid() }, userData);

    this.pets.push(pet);

    return pet;
  }

  public async findById(id: string): Promise<Pet | undefined> {
    const pet = this.pets.find(findPet => findPet.id === id);

    return pet;
  }

  public async findAll(): Promise<Pet[]> {
    const { pets } = this;

    return pets;
  }

  public async save(pet: Pet): Promise<Pet> {
    const findIndex = this.pets.findIndex(findPet => findPet.id === pet.id);

    this.pets[findIndex] = pet;

    return pet;
  }
}

export default FakePetsRepository;
