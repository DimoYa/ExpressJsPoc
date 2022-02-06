const { redirect } = require("express/lib/response");

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
            console.log(error);
            return res.redirect('/register');
        }
    },
    loginGet(req, res) {
        res.render('login', { title: `Login` });
    },
    async loginPost(req, res) {
        try {
            await req.auth.login(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            console.error(err.message);
            res.redirect('/login');
        }
    },
    logout(req, res) {
        req.auth.logout();
        res.redirect('/');
    }
}