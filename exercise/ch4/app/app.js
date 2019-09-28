let express = require('express')
let app = express();
let port = 3000;

// database connection
require('./db')();

// configure logging
let morgan = require('morgan');
app.use(morgan('combined'));

// configure helmet
require('./configs')(app);

// routing
require("./routes")(express, app)

app.listen(port, function () {
    let path = require('path');
    let currentDir = path.basename(path.dirname(require.main.filename));
    console.log(`[${currentDir}] Begin listening on port 3000.`);
})