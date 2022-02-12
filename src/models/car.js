const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const carSchema = new Schema({
  name: { type: String, minlength: [3, 'Car name should be at least 3 chars'] },
  description: { type: String, default: '' },
  imageUrl: {
    type: String,
    default: 'default-car.jpg',
    match: [/^https?:\/\//, 'Image URL must be a valid URL'],
  },
  price: { type: Number, require: true, min: 0 },
  accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
  owner: { type: ObjectId, ref: 'User' },
});

const Car = model('Car', carSchema);

module.exports = Car;
