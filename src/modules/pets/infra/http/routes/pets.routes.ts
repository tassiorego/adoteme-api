import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PetsController from '../controllers/PetsController';

const petsRouter = Router();
const petsController = new PetsController();

petsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string().required(),
      sex: Joi.string().required(),
      age: Joi.number().required(),
      type: Joi.string().required(),
      size: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  petsController.create,
);

export default petsRouter;
