let express = require('express');
let app = express();
let port = 3000;
// Remedy for sanitization
//      let purify = require('./validation/purify');
// Sets up CSP
//      let responseHeaderConfig = require('./configs/responseHeaderConfig')
//      responseHeaderConfig(app);

app.get('/', (req, res) => {
    console.log(`[${Date.now()}] Connection received.`)
    // Instant XSS
    // http://localhost:3000/?input=%3Cscript%3Ealert(1)%3C/script%3E
    let input = req.query.input;
    if (input) {
        console.log(`Received user input:   ${input}`);
        // Unsanitized string
        let output = `You sent me '${input}'.`;
        // Sanitized string
        // let sanitized = purify.sanitize(input);
        // let output = `You sent me ${sanitized}.`;
        res.send(output);
    } else {
        res.send(`Send me something with <a href='${req.protocol}://${req.hostname}:${port}/?input=Hello+World!'>this link</a>!`);
    }
});

app.listen(port, function () {
    let path = require('path');
    let currentDir = path.basename(path.dirname(require.main.filename));
    console.log(`[${currentDir}] Begin listening on port 3000.`);
})