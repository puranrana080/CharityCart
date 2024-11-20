

window.addEventListener('DOMContentLoaded',()=>{
    const token=localStorage.getItem('token')

    axios.get('http://localhost:3000/cherities',{headers:{"Authorization":token}})
    .then(response=>{
        console.log("all checrities",response.data.cherities)
        const charities=response.data.cherities
        console.log("sa",charities)

        charities.forEach((charity) => {
            console.log(charity)
            displayAllCharities(charity)
        })
    })
    .catch(err=>{
        console.log(err)
    })

})


function displayAllCharities(charity){

    const list =document.getElementById('listofcharities')

    const newCharity=document.createElement('li')
    newCharity.textContent=`Name: ${charity.name}  Description: ${charity.description}`

    list.appendChild(newCharity)

}

