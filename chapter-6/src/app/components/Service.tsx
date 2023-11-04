export default ({ service }: { service: string }) => {
  return (
    <li className="col">
      <img src="/images/icons/check.png" alt="Check" />
      <span className="col ms-2">{service}</span>
    </li>
  );
};
