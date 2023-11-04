'use client';

import { filterContext } from '@/store/filter';
import { ReactNode, useState } from 'react';

export default ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState({
    tipeDriver: '',
    tanggal: '',
    waktuJemput: '',
    jumlahPenumpang: '',
  });

  const setFilterValue = (filterName: String, filterValue: String) => {
    const newFilter = { ...filter, [`${filterName}`]: filterValue };

    setFilter(newFilter);
  };

  return <filterContext.Provider value={{ filter, setFilterValue }}>{children}</filterContext.Provider>;
};
