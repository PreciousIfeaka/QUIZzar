const path = require('path');

const homePage  = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "client", "home_page.html"));
};

module.exports = { homePage }