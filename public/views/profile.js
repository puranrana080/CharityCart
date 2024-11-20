
function getUserProfileDetails(){
    const token=localStorage.getItem('token')

    axios.get("http://localhost:3000/profile/userDetails",{headers:{"Authorization":token}})
    .then(response=>{
        console.log(response.data.user)
        const user=response.data.user

        document.getElementById('welcome').textContent=`Welcome ${user.userName}`
        document.querySelector('.firstbox-content h5').innerHTML=`${user.userName} <a id="editProfile" href="../views/editprofile.html"><img src="../images/edit.svg" alt=""></a>`
        document.getElementById('useremail').textContent=`${user.userEmail}`
        document.getElementById('phonnumber').textContent=`${user.userPhone}`

document.getElementById('donated').textContent=`$${user.total_donation}`
document.getElementById('joined').textContent=`${user.campaignSupported}`
    })
    .catch(error=>{
        console.log("Interserver error in getting user details")
    })

}




window.addEventListener("DOMContentLoaded",async()=>{
    const token=localStorage.getItem('token')
    if(!token){
        console.log("Token not found")
        return
    }
    getUserProfileDetails()

})





