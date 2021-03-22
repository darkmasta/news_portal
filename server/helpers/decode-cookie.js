require("dotenv").config({
  path: "variables.env",
});

var CryptoJS = require("crypto-js");

module.exports = {
  decodeCookie: function (cookie) {
    var cookieData = CryptoJS.AES.decrypt(
      cookie,
      String(process.env.JWT_SECRET)
    ).toString(CryptoJS.enc.Utf8);

    var email = cookieData.split("~")[0];
    var isAdmin = cookieData.split("~")[1]; // admin, editor, or writer

    return {
      email,
      isAdmin,
    };
  },
};
