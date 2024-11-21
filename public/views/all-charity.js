

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

    const list =document.querySelector('.box-container')


    const col=document.createElement('div')
    col.innerHTML=`<div class="card" style="width: 18rem;">
            <img src="/images/cardimg.avif" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${charity.name}</h5>
              <p class="card-text">${charity.description.split(' ').slice(0, 10).join(' ')}</p>
              <a  class="btn btn-primary donate-btn">Donate</a>
            </div>
          </div>`
    list.appendChild(col)

    col.querySelector('.donate-btn').addEventListener('click',()=>{    
            window.location.href = `/views/charity-profile.html?charityId=${charity.id}`
    })


}




