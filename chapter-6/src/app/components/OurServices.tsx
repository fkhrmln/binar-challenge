import Service from './Service';

const ourServicesList = [
  'Sewa Mobil Dengan Supir di Bekasi 12 Jam',
  'Sewa Mobil Lepas Kunci di Bekasi 24 Jam',
  'Sewa Mobil Jangka Panjang Bulanan',
  'Gratis Antar - Jemput Mobil di Bandara',
  'Layanan Airport Transfer / Drop In Out',
];

export default () => {
  return (
    <div id="our-services" className="our-services text-black">
      <div className="container-md pt-5 py-md-5">
        <div className="row flex-column flex-md-row justify-content-center align-items-center row-gap-4 column-gap-5">
          <div className="col-10 col-md-5 text-center">
            <img src="/images/icons/img_person.png" alt="Person" className="img-fluid w-100 h-100" />
          </div>
          <div className="col col-md-5 row p-0 flex-column row-gap-3 row-gap-md-4 py-md-5">
            <h1 className="our-services__heading col">Best Car Rental for any kind of trip in Bekasi!</h1>
            <div className="col d-flex flex-column row-gap-3">
              <p className="our-services__paragraph">
                Sewa mobil di Bekasi bersama Binar Car Rental jaminan harga lebih murah dibandingkan yang lain, kondisi
                mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis, wedding, meeting, dll.
              </p>
              <ul className="our-services__list list-unstyled row flex-column row-gap-3">
                {ourServicesList.map((service, i) => (
                  <Service key={i} service={service} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
