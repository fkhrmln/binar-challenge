import Link from 'next/link';

export default () => {
  return (
    <div className="footer container py-md-5">
      <div className="d-flex flex-column row-gap-3 py-5 flex-md-row justify-content-between">
        <div className="footer__address d-flex flex-column row-gap-3">
          <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
          <p>binarcarrental@gmail.com</p>
          <p>081-233-334-808</p>
        </div>
        <div className="footer__nav">
          <ul className="d-flex flex-column row-gap-3">
            <li>
              <Link href="#our-services">Our Services</Link>
            </li>
            <li>
              <Link href="#why-us">Why Us</Link>
            </li>
            <li>
              <Link href="#testimonial">Testimonial</Link>
            </li>
            <li>
              <Link href="#faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="footer__contact d-flex flex-column row-gap-3">
          <p>Connect with us</p>
          <ul className="d-flex column-gap-3">
            <li>
              <img src="/images/icons/icon_facebook.svg" alt="Facebook" />
            </li>
            <li>
              <img src="/images/icons/icon_instagram.svg" alt="Instagram" />
            </li>
            <li>
              <img src="/images/icons/icon_twitter.svg" alt="Twitter" />
            </li>
            <li>
              <img src="/images/icons/icon_mail.svg" alt="Mail" />
            </li>
            <li>
              <img src="/images/icons/icon_twitch.svg" alt="Twitch" />
            </li>
          </ul>
        </div>
        <div className="footer__copyright d-flex flex-column row-gap-3">
          <p>Copyright Binar 2022</p>
          <div className="custom-nav__logo"></div>
        </div>
      </div>
    </div>
  );
};
