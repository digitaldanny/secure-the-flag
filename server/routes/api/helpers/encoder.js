const buffer = require("buffer");


function encodeBase64(string) {

    let encodeString = buffer.Buffer.from(string).toString('base64');
    return encodeString;
}

function decodeBase64(encodeString) {
    
    let decodeString = buffer.Buffer.from(encodeString,'base64').toString('ascii');
    return decodeString;
}


module.exports = {encodeBase64, decodeBase64};