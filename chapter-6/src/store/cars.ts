import { createContext } from 'react';

export interface Car {
  id: string;
  plate: string;
  manufacture: string;
  model: string;
  image: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  availableAt: string;
  transmission: string;
  available: boolean;
  type: string;
  year: number;
  option: string[];
  specs: string[];
}

export interface CarsContext {
  cars: Car[];
}

export const carsContext = createContext<CarsContext | null>(null);
