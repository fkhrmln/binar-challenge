import { createContext } from 'react';

export interface Filter {
  tipeDriver: String;
  tanggal: String;
  waktuJemput: String;
  jumlahPenumpang: String;
}

export interface FilterContext {
  filter: Filter;
  setFilterValue: (filterName: String, filterValue: String) => void;
}

export const filterContext = createContext<FilterContext | null>(null);
