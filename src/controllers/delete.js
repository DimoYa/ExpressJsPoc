module.exports = {
    /**
     * 
     * @param {IncomingMessage} req 
     * @param {ServerResponse} res 
     */
    async get(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);

        if (car) {
            res.render('delete', { title: `Delete car - ${car.name}`, car });
        } else {
            res.redirect('404');
        }
    },
    async post(req, res) {
        try {
            const id = req.params.id;
            await req.storage.deleteById(id);
            res.redirect('/');
        } catch (err) {
            res.redirect('/404');
        }
    }
}
