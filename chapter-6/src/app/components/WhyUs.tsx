import WhyUsCard from './WhyUsCard';

const whyUsItems = [
  {
    icon: 'icon_complete.png',
    title: 'Mobil Lengkap',
    description: 'Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat',
  },
  {
    icon: 'icon_price.png',
    title: 'Harga Murah',
    description: 'Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain',
  },
  {
    icon: 'icon_24hrs.png',
    title: 'Layanan 24 Jam',
    description: 'Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu',
  },
  {
    icon: 'icon_professional.png',
    title: 'Sopir Profesional',
    description: 'Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu',
  },
];

export default () => {
  return (
    <div id="why-us" className="why-us">
      <div className="container pt-5 py-md-5">
        <div className="text-center text-md-start d-flex flex-column row-gap-3 row-gap-md-4">
          <h1 className="why-us__heading">Why Us?</h1>
          <p className="why-us__paragraph">Mengapa harus pilih Binar Car Rental?</p>
          <div className="d-flex flex-column row-gap-3 column-gap-md-4 mt-3 flex-md-row">
            {whyUsItems.map(({ icon, title, description }, i) => (
              <WhyUsCard key={i} icon={icon} title={title} description={description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
