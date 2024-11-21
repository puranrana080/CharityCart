window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token')
    axios.get("http://localhost:3000/charity/my-charity", { headers: { "Authorization": token } })
        .then(response => {
            console.log("browser", response.data)
            const myCharity = response.data.myCharity

            myCharity.forEach((charity) => {
                displayMyCharity(charity)
            })
        })
        .catch(err => {
            console.log("browser error", err)
        })
})

function displayMyCharity(charity) {

    const list = document.getElementById('mycharity-container')

    const col = document.createElement('div')
    col.innerHTML = `<div class="card" style="width: 18rem;">
            <img src="/images/cardimg.avif" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${charity.name}</h5>
              <p class="card-text">${charity.description.split(' ').slice(0, 10).join(' ')}</p>
              <a  class="btn btn-primary donate-btn">Donate</a>
            </div>
          </div>`

    list.appendChild(col)


    col.querySelector('.donate-btn').addEventListener('click', () => {

        window.location.href = `/views/charity-profile.html?charityId=${charity.id}`
    })






}