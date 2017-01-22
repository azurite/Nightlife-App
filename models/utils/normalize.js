module.exports = function normalize(type, schema, populatedField) {
  var norm = {};

  switch(type) {
    case "user":
      norm.id = schema._id.toString(16);
      norm.username = schema.local.name;
      norm.image_url = schema.local.image_url;
      break;

    case "venue":
      norm.id = schema.venueId;
      norm.image_url = schema.image_url;
      break;
  }

  switch(populatedField) {
    case "isGoingTo":
      norm.isGoingTo = schema.isGoingTo.map((venue) => {
        return {
          id: venue.id,
          name: venue.name,
          image_url: venue.image_url
        };
      });
      break;

    case "isGoing":
      norm.isGoing = schema.isGoing.map((user) => {
        return {
          id: user._id.toString(16),
          name: user.local.name,
          image_url: user.local.image_url
        };
      });
      break;
  }

  return norm;
};
