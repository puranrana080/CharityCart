window.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const charityId = urlParams.get("charityId");
  const token = localStorage.getItem("token");
  console.log("CharityId", charityId);
  localStorage.setItem("charityId", charityId);
  try {
    const response = await axios.get(
      `http://localhost:3000/charity/${charityId}/profile`,
      { headers: { Authorization: token } }
    );
    console.log("charity by id", response);
    const charity = response.data.charity;

    document.querySelector("#charityName").textContent = `${charity.name}`;
    document.querySelector("#desc").textContent = `${charity.description}`;
    document.querySelector(".span1").textContent = `${charity.location}`;
    document.querySelector(".span2").textContent = `${charity.category}`;
    document.querySelector(".span3").textContent = `${charity.goal}`;
  } catch (error) {
    console.log("error in getiing charity by id", error);

    if (err.response && err.response.status === 401) {
      const message = err.response.data.message;

      if (message === "Token expired. Please login again.") {
        alert("Session expired. Please login again.");
      } else {
        alert("Unauthorized. Please login.");
      }

      localStorage.removeItem("token");
      window.location.href = "/views/login.html";
    } else {
      alert("Something went wrong while loading profile.");
    }
  }
});

const form = document.querySelector(".donateForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const amount = form.amount.value;
  const charityId = localStorage.getItem("charityId");

  const token = localStorage.getItem("token");

  try {
    //creating order in payment gateway
    const response = await axios.post(
      `http://localhost:3000/charity/${charityId}/donate`,
      { amount },
      { headers: { Authorization: token } }
    );
    console.log("Razorpay order created", response);

    //once created order now redirect to  rzp page
    var options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async function (response) {
        await axios.post(
          "http://localhost:3000/charity/donate/updateDonationStatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          {
            headers: { Authorization: token },
          }
        );
        alert("Thank you for your donation");
        window.location.href = "/profile";
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();

    rzp1.on("payment-failed", async function (response) {
      console.log("Payment Failed", response);
      try {
        await axios.post(
          "http://localhost:3000/charity/donate/failedDonationStatus",
          { order_id: options.order_id },
          { headers: { Authorization: token } }
        );
        alert("Payment Failed! Something went wrong");
      } catch (error) {
        console.error("Failed to log failed payment:", error);
      }
    });
  } catch (error) {
    console.log("Failed, error--", error);
  }
});
