window.addEventListener("DOMContentLoaded",()=>{
    const token=localStorage.getItem('token')
    axios.get("http://localhost:3000/profile/userDetails",{headers:{"Authorization":token}})
    .then(response=>{
        console.log(response.data.user)
        const user=response.data.user

        document.getElementById('name').value=user.userName
        document.getElementById('phone').value=user.userPhone

    })
    .catch(err=>{
        console.log("inside edit profile",err)
    })
})


function updateUserProfile(event){
    event.preventDefault()
    const token=localStorage.getItem('token')
    const updateData={
        name:event.target.name.value,
        phone:event.target.phone.value
    }

    axios.post("http://localhost:3000/profile/editProfile",updateData,{headers:{"Authorization":token}})
    .then(response=>{
        console.log(response.data)
        alert("User Updated")
        window.location.href='/profile'
    })
    .catch(err=>{
        console.log("Error in updating",err)
    })


}