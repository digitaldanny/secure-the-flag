// This is a shared variable between SignIn and Dashboard so that the 
// dashboard welcome page can display the username as an XSS vulnerability.
var LoggedInUser = {username:"DefaultUser1"}; 
export default LoggedInUser;