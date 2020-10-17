import Pet from '../infra/typeorm/entities/Pet';
import ICreatePetDTO from '../dtos/ICreatePetDTO';

export default interface IPetsRepository {
  create(data: ICreatePetDTO): Promise<Pet>;
  findAll(): Promise<Pet[]>;
  findById(id: string): Promise<Pet | undefined>;
  save(user: Pet): Promise<Pet>;
}
