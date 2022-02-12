module.exports = {
  /**
   *
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  async details(req, res) {
    const id = req.params.id;
    const data = await req.storage.getById(id);

    if (req.session.user && req.session.user.id == data.owner) {
      data.isOwner = true;
    }

    if (data) {
      res.render('details', { title: `Details - ${data.name}`, data });
    } else {
      res.redirect('/404');
    }
  },
};
