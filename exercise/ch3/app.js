let express = require('express');
let app = express();

let purify = require('./validation/purify');
let responseHeaderConfig = require('./configs/responseHeaderConfig')

responseHeaderConfig(app);

app.get('/', (req, res) => {
    // Instant XSS
    // http://localhost:3000/?input=%3Cscript%3Ealert(1)%3C/script%3E
    let input = req.query.input;
    // Unsanitized string
    res.send(input);
    // Sanitized string
    // res.send(purify.sanitize(input));
});

app.listen(3000, function () {
    let path = require('path');
    let currentDir = path.basename(path.dirname(require.main.filename));
    console.log(`[${currentDir}] Begin listening on port 3000.`);
})