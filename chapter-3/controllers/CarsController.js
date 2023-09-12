import { v4 as uuidv4 } from 'uuid';
import { readFile } from '../helpers/readFile.js';
import { writeFile } from '../helpers/writeFile.js';

export const getCars = (req, res) => {
  const cars = readFile('./data/cars.json');

  return res.status(200).json(cars);
};

export const getCarById = (req, res) => {
  const { id } = req.params;

  const cars = readFile('./data/cars.json');

  const car = cars.find((car) => car.id == id);

  return res.status(200).json(car);
};

export const createNewCar = (req, res) => {
  const id = uuidv4();
  const car = req.body;

  const cars = readFile('./data/cars.json');

  const newCar = { id, ...car };

  cars.push(newCar);

  writeFile('./data/cars.json', cars);

  return res.status(201).json(newCar);
};

export const updateCarById = (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  const cars = readFile('./data/cars.json');

  const foundCarIndex = cars.findIndex((car) => car.id === id);

  cars[foundCarIndex] = { ...cars[foundCarIndex], ...newData };

  const updatedCar = cars[foundCarIndex];

  writeFile('./data/cars.json', cars);

  return res.status(200).json(updatedCar);
};

export const deleteCarById = (req, res) => {
  const { id } = req.params;

  const cars = readFile('./data/cars.json');

  const foundCarIndex = cars.findIndex((car) => car.id === id);

  const deletedCar = cars[foundCarIndex];

  cars.splice(foundCarIndex, 1);

  writeFile('./data/cars.json', cars);

  return res.status(200).json(deletedCar);
};
