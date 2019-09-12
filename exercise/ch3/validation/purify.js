const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

module.exports = {
    sanitize: function (input) {
        let sanitizedInput = DOMPurify.sanitize(input);
        console.log(`DOM purified output:   ${sanitizedInput}`);
        let escapedInput = sanitizedInput.
            replace(/&/g, '&amp;').
            replace(/</g, '&lt;').
            replace(/"/g, '&quot;').
            replace(/'/g, '&#039;');
        console.log(`HTML escaped output:   ${escapedInput}`);
        return escapedInput;
    }
}