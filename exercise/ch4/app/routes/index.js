module.exports = (express, app) => {

    app.set('view engine', 'ejs');

    let path = require('path')
    let appDir = path.dirname(require.main.filename);
    app.use('/styles/spectre', express.static(`${appDir}/node_modules/spectre.css/dist/`))
    app.use('/styles', express.static(`${appDir}/styles/`))
    app.use('/scripts', express.static(`${appDir}/scripts/`))

    let title = "My Company";
    app.get('/', renderListing);
    app.get('/index', renderListing);
    app.get('/login', (req, res) => { res.render('login', { title: `Login - ${title}` }) });
    app.get('/register', (req, res) => { res.render('register', { title: `Register - ${title}` }) });

    let { check, validationResult } = require('express-validator');
    app.post('/users/create', [
        check('username'),
        check('password').isLength({min: 8}),
        check('email').isEmail()
    ], (req, res) => {

    });
    app.get('/users', [], (req, res) => {

    });

    function renderListing(req, res) {
        res.render('index', { title: `User Listing - ${title}` });
    }
}