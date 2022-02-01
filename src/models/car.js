const { Schema, model } = require("mongoose");

const carSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: "default-car.jpg" },
  price: { type: Number, require: true, min: 0 },
});

const Car = model('Car', carSchema);

module.exports = Car;