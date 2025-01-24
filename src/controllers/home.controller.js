const { landingService } = require("../services");

const landingPage = async (req, res) => {
  try {
    const home = await landingService.landingPage();
    return res.status(200).json({ data: home, success: true });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
};

module.exports = {
  landingPage,
};
