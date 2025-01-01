const Charity = require("../model/charity");
const User = require("../model/user");
const Sib = require("sib-api-v3-sdk");
const RazorPay = require("razorpay");
const Donation = require("../model/donation");
require("dotenv").config();

exports.postCreateCharity = async (req, res, next) => {
  try {
    console.log("charity form data", req.body);
    const charity = await Charity.create({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      category: req.body.category,
      goal: req.body.goal,
      userId: req.user.id,
    });

    res.status(200).json({ message: "Charity saved in db", charity });
  } catch (error) {
    res.status(500).json({ message: "error while saving in db", error });
  }
};

exports.getAllCampaigns = async (req, res, next) => {
  try {
    const cherities = await Charity.findAll({ where: { isApproved: true } });
    console.log("server charities", cherities);
    res.status(200).json({ message: "received all ", cherities });
  } catch (error) {
    console.log("server", error);
    res.status(500).json({ message: "error", error });
  }
};

exports.getMyCampaigns = async (req, res, next) => {
  try {
    const myCharity = await Charity.findAll({ where: { userId: req.user.id } });
    console.log("mycharity server", myCharity);
    res.status(200).json({ message: "Got mycharity", myCharity });
  } catch (error) {
    console.log("server", error);
    res.status(500).json({ message: "server error", error });
  }
};

exports.getCharityById = async (req, res, next) => {
  const { charityId } = req.params;
  console.log("THIS ISSSS", charityId);
  try {
    const charity = await Charity.findByPk(charityId);

    res.status(200).json({ message: "charity with user found", charity });
  } catch (err) {
    console.log("ERR in server by id");
    res.status(500).json({ message: "charity not found wwith id", err });
  }
};

exports.donateToCharity = async (req, res, next) => {
  const charityId = req.params.charityId;
  const { amount } = req.body;
  console.log("AAAAA", amount);
  try {
    var rzp = new RazorPay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    rzp.orders.create(
      { amount: amount * 100, currency: "INR" },
      (err, order) => {
        if (err) {
          throw new Error(err);
        }
        req.user
          .createDonation({
            orderid: order.id,
            status: "PENDING",
            charityId: charityId,
            amount: amount,
          })
          .then(() => {
            return res.status(201).json({ order, key_id: rzp.key_id });
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ message: "something wrong in creating rzp order", error: err });
  }
};

exports.updateDonationStatus = async (req, res, next) => {
  const { order_id, payment_id } = req.body;
  try {
    const donation = await Donation.findOne({ where: { orderId: order_id } });
    const user = await User.findByPk(donation.userId);

    const charity = await Charity.findByPk(donation.charityId);

    const newTotal = donation.amount + user.total_donation;

    const promise1 = donation.update({
      paymentid: payment_id,
      status: "SUCCESS",
    });
    const promise2 = user.update({
      total_donation: newTotal,
      campaignSupported: user.campaignSupported + 1,
    });

    await Promise.all([promise1, promise2]);
    // .then(() => {
    //     res.status(202).json({ message: "Donation Successful" })
    // })
    // .catch(err => {
    //     throw new Error(err)
    // })
    ////sending confirmation mail
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not set in environment variables");
    }
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
      email: "puransinghrana080@gmail.com",
      name: "puran",
    };
    const receivers = [{ email: user.userEmail }];

    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Confirmation Email of Donation",
      textContent: `
            Dear ${user.userName},

            Thank you for your donation to ${charity.name}!
            Here are the details of your donation:
            - Donation Amount: ${donation.amount}
            - Charity: ${charity.name}
            - Date: ${donation.date}

            Once again, thank you for your donation!
            `,
    });
    console.log("Donation successful Email sent successfully:", response);
    res
      .status(200)
      .json({ message: "donation updated and condirmation mail sent" });
  } catch (error) {
    console.log("Error in updating donation status", error);
    res.status(500).json({ message: "Donation Failed to update", error });
  }
};

exports.updateDonationToFailed = async (req, res, next) => {
  const { order_id } = req.body;
  try {
    const donation = await Donation.findOne({ where: { orderid: order_id } });

    await donation.update({ status: "FAILED" });
    return res.status(200).json({ message: "Maked as failed" });
  } catch (error) {
    console.log("Error in updating", error);
    return res.status(500).json({
      message: "Failed to update transaction status",
      error,
    });
  }
};
