/*
 * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
 * SUMMARY: xssTest.js
 * This script is used to test the Xss.sanitize function on various
 * inputs without running it on the server.
 * 
 * RUNNING SCRIPT:
 * In Powershell terminal, type the following command:
 * node xssTest.js
 * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
*/

const Xss = require('./xss').Xss;

function main()
{
    // These are the input strings to test the Xss.sanitize function on
    var inputs = [
        "<img src='Yer' onError={alert('XSS')}></img>",
        "<img src='' onONERROReRroR={alert('XSS')}></img>"
    ];

    // this array will contain clean outputs of Xss.sanitize
    var outputs = []; 

    for (i = 0; i < inputs.length; i++)
    {
        outputs.push(Xss.sanitize(inputs[i]))
        console.log("-----------------------------");
        console.log("INP:\n" + inputs[i]);
        console.log("\nOUT:\n" + outputs[i].mod);
        console.log("\ninEqOut:\n " + outputs[i].inEqOut);
        console.log("\n");
    }
}

return main();