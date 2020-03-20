/*
 * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
 * SUMMARY: xss.js
 * This file contains a class of functions relating to protection against 
 * XSS attacks.
 * 
 * AUTHOR: Daniel Hamilton
 * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
*/

class Xss
{
  /*
   * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
   *                                    PUBLIC METHODS
   * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
  */

  /*
   * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
   * SUMMARY: xss.sanitize
   * Wraps all sanitation techniques and returns a modified input string that is safe
   * to use in an HTTP request. The sanitation techniques used are listed below:
   * 
   * 1.) Remove dangerous characters (<>"'/&) with alternatives that HTML will not interpret
   *     as a tag.
   * 2.) Remove event handler strings (ONMOUSEOVER, etc.) and HTML tag names (SCRIPT, IMG, IFRAME) 
   *     from possible input recursively until no dangerous keywords are found anymore.
   * 
   * INPUTS: danger - String input by the user.
   * 
   * RETURN: [safe, stringChanged]
   * mod - Modified input string (danger) after performing sanitation.
   * inEqOut - true if the input string being returned unchanged.
   * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
  */
  static sanitize = function(danger)
  {
    try
    {
      var mod;
      mod = Xss.escape(danger); // convert dangerous characters (<>"'/&) with safe alternatives.
      mod = Xss.removeHandlersRec(mod); // recursively remove event handler names (such as ONMOUSEOVER, etc)

      // return a variable that determines if the string had been changed during sanitization.
      if (mod.localeCompare(danger) === 0)
      {
        console.log("Input equals the output");
        return {mod:mod, inEqOut:true}
      }
      return {mod:mod, inEqOut:false};
    }
    catch
    {
      console.log("ERROR (danger): input cannot be sanitized.");
      return {mod:danger, inEqOut:true};
    }
  }

  /*
   * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
   *                                   PRIVATE METHODS
   * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
  */

  /*
   * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
   * SUMMARY: xss.escape
   * Replaces the following characters [&<>"'/] with their safe alternatives that will not
   * be misinterpretted by HTML as a tag.
   * 
   * INPUTS: danger - String input by the user.
   * 
   * RETURN: safe - Modified input string (danger) after escaping key characters.
   * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
  */
  static escape(danger)
  {
    // characters recommended for conversion by OWASP XSS Prevention website.
    var conversions = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    };

    var safe = danger;

    // replace all occurances of dangerous characters to their safe alternatives.
    //return danger.replace(/[&<>"'/]/g, i => conversions[i]);
    for (var key in conversions)
    {
      // create a regular expression to convert all occurances of the dangerous characters.
      var searchMask = key;
      var replaceMask = conversions[key];
      var regEx = new RegExp(searchMask, "gi"); 

      // modify the input string
      safe = safe.replace(regEx, replaceMask);
    }

    return safe;
  }

  /*
   * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
   * SUMMARY: xss.removeHandlersRec
   * Replaces dangerous keywords (ONMOUSEOVER, SCRIPT, IFRAME) with empty space.
   * 
   * INPUTS: danger - String input by the user.
   * 
   * RETURN: safe - Modified input string (danger) after escaping key characters.
   * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
  */
  static removeHandlersRec (danger)
  {
    var mod = danger;
    var modified = false;

    // contains the keywords that this sanitizer function will remove.
    var keywords = 
    [
      'onchange', 'onclick', 'onmouseover', 'onmouseout', 'onkeydown', 'onload', 'onmouseleave', 'onwheel', 'onmouseup',
      'onload', 'onpaste', 'oncopy', 'onreset', 'onerror'
    ];

    // Remove keywords regardless of capitalization and mark 'modified' = true if
    // the string gets modified.
    for (var i = 0; i < keywords.length; i++)
    {

      // create a regular expression to convert all occurances of the dangerous characters.
      var searchMask = keywords[i];
      var replaceMask = ''; // delete the searchmask 
      var regEx = new RegExp(searchMask, "gi"); 

      // modify the input string
      mod = mod.replace(regEx, replaceMask);

      // If the modified string and the original input do not match, a keyword was removed.
      if (mod.localeCompare(danger) !== 0)
      {
        console.log("(Xss.removeHandlerRec) Removed a dangerous keyword!");
        modified = true;
      }
    }

    // Base case (no keywords found).
    if (modified === false)
      return mod;

    // Recursive case (removed keyword, pass through again).
    return Xss.removeHandlersRec(mod);
  }
}

module.exports = {Xss}