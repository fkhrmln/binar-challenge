import Link from 'next/link';
import Nav from './Nav';

const navList = [
  {
    name: 'Our Services',
    link: '#our-services',
  },
  {
    name: 'Why Us',
    link: '#why-us',
  },
  {
    name: 'Testimonial',
    link: '#testimonial',
  },
  {
    name: 'FAQ',
    link: '#faq',
  },
];

export default () => {
  return (
    <div className="navbar bg-transparent fixed-top navbar-expand-md py-4 px-md-5">
      <div className="container-fluid">
        <Link href="#header">
          <div className="nav__logo mx-md-auto"></div>
        </Link>
        <button
          className="navbar-toggler border-0 p-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas-navbar"
        >
          <i className="bi bi-list"></i>
        </button>
        <div id="offcanvas-navbar" className="offcanvas offcanvas-end w-50" tabIndex={-1} data-bs-scroll="true">
          <div className="offcanvas-header">
            <Link href="#header" className="offcanvas-title">
              <h5>BCR</h5>
            </Link>
            <button type="button" className="border-0 bg-transparent p-0" data-bs-dismiss="offcanvas">
              <i className="bi bi-x"></i>
            </button>
          </div>
          <div className="offcanvas-body py-0">
            <ul className="navbar-nav justify-content-end flex-grow-1 column-gap-md-3 row-gap-2">
              {navList.map(({ name, link }, i) => (
                <Nav key={i} name={name} link={link} />
              ))}
              <li className="nav-item d-flex d-md-block">
                <button type="button">Register</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
