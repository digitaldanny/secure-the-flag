/*
 * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
 * SUMMARY: xss.js
 * This file contains a class of functions relating to protection against 
 * XSS attacks.
 * 
 * AUTHOR: Daniel Hamilton
 * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
*/

export default class Xss
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
   * RETURN: safe - Modified input string (danger) after performing sanitation.
   * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
  */
  static sanitize (danger)
  {
    try
    {
      var mod;
      mod = Xss.escape(danger); // convert dangerous characters (<>"'/&) with safe alternatives.
      mod = Xss.removeHandlersRec(mod); // recursively remove event handler names (such as ONMOUSEOVER, etc)
      return mod;
    }
    catch
    {
      console.log("ERROR (danger): input cannot be sanitized.");
      return danger;
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
      '/': '&#x2F;',
      ';': ''
    };

    // replace all occurances of dangerous characters to their safe alternatives.
    return danger.replace(/[&<>"'/]/g, i => conversions[i]);
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
    var keywords = 
    [
      'onchange', 'onclick', 'onmouseover', 'onmouseout', 'onkeydown', 'onload', 'onmouseleave', 'onwheel', 'onmouseup',
      'onload', 'onpaste', 'oncopy', 'onreset'
    ];

    // Remove keywords regardless of capitalization and mark 'modified' = true if
    // the string gets modified.
    for (var i = 0; i < keywords.length; i++)
    {
      // remove the dangerous keywords included in the list of keywords above.
      mod = mod.replace(keywords[i], ''); 

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