import { readFileSync, writeFileSync } from 'fs';
import { Car } from '../models/Car.js';
import { v4 as uuidv4 } from 'uuid';

class CarService {
  constructor() {
    this.cars = this.readCarsFile();
  }

  readCarsFile = () => {
    return JSON.parse(readFileSync('./data/cars.json', 'utf-8'));
  };

  writeCarsFile = (data) => {
    return writeFileSync('./data/cars.json', JSON.stringify(data, null, 2));
  };

  getCars = () => {
    return this.cars;
  };

  getCarById = (id) => {
    const car = this.cars.find((car) => car.id === id);

    if (!car) return null;

    return car;
  };

  createNewCar = (car) => {
    const id = uuidv4();

    const newCar = new Car(
      id,
      car.plate || null,
      car.manufacture || null,
      car.model || null,
      car.image || null,
      car.rentPerDay || null,
      car.capacity || null,
      car.description || null,
      car.availableAt || null,
      car.transmission || null,
      car.available || null,
      car.type || null,
      car.year || null,
      car.options || null,
      car.specs || null
    );

    this.cars.push(newCar);

    this.writeCarsFile(this.cars);

    return newCar;
  };

  updateCarById = (id, newData) => {
    const foundCarIndex = this.cars.findIndex((car) => car.id === id);

    if (foundCarIndex === -1) return null;

    this.cars[foundCarIndex] = { ...this.cars[foundCarIndex], ...newData };

    const updatedCar = this.cars[foundCarIndex];

    this.writeCarsFile(this.cars);

    return updatedCar;
  };

  deleteCarById = (id) => {
    const foundCarIndex = this.cars.findIndex((car) => car.id === id);

    if (foundCarIndex === -1) return null;

    const deletedCar = this.cars[foundCarIndex];

    this.cars.splice(foundCarIndex, 1);

    this.writeCarsFile(this.cars);

    return deletedCar;
  };
}

export const carService = new CarService();
