const Car = require("../models/car");

async function getById(id) {
  const car = await Car.findById(id);

  if (car) {
    return carViewModel(car);
  } else {
    return undefined;
  }
}

async function createCar(car) {
  const result = new Car(car);
  await result.save();
}

async function editById(id, car) {
    const existing = await Car.findById(id);

    existing.name = car.name;
    existing.description = car.description;
    existing.imageUrl = car.imageUrl || undefined;
    existing.price = car.price;
    existing.accessories = car.accessories;
}

async function deleteById(id) {
  await Car.findByIdAndDelete(id);
}

async function getAll(query) {
  const options = {};

  if (query.search) {
    options.name = new RegExp(query.search, "i");
  }

  if (query.from) {
    options.price = { $gte: Number(query.from) };
  }

  if (query.to) {
    if (!options.price) {
      options.price = {};
    }
    options.price = { $lte: Number(query.to) };
  }

  const cars = await Car.find(options);
  return cars.map((car) => carViewModel(car));
}

function carViewModel(car) {
  return {
    id: car._id,
    name: car.name,
    description: car.description,
    imageUrl: car.imageUrl,
    price: car.price,
  };
}

module.exports = () => (req, res, next) => {
  req.storage = {
    getAll,
    getById,
    createCar,
    editById,
    deleteById,
    getAll,
  };
  next();
};
