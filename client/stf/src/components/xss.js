/*
 * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
 * SUMMARY: xss.js
 * This file contains a class of functions relating to protection against 
 * XSS attacks.
 * 
 * AUTHOR: Daniel Hamilton
 * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
*/

export default class xss
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
   * to use in an HTTP request.
   * 
   * INPUTS:
   * danger - String input by the user.
   * 
   * RETURN:
   * safe - Modified input string (danger) after performing sanitation.
   * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
  */
  static sanitize (danger)
  {
    console.log("Sanitizer started (xss.sanitizer): " + danger);

    //var escaped = this.escape(danger);
    //return escaped;
  }

  /*
   * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
   *                                   PRIVATE METHODS
   * +=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
  */

  /*
   * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
   * SUMMARY: xss.escape
   * Replaces the following characters [&<>"'/] with their 
   * 
   * INPUTS:
   * danger - String input by the user.
   * 
   * RETURN:
   * safe - Modified input string (danger) after escaping key characters.
   * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
  */
  escape(danger)
  {
    console.log("Escape function called.");

    // characters recommended for conversion by OWASP XSS Prevention website.
    var conversions = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot',
      "'": '&#x27',
      '/': '&#x2F'
    };

    return danger.replace();
  }
  
}