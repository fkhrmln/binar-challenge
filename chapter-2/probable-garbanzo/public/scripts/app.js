class App {
  constructor() {
    // this.clearButton = document.getElementById('clear-btn');
    this.loadButton = document.getElementById('load-btn');
    this.carContainerElement = document.getElementById('cars-container');
    this.tipeDriver = document.getElementById('tipe-driver');
    this.tanggal = document.getElementById('tanggal');
    this.waktuJemput = document.getElementById('waktu-jemput');
    this.jumlahPenumpang = document.getElementById('jumlah-penumpang');
  }

  async init() {
    await this.load();

    // this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = async () => {
    this.clear();

    const tanggal = this.tanggal.value;
    const waktuJemput = this.waktuJemput.value;
    const jumlahPenumpang = this.jumlahPenumpang.value;
    const fullDate = new Date(`${tanggal}T${waktuJemput}`).getTime() / 1000;

    const filter = (car) =>
      car.available && car.capacity >= jumlahPenumpang && new Date(car.availableAt).getTime() / 1000 >= fullDate;

    const cars = await Binar.listCars(filter);

    if (!cars.length) {
      this.carContainerElement.classList.add('result__not-found');

      const node = document.createElement('h3');
      node.classList.add('not-found');
      node.textContent = 'Not Found !';
      this.carContainerElement.appendChild(node);

      return;
    }

    cars.forEach((available, capacity, availableAt) => console.log(available, capacity, availableAt));

    Car.init(cars);

    Car.list.forEach((car) => {
      const node = document.createElement('div');
      node.classList.add('result-item');
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();

    Car.init(cars);
  }

  async loadFilteredCars() {
    const cars = await Binar.listCars();
  }

  clear = () => {
    this.carContainerElement.classList.remove('result__not-found');

    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
