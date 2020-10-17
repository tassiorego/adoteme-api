import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePetService from '@modules/pets/services/CreatePetService';

export default class PetsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, age, sex, size, type } = request.body;

    const createPet = container.resolve(CreatePetService);

    const pet = await createPet.execute({
      name,
      description,
      sex,
      size,
      type,
      age,
      user_id: request.user.id,
    });

    return response.json(classToClass(pet));
  }
}
