import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UserProfileController from '../controllers/UserProfileController';

const userProfileRoute = Router();
const userProfileController = new UserProfileController();

userProfileRoute.use(ensureAuthenticated);

userProfileRoute.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  userProfileController.update,
);
userProfileRoute.get('/', userProfileController.show);

export default userProfileRoute;
