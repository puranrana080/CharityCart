function registerUser(event) {
    event.preventDefault()
    const newUser = {
        name: event.target.name.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        password: event.target.password.value,
    }

    axios.post("http://localhost:3000/user/register",newUser)
    .then(response=>{
        console.log('User Added Successfully')
        console.log(response)
        alert("Successfully Signed Up ")
        event.target.reset()
        window.location.href = '/views/login.html'


    })
    .catch(err=>{
        console.log("Server response error",err)
        alert("User already exist")
    })

}