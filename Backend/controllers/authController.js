const Token = require("../models/Token");
const User = require("../models/User");

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find token
    const verificationToken = await Token.findOne({ token });
    if (!verificationToken) return res.status(400).json({ message: "Invalid or expired token." });

    // Verify the user
    const user = await User.findById(verificationToken.userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.isVerified = true;
    await user.save();

    // Remove the token after verification
    await verificationToken.deleteOne();

    res.status(200).json({ message: "Email verified successfully. You can now log in!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};
