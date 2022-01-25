module.exports = {
    /**
     * 
     * @param {IncomingMessage} req 
     * @param {ServerResponse} res 
     */
    get(req, res) {
        res.render('create', { title: 'Create car'});
    },
    async post(req, res) {
        const car = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: +req.body.price
        }

        await req.storage.createCar(car);

        res.redirect('/');
    }
}