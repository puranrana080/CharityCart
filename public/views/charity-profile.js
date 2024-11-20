

window.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const charityId = urlParams.get('charityId')
    const token = localStorage.getItem('token')
    console.log('CharityId', charityId)
    try {
        const response = await axios.get(`http://localhost:3000/charity/${charityId}/profile`, { headers: { "Authorization": token } })
        console.log("charity by id", response)
        const charity = response.data.charity

        displayCharityProfile(charity)

    }
    catch (error) {
        console.log("error in getiing charity by id", error)
    }
})

function displayCharityProfile(charity) {
    const content = document.getElementById('content')
    const div = document.createElement('div')
    div.className = 'data'
    div.innerHTML = `
    <h1>${charity.name}</h1>
    <p>${charity.description}</p>
    <div>
    <span class="badge rounded-pill text-bg-success">${charity.location}</span>
    <span class="badge rounded-pill text-bg-warning">${charity.category}</span>
    <span class="badge rounded-pill text-bg-primary">${charity.goal}</span>
    </div>
    
    <form class="donateForm">
    <input type="text" id="amount" name="amount" placeholder="Enter Amount $" required>
    <button type="submit" class="donate-Btn btn btn-outline-danger" >Donate</button>
    </form>`
    content.appendChild(div)

}