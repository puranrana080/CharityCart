function getUserProfileDetails() {
  const token = localStorage.getItem("token");

  axios
    .get("http://localhost:3000/profile/userDetails", {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response.data.user);
      const user = response.data.user;

      document.getElementById(
        "welcome"
      ).textContent = `Welcome ${user.userName}`;
      document.querySelector(
        ".firstbox-content h5"
      ).innerHTML = `${user.userName} <a id="editProfile" href="../views/editprofile.html"><img src="../images/edit.svg" alt=""></a>`;
      document.getElementById("useremail").textContent = `${user.userEmail}`;
      document.getElementById("phonnumber").textContent = `${user.userPhone}`;

      document.getElementById(
        "donated"
      ).textContent = `$${user.total_donation}`;
      document.getElementById(
        "joined"
      ).textContent = `${user.campaignSupported}`;

      const adminbutton = document.querySelector(".top-right a");

      if (user.role === "Admin") {
        adminbutton.textContent = "Admin Dashboard";
      } else {
        adminbutton.style.display = "none";
        adminbutton.textContent = "";
      }
    })
    .catch((error) => {
      console.log("Interserver error in getting user details");
    });
}

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("Token not found");

    alert("Token not Found, login First");

    window.location.href = "/views/login.html";

    return;
  }
  getUserProfileDetails();

  getUserDonationList();
  document.getElementById('logout').addEventListener('click',()=>{
    localStorage.removeItem('token')
    alert("Logged Out")
    window.location.href = "/views/login.html";

  })
});

function getUserDonationList() {
  const token = localStorage.getItem("token");

  axios
    .get("http://localhost:3000/profile/getMyDonations", {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log("Donation List", response.data.donations);

      const donations = response.data.donations;
      if (donations.length < 1) {
        document.querySelector(".table").textContent = "No donation done yet";
      } else {
        let sno = 1;
        donations.forEach((donation) => {
          displayUserDonationList(donation, sno);
          sno++;
        });
      }
    })
    .catch((error) => {
      console.log("error in server fetching donation", error);
    });
}

function displayUserDonationList(donation, sno) {
  const tbody = document.querySelector(".tbody");

  const tRow = document.createElement("tr");
  tRow.innerHTML = `
                      <th scope="row">${sno}</th>
                        <td>${donation.charity.name}</td>
                        <td>${donation.charity.category}</td>
                        <td>${donation.amount}</td>
                        <td>${donation.status}</td>
                        <td>${donation.date.split("T")[0]}</td>
                        <td> <button class="btn btn-primary btn-sm download-receipt">Download</button>  </td>

    
    `;
  tbody.appendChild(tRow);
  const donwloadBtn = tRow.querySelector(".download-receipt");
  donwloadBtn.addEventListener("click", () => {
    downloadDonationDetails(donation);
  });
}

function downloadDonationDetails(donation) {
  const data = `

    Thank You for your Donation
    Charity Name= ${donation.charity.name}
    Amount:${donation.amount}
    Status:${donation.status}
    Date:${donation.date}
`;
  //creating blob object
  const blob = new Blob([data], { type: "text/plain" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `donation-${donation.charity.name}-${donation.date}.txt`;

  link.click();

  URL.revokeObjectURL(link.href);
}
