const token = localStorage.getItem("token");

if (!token) {
  const add = document.querySelector(".nav-items");
  const sub = document.createElement("a");
  sub.textContent = "login";
  sub.setAttribute("href", "../views/login.html");
  add.appendChild(sub);
}

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  axios
    .get("http://localhost:3000/cherities", {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log("all checrities", response.data.cherities);
      const charities = response.data.cherities;
      console.log("sa", charities);

      charities.forEach((charity) => {
        console.log(charity);
        displayAllCharities(charity);
      });
      //search filter
      const search = document.querySelector(".search");
      search.addEventListener("keyup", () => {
        const word = search.value.toLowerCase();
        filterCharities(charities, word);
      });
    })
    .catch((err) => {
      console.log("Error fetching charities", err);

      if (err.response && err.response.status === 401) {
        const message = err.response.message;
        if (message === "Token expired. Please login again.") {
          alert("Session expired. Please login again.");
        } else {
          alert("Unauthorized. Please login.");
        }
        localStorage.removeItem("token");
        window.location.href = "/views/login.html";
      } else {
        alert("Something went wrong while loading charities.");
      }
    });
});

function displayAllCharities(charity) {
  const list = document.querySelector(".box-container");

  const col = document.createElement("div");
  col.innerHTML = `<div class="card" style="width: 18rem;">
            <img src="/images/cardimg.avif" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${charity.name}</h5>
              <p class="card-text">${charity.description
                .split(" ")
                .slice(0, 10)
                .join(" ")}</p>
              <a  class="btn btn-primary donate-btn">Donate</a>
            </div>
          </div>`;
  list.appendChild(col);

  col.querySelector(".donate-btn").addEventListener("click", () => {
    window.location.href = `/views/charity-profile.html?charityId=${charity.id}`;
  });
}
function filterCharities(charities, word) {
  const list = document.querySelector(".box-container");
  list.innerHTML = "";

  const filteredCharities = charities.filter(
    (charity) =>
      charity.name.toLowerCase().includes(word) ||
      charity.location.toLowerCase().includes(word) ||
      charity.category.toLowerCase().includes(word)
  );

  filteredCharities.forEach((charity) => displayAllCharities(charity));
}
