'use client';

import { Car, carsContext } from '@/store/cars';
import { ReactNode, useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

export default ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const getCars = async () => {
      const res = await fetch(`${BASE_URL}/data/cars.min.json`, {
        cache: 'no-store',
      });

      const data: Car[] = await res.json();

      setCars(data);
    };

    getCars();
  }, []);

  return <carsContext.Provider value={{ cars }}>{children}</carsContext.Provider>;
};
