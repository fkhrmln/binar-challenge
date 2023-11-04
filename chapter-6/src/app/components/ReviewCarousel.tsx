interface Props {
  image: string;
  review: string;
  name: string;
}

export default ({ image, review, name }: Props) => {
  return (
    <div className="carousel-item active">
      <div className="carousel-box">
        <div className="d-flex flex-column flex-md-row row-gap-4 px-md-5 column-gap-md-4 align-items-center">
          <div>
            <img src={`/images/icons/${image}`} alt="Person" />
          </div>
          <div className="d-flex flex-column row-gap-4 row-gap-md-1">
            <div className="text-md-start">
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
            </div>
            <div className="text-start">
              <p className="carousel__body mb-1">“{review}”</p>
              <strong className="carousel__author">{name}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
