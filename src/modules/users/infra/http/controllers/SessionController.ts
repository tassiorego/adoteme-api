import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSessionsService from '@modules/users/services/CreateSessionsService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessions = container.resolve(CreateSessionsService);

    const { user, token } = await createSessions.execute({ email, password });

    return response.json({ user: classToClass(user), token });
  }
}
