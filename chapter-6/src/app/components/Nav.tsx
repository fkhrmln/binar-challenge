import Link from 'next/link';

interface Props {
  name: string;
  link: string;
}

export default ({ name, link }: Props) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" href={link}>
        {name}
      </Link>
    </li>
  );
};
