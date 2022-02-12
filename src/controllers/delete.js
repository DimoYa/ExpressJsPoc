module.exports = {
  /**
   *
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  async get(req, res) {
    const id = req.params.id;
    const car = await req.storage.getById(id);

    if (car.owner != req.session.user.id) {
      return res.redirect('/login');
    }

    if (car) {
      res.render('delete', { title: `Delete car - ${car.name}`, car });
    } else {
      res.redirect('404');
    }
  },
  async post(req, res) {
    const id = req.params.id;
    try {
      if (await req.storage.deleteById(id, req.session.user.id)) {
        res.redirect('/');
      } else {
        return res.redirect('/login');
      }
    } catch (err) {
      console.log(err);
      res.redirect('/404');
    }
  },
};
