function loginUser(event){
    event.preventDefault()
    const loginData={
        email:event.target.email.value,
        password:event.target.password.value
    }
    axios.post("http://localhost:3000/user/login",loginData)
    .then(response=>{
        console.log(response)
        alert("User logged in successfully")
        localStorage.setItem('token',response.data.token)
        window.location.href='/profile'
    })
    .catch(error=>{
        console.log("error while logging in server",error)
        // alert("Not logged in ,session expired, try again")
        if (error.response && error.response.data) {
            if (error.response.data.message === "jwt expired") {
                alert("Session expired. Please log in again");
                window.location.href = "views/login";
            } else {
                alert("An error occurred: " + error.response.data.message);
            }
        } else {
            alert("Not logged in, try again.");
        }
    })
}