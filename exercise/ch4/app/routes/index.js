module.exports = (express, app) => {
    let path = require('path')
    let title = "My Company";
    let appDir = path.dirname(require.main.filename);
    app.set('view engine', 'ejs');

    app.use('/styles/spectre', express.static(`${appDir}/node_modules/spectre.css/dist/`))
    app.use('/styles', express.static(`${appDir}/styles/`))
    app.use('/scripts', express.static(`${appDir}/scripts/`))

    app.get('/', renderListing);
    app.get('/index', renderListing);
    app.get('/login', (req, res) => { res.render('login', { title: `Login - ${title}` }) });
    app.get('/register', (req, res) => { res.render('register', { title: `Register - ${title}` }) });
    
    app.post('/register', (req, res) => {

    })

    function renderListing(req, res) {
        res.render('index', { title: `User Listing - ${title}` });
    }
}