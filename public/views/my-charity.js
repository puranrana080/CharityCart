window.addEventListener("DOMContentLoaded",()=>{
    const token=localStorage.getItem('token')
    axios.get("http://localhost:3000/charity/my-charity",{headers:{"Authorization":token}})
    .then(response=>{
        console.log("browser",response.data)
        const myCharity=response.data.myCharity

        myCharity.forEach((charity) => {
            displayMyCharity(charity)
        })
    })
    .catch(err=>{
        console.log("browser error",err)
    })
})

function displayMyCharity(charity){
    const list=document.getElementById('listofcharities')

    const newCharity=document.createElement('li')
    newCharity.textContent=`Name: ${charity.name}  Description: ${charity.description}`

    list.appendChild(newCharity)


}