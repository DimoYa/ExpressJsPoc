const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const accessorySchema = new Schema({
  name: { type: String, require: true, minlength: 3 },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: 'default-accessory.jpg' },
  price: { type: Number, require: true, min: 0 },
  owner: { type: ObjectId, ref: 'User' },
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;
