import { useState } from 'react';
import ReviewCarousel from './ReviewCarousel';

const reviews = [
  {
    image: 'img_carousel_person.png',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    name: 'John Dee 32, Bromo',
  },
  {
    image: 'img_carousel_person.png',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    name: 'John Dee 32, Bromo',
  },
  {
    image: 'img_carousel_person.png',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    name: 'John Dee 32, Bromo',
  },
];

export default () => {
  return (
    <div id="testimonial">
      <div className="testimonial__container container pt-5 py-md-5">
        <div className="text-center d-flex flex-column row-gap-3 row-gap-md-4 row-cols-md-1 align-items-md-center">
          <h1 className="testimonial__heading">Testimonial</h1>
          <p className="testimonial__paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          </p>
          <div className="testimonial__carousel col-md-8 mt-md-3">
            <div id="carousel-person" className="carousel slide">
              <div className="carousel-inner position-relative">
                {reviews.map(({ image, review, name }, i) => (
                  <ReviewCarousel key={i} image={image} review={review} name={name} />
                ))}
              </div>
              <button
                className="carousel-control-prev align-items-start align-items-md-center mt-4 mt-md-0 opacity-100"
                type="button"
                data-bs-target="#carousel-person"
                data-bs-slide="prev"
              >
                <span>
                  <img src="/images/icons/fi_chevron-left.png" alt="Previous" />
                </span>
              </button>
              <button
                className="carousel-control-next align-items-start align-items-md-center mt-4 mt-md-0 opacity-100"
                type="button"
                data-bs-target="#carousel-person"
                data-bs-slide="next"
              >
                <span>
                  <img src="/images/icons/fi_chevron-right.png" alt="Previous" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
