interface Props {
  icon: string;
  title: string;
  description: string;
}

export default ({ icon, title, description }: Props) => {
  return (
    <div className="why-us__card">
      <div>
        <img src={`/images/icons/${icon}`} alt="Icon" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
