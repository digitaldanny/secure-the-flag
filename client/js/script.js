window.onload = function(){ 
    document.getElementById('submit').onclick = submit_signup;



    function submit_signup() {
        // e.preventDefault();
      var email = document.getElementById("email");
      var username = document.getElementById("username");
      var password = document.getElementById("password");
      var confirmpassword = document.getElementById("confirmpassword");
     
    
      var entry = {
        email: email.value,
        username: username.value,
        password: password.value,
        confirmpassword: confirmpassword.value
      };
      
      fetch('http://localhost:5000/api/users/signup', {
        method: "POST",
        body: JSON.stringify(entry),
        cache: "no-cache",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
        })
      })
      .then(function(response) {
        
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status code: ${response.status}`);
          return;
        }
        
        console.log(response.body)
        
        // window.location.href = 'dashboard.html';
      })
      .catch(function(error) {
        console.log("Fetch error: " + error);
    });
    }
};