class Component {
  constructor() {
    if (this.constructor === Component) {
      throw new Error('Connot Instantiate Abstact Class');
    }
  }

  render() {}
}

class Car extends Component {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    super();
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div class="result-item__image">
        <img src="${this.image}" alt="${this.manufacture} ${this.model}" width="100%" height="100%">
      </div>
      <h1 class="result-item__name">${this.manufacture} ${this.model}</h1>
      <h2 class="result-item__price">Rp ${this.rentPerDay.toLocaleString('id-ID')} / hari</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sit eos eaque et impedit ad repudiandae quisquam sequi consectetur rem culpa iste error voluptate nulla molestias distinctio maiores, tempore libero.<p>
      <div class="result-item__spec d-flex column-gap-2 align-items-center">
        <div>
          <img src="./assets/images/fi_users.svg" />
        </div>
        <p>${this.capacity} orang</p>
      </div>
      <div class="result-item__spec d-flex column-gap-2 align-items-center">
        <div>
          <img src="./assets/images/fi_settings.svg" />
        </div>
        <p>${this.transmission}</p>
      </div>
      <div class="result-item__spec d-flex column-gap-2 align-items-center">
        <div>
          <img src="./assets/images/fi_calendar.svg" />
        </div>
        <p>${this.year}</p>
      </div>
      <button type="button" class="result-item__button">Pilih Mobil</button>
    `;
  }
}
