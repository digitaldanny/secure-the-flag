const buffer = require("buffer");


function encodeBase64(string) {

    let encodeString = buffer.Buffer.from(string).toString('base64');
    return encodeString;
}

function decodeBase64(encodeString) {
    
    let decodeString = new buffer.Buffer(encodeString,'base64');
    return decodeString.toString('ascii');
}


module.exports = {encodeBase64, decodeBase64};