import { container } from 'tsyringe';
import PetsRepository from '../infra/typeorm/repositories/PetsRepository';
import IPetsRepository from '../repositories/IPetsRepository';

container.registerSingleton<IPetsRepository>('PetsRepository', PetsRepository);
