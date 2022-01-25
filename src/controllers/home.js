module.exports = {
    /**
     * 
     * @param {IncomingMessage} req 
     * @param {ServerResponse} res 
     */
    async home(req, res) {
        const cars = await req.storage.getAll(req.query);
        
        res.render('index', { cars, title: 'Carbicle', query: req.query });
    }
}