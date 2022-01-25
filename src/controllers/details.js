module.exports = {
    /**
     * 
     * @param {IncomingMessage} req 
     * @param {ServerResponse} res 
     */
    async details(req, res) {
        const id = req.params.id;
        const data = await req.storage.getById(id);

        if (data) {
            res.render('details', { title: `Details - ${data.name}`, data });
        } else {
            res.redirect('/404');
        }
    }
}