const path = require("path");
const User = require("../model/user");
const Donation = require("../model/donation");
const Charity = require("../model/charity");

exports.getUserProfilePage = async (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/views/profile.html"));
};

exports.getUserProfileDetails = async (req, res, next) => {
  try {
    console.log("In server checking for user details ");
    //making the first user admin
    const userCount = await User.count();
    if (userCount === 1) {
      const oneUser = await User.findOne();
      oneUser.update({ role: "Admin" });
      console.log("Admin created");
    }

    const user = await User.findByPk(req.user.id);

    console.log("user detail", user);
    res.status(200).json({ message: "detail fetched", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unabel to get user details in server " });
  }
};

exports.postUpdateProfile = async (req, res, next) => {
  const { name, phone } = req.body;

  try {
    const userId = req.user.id;

    const result = await User.update(
      {
        userName: name,
        userPhone: phone,
      },
      { where: { id: userId } }
    );

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ message: "error while updating the profile", error });
  }
};

exports.getMyDonationDetails = async (req, res, next) => {
  try {
    const donations = await Donation.findAll({
      where: { userId: req.user.id, status: "SUCCESS" },
      include: [{ model: Charity, attributes: ["name", "category"] }],
    });

    console.log("This i my donation", donations);

    res.status(201).json({ message: "My donation details", donations });
  } catch (error) {
    console.log("Error in fetching user donation from db", error);
    res.status(500).json({ message: "donation details not fetched", error });
  }
};
