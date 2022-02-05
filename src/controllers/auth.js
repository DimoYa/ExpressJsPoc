module.exports = {
    registerGet(req, res) {
        res.render('register', { title: `Register` });
    },
    registerPost(req, res) {
        if (req.body.username == '' || req.body.password == '') {
            return res.redirect('/register');
        }
        if (req.body.password !== req.body.repeatPassword) {
            return res.redirect('/register');
        }
        try {
            req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
            
        } catch (error) {
            return res.redirect('/register');
            console.log(error);
        }
    },
    loginGet(req, res) {
        res.render('login', { title: `Login` });
    },
    loginPost(req, res) {

    }
}