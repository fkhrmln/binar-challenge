import express from 'express';
import { createNewCar, deleteCarById, getCarById, getCars, updateCarById } from '../controllers/CarsController.js';

export const carsRouter = express.Router();

carsRouter.get('/', getCars);
carsRouter.post('/', createNewCar);
carsRouter.get('/:id', getCarById);
carsRouter.put('/:id', updateCarById);
carsRouter.delete('/:id', deleteCarById);
