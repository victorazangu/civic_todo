const landingPage = async () => {
  try {
    return "Welcome to the landing page Civic Voices Api";
  } catch (err) {
    throw err;
  }
};

module.exports = {
  landingPage,
};
