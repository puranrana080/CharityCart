const token = localStorage.getItem("token");

console.log("tooooooooooo", token);
if (!token) {
  console.error("No token found in localStorage. Please log in.");
  alert("Not authorized");
  window.location.href = "/profile";
}

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  axios
    .get("http://localhost:3000/admin/getDashboardData", {
      headers: { Authorization: token },
    })
    .then((response) => {
      const { adminUsers, charities, users } = response.data;

      const adminTBody = document.querySelector("#admin-list");
      const charityTBody = document.querySelector("#charity-list");
      const userTBody = document.querySelector("#user-list");

      adminUsers.forEach((user) => {
        const tRow = document.createElement("tr");
        tRow.innerHTML = `
            <th scope="row">◾️</th>
                    <td>${user.userName}</td>
                    <td>${user.userEmail}</td>
                    <td>${user.userPhone}</td>
                    <td> ${user.role}</td>
            `;
        adminTBody.appendChild(tRow);
      });

      charities.forEach((charity) => {
        const tRow = document.createElement("tr");
        tRow.innerHTML = `
            <th scope="row">◾️</th>
                    <td>${charity.name}</td>
                    <td>${charity.user.userName}</td>
                    <td>${charity.location}</td>
                    <td>${charity.category}</td>
                    <td><input type="button" onclick="approveCharity(${charity.id})" value="Approve"></td>
                    <td><input type="button" onclick="rejectCharity(${charity.id})" value="Reject"></td>
            `;
        charityTBody.appendChild(tRow);
      });

      users.forEach((user) => {
        const tRow = document.createElement("tr");
        tRow.innerHTML = `
            <th scope="row">◾️</th>
                    <td>${user.userName}</td>
                    <td>${user.userEmail}</td>
                    <td>${user.userPhone}</td>
                    <td><input type="button" onclick="promoteUser(${user.id})" value="Make Admin"></td>
            
            `;
        userTBody.appendChild(tRow);
      });
    })
    .catch((err) => {
      console.log("Error in gettign admin data", err);

      if (err.response && err.response.status == 401) {
        const message = err.response.data.message;
        if (message === "Token expired. Please login again.") {
          alert("Your session has expired. Please login again.");
          localStorage.removeItem("token");
          window.location.href = "/views/login.html";
        } else {
          alert("Unauthorized access. Please login.");
          localStorage.removeItem("token");
          window.location.href = "/views/login.html";
        }
      } else {
        alert("You are not authorized, or something went wrong");
      }
    });
});

function promoteUser(id) {
  const token = localStorage.getItem("token");

  axios
    .post(`http://localhost:3000/admin/promoteUser/${id}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
      alert("User Promoted to Admin");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

function approveCharity(id) {
  const token = localStorage.getItem("token");
  console.log("sdfjksbfkjskfhs", token);
  axios
    .post(`http://localhost:3000/admin/approveCharity/${id}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
      alert("Charity Approved");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}
function rejectCharity(id) {
  axios
    .post(`http://localhost:3000/admin/rejectCharity/${id}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
      alert("Charity rejected");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}
