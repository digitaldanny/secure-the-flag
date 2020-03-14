module.exports = {
    signupURL: `${process.env.REACT_APP_BASE_API_URL}/users/signup`||"http://localhost:5000/api/users/signup" ,
    signinURL: `${process.env.REACT_APP_BASE_API_URL}/users/signin`||"http://localhost:5000/api/users/signin",
    postURL: `${process.env.REACT_APP_BASE_API_URL}/api/post/`||"http://localhost:5000/api/post/" 
}
