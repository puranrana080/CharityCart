window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/charity/my-charity", {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log("browser", response.data);
      const myCharity = response.data.myCharity;

      myCharity.forEach((charity) => {
        displayMyCharity(charity);
      });
    })
    .catch((err) => {
      console.log("Error fetching my-charities", err);

      if (err.response && err.response.status === 401) {
        const message = err.response.data.message;

        if (message === "Token expired, please login again") {
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

function displayMyCharity(charity) {
  const list = document.getElementById("mycharity-container");

  const col = document.createElement("div");
  col.innerHTML = `<div class="card " style="width: 18rem;">
            <img src="/images/cardimg.avif" class="card-img-top donate-btn" alt="...">
            <div class="card-body">
              <h5 class="card-title">${charity.name}</h5>
              <p class="card-text">${charity.description
                .split(" ")
                .slice(0, 10)
                .join(" ")}</p>

           <a   class="btn btn-primary donate-btnn">Donate</a>
              
              <a  style="pointer-events: none" class="btn btn-info">${
                charity.isApproved ? "Approved" : "Not Approved yet"
              }</a>
            </div>
          </div>`;

  list.appendChild(col);

  col.querySelector(".donate-btnn").addEventListener("click", () => {
    window.location.href = `/views/charity-profile.html?charityId=${charity.id}`;
  });
}
