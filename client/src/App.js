import React from 'react';
import Routes from './components/Routes';
import authApi from './components/authApi/authApi';
import Cookies from 'js-cookie'


function App() {
  const [auth, setAuth] = React.useState(false);
  const readCookie = () =>{
    const user = Cookies.get("user");
    if(user){
      setAuth(true);
    }
  }
  React.useEffect(() => {
    readCookie();
  },[])
  return (
    <div className="App">
      <authApi.Provider value={{auth,setAuth}}>
  <Routes/>
  </authApi.Provider>
    </div>
  );
}

export default App;
