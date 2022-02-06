const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const carSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
  description: { type: String, default: "" },
  imageUrl: { type: String, default: "default-car.jpg" },
  price: { type: Number, require: true, min: 0 },
  accessories: { type: [ObjectId], default: [], ref: "Accessory" },
  owner: { type: ObjectId, ref: "User" },
});

const Car = model("Car", carSchema);

module.exports = Car;
