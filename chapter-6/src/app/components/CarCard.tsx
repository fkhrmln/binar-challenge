import { Car } from '@/store/cars';
import { BASE_URL } from '../utils/constants';

export default ({ car }: { car: Car }) => {
  return (
    <div className="result-item">
      <div className="result-item__image">
        <img
          src={`${BASE_URL}/public/${car.image.split('./')[1]}`}
          alt={`${car.manufacture} ${car.model}`}
          width="100%"
          height="100%"
        />
      </div>
      <div className="result-item__container">
        <div className="d-flex flex-column row-gap-2">
          <h1 className="result-item__name">
            {car.manufacture} {car.model}
          </h1>
          <h2 className="result-item__price">Rp {car.rentPerDay.toLocaleString('id-ID')} / hari</h2>
          <p>{car.description}</p>
          <div className="result-item__spec d-flex column-gap-2 align-items-center">
            <div>
              <img src="/images/icons/fi_users.svg" />
            </div>
            <p>{car.capacity} orang</p>
          </div>
          <div className="result-item__spec d-flex column-gap-2 align-items-center">
            <div>
              <img src="/images/icons/fi_settings.svg" />
            </div>
            <p>{car.transmission}</p>
          </div>
          <div className="result-item__spec d-flex column-gap-2 align-items-center">
            <div>
              <img src="/images/icons/fi_calendar.svg" />
            </div>
            <p>{car.year}</p>
          </div>
          <div className="result-item__spec d-flex column-gap-2 align-items-center">
            <div>
              <img src="/images/icons/fi_calendar.svg" />
            </div>
            <p>
              {new Date(car.availableAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              })}
            </p>
          </div>
        </div>
        <button type="button" className="result-item__button">
          Pilih Mobil
        </button>
      </div>
    </div>
  );
};
