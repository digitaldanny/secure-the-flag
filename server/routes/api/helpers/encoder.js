const buffer = require("buffer");


function encodeBase64(string) {
    
    const tokenBuffer =  new buffer.Buffer(string);
    let token = tokenBuffer.toString('base64');

    return token;
}

function decodeBase64(encodeString) {
    
    const stringBuffer = new buffer.Buffer(encodeString ,'base64');
    let decodeString = stringBuffer.toString('ascii');
    return decodeString;
}


module.exports = {encodeBase64, decodeBase64};