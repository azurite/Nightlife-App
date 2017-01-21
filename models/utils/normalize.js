module.exports = function(user) {
  var norm = {
    username: user.local.name,
    image_url: user.local.image_url,
    isGoingTo: user.isGoingTo
  };
  return norm;
};
