const { mapError } = require('../services/util');

module.exports = {
  /**
   *
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  get(req, res) {
    res.render('create', { title: 'Create car' });
  },
  async post(req, res) {
    const car = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl || undefined,
      price: +req.body.price,
      owner: req.session.user.id,
    };

    try {
      await req.storage.createCar(car);
      res.redirect('/');
    } catch (err) {
      res.locals.errors = mapError(err);
      res.render('create', { title: 'Create car', car });
    }
  },
};
