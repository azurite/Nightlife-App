exports.userErrors = {
  incorrectUsernameOrPassword: function(msg) {
    return new Error(msg || "wrong username or password");
  },
  emailAlreadyTaken: function(msg) {
    return new Error(msg || "this email address is already taken");
  }
};
