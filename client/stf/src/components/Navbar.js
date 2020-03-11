import React from 'react'
import Cookies from 'js-cookie'
import authApi from './authApi/authApi'
function Navbar() {
    const Auth = React.useContext(authApi)
    const handleOnClick = () => {
        Auth.setAuth(false);
        Cookies.remove("user");
    }
    return (
        <div>
              <button type="submit" onClick={handleOnClick}>Logout</button>
        </div>
    )
}

export default Navbar
