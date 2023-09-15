import express from 'express';
import { carController } from '../controllers/CarController.js';

export const carsRouter = express.Router();

carsRouter.get('/', carController.getCars);
carsRouter.post('/', carController.createNewCar);
carsRouter.get('/:id', carController.getCarById);
carsRouter.put('/:id', carController.updateCarById);
carsRouter.delete('/:id', carController.deleteById);
