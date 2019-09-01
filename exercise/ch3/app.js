let express = require('express');
let app = express();

let purify = require('./validation/purify');
let responseHeaderConfig = require('./configs/responseHeaderConfig')

responseHeaderConfig(app);

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/profile', (req, res) => {

});

app.listen(3000, function () {
    let path = require('path');
    let currentDir = path.basename(path.dirname(require.main.filename));
    console.log(`[${currentDir}] Begin listening on port 3000.`);
})