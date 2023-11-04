'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { Car, carsContext } from '@/store/cars';
import { filterContext } from '@/store/filter';

export default () => {
  const filterCtx = useContext(filterContext);
  const carsCtx = useContext(carsContext);

  const { filter, setFilterValue } = filterCtx ?? {
    filter: {
      tipeDriver: '',
      tanggal: '',
      waktuJemput: '',
      jumlahPenumpang: '',
    },
  };

  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  useEffect(() => {
    setFilteredCars(carsCtx?.cars!);
  }, [carsCtx?.cars]);

  const filterHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullDate = new Date(`${filter.tanggal}T${filter.waktuJemput}`).getTime() / 1000;

    const filteredData = carsCtx?.cars.filter(
      (car) =>
        car.available &&
        car.capacity >= (Number(filter.jumlahPenumpang) || 0) &&
        new Date(car.availableAt).getTime() / 1000 >= fullDate
    );

    setFilteredCars(filteredData!);
  };

  return (
    <>
      <Header />
      <div className="search mx-auto d-flex flex-column row-gap-5 container">
        <form
          onSubmit={filterHandler}
          className="shadow-sm py-4 px-4 d-flex justify-content-between column-gap-3 bg-white"
        >
          <div className="search__filter d-flex flex-column row-gap-1">
            <label htmlFor="tipe-driver">Tipe Driver</label>
            <select
              id="tipe-driver"
              name="tipe-driver"
              required
              onChange={(e) => setFilterValue!('tipeDriver', e.target.value)}
            >
              <option value="">Pilih Tipe Supir</option>
              <option value="dengan-supir">Dengan Supir</option>
              <option value="tanpa-supir">Tanpa Supir (Lepas Kunci)</option>
            </select>
          </div>
          <div className="search__filter d-flex flex-column row-gap-1">
            <label htmlFor="tanggal">Pilih Tanggal</label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              required
              onChange={(e) => setFilterValue!('tanggal', e.target.value)}
            />
          </div>
          <div className="search__filter d-flex flex-column row-gap-1">
            <label htmlFor="waktu-jemput">Waktu Jemput/Ambil</label>
            <select
              id="waktu-jemput"
              name="waktu-jemput"
              required
              onChange={(e) => setFilterValue!('waktuJemput', e.target.value)}
            >
              <option value="">Pilih Waktu</option>
              <option value="08:00">08.00 WIB</option>
              <option value="09:00">09.00 WIB</option>
              <option value="10:00">10.00 WIB</option>
              <option value="11:00">11.00 WIB</option>
              <option value="12:00">12.00 WIB</option>
            </select>
          </div>
          <div className="search__filter d-flex flex-column row-gap-1 position-relative">
            <label>Jumlah Penumpang (optional)</label>
            <input
              type="text"
              id="jumlah-penumpang"
              name="jumlah-penumpang"
              placeholder="Jumlah Penumpang"
              onChange={(e) => setFilterValue!('jumlahPenumpang', e.target.value)}
            />
            <div className="user-icon position-absolute">
              <img src="/images/icons/fi_users.svg" alt="User" />
            </div>
          </div>
          <div className="search__filter d-flex flex-column row-gap-1">
            <label className="opacity-0">Hehehe</label>
            <button type="submit" id="load-btn" className="search__button">
              Cari Mobil
            </button>
          </div>
        </form>
        <div id="cars-container" className="result">
          {filteredCars.length !== 0 && filteredCars.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      </div>
      <Footer />
    </>
  );
};
