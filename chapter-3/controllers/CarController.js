import { carService } from '../services/CarService.js';

class CarController {
  getCars = (req, res) => {
    const cars = carService.getCars();

    return res.status(200).json(cars);
  };

  getCarById = (req, res) => {
    const { id } = req.params;

    const car = carService.getCarById(id);

    if (!car) return res.sendStatus(404);

    return res.status(200).json(car);
  };

  createNewCar = (req, res) => {
    const car = req.body;

    const newCar = carService.createNewCar(car);

    return res.status(201).json(newCar);
  };

  updateCarById = (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    const updatedCar = carService.updateCarById(id, newData);

    if (!updatedCar) return res.sendStatus(404);

    return res.status(200).json(updatedCar);
  };

  deleteById = (req, res) => {
    const { id } = req.params;

    const deletedCar = carService.deleteCarById(id);

    if (!deletedCar) return res.sendStatus(404);

    return res.status(200).json(deletedCar);
  };
}

export const carController = new CarController();
