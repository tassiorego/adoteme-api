import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';

export default class UserProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateUserProfile = container.resolve(UpdateUserProfileService);

    const user = await updateUserProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUserProfile = container.resolve(ShowUserProfileService);

    const user = await showUserProfile.execute({
      user_id,
    });

    return response.json(classToClass(user));
  }
}
