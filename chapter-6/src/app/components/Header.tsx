import Link from 'next/link';
import Navbar from './Navbar';

export default () => {
  return (
    <div id="header">
      <Navbar />
      <div className="header row flex-column flex-md-row justify-content-md-between align-items-center row-gap-3">
        <div className="row justify-content-center align-items-center p-0 col">
          <div className="row flex-column row-gap-3 justify-content-center align-items-center col col-md-10">
            <h1 className="header__heading col">Sewa & Rental Mobil Terbaik di kawasan Bekasi</h1>
            <p className="header__paragraph col">
              Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau.
              Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.
            </p>
            <div className="col">
              <Link href="/cars" className="header__button">
                Mulai Sewa Mobil
              </Link>
            </div>
          </div>
        </div>
        <div className="col ps-4 ps-md-0">
          <img src="/images/icons/img_car.png" alt="Car" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};
