let helmet = require('helmet');

function responseHeaderconfig(app) {
    app.use(helmet.xssFilter());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'none'"],
            scriptSrc: ["'self'", "code.getmdl.io"],
            styleSrc: ["'self'", "code.getmdl.io"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            reportUri: "/cspviolation"
        },
    }));
}

module.exports = responseHeaderconfig;