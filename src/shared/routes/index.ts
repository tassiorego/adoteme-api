import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import userProfileRoutes from '@modules/users/infra/http/routes/userprofile.routes';
import petsRouter from '@modules/pets/infra/http/routes/pets.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/pets', petsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/users/profile', userProfileRoutes);

export default routes;
