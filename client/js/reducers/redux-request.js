var Req = function() {
  var _initial = {
    isPending: false,
    success: null,
    error: null,
    data: []
  };

  var assert_bool = function(bool) {
    if(!(bool === false || bool === true)) {
      throw new TypeError("paginate must be boolean. Instead got: " + (typeof bool));
    }
  };

  var assert_array = function(arr) {
    if(!Array.isArray(arr)) {
      throw new TypeError("Req.done() data should be array. Instead got: " + (typeof arr));
    }
  };

  var format_error = function(err) {
    if(typeof err === "string") {
      return { message: err };
    }
    if(typeof err === "object" && err.message) {
      return err;
    }
    else {
      return { message: "an unknown error occured" };
    }
  };

  return {
    init: function() {
      return Object.assign({}, _initial);
    },
    begin: function(curr, paginate) {
      assert_bool(paginate);
      return Object.assign({}, curr, {
        isPending: true,
        success: null,
        error: null,
        data: paginate ? curr.data : []
      });
    },
    done: function(curr, data, paginate) {
      assert_bool(paginate);
      assert_array(data);
      return Object.assign({}, curr, {
        isPending: false,
        success: true,
        error: false,
        data: paginate ? curr.data.concat(data) : data
      });
    },
    fail: function(curr, err, paginate) {
      assert_bool(paginate);
      return Object.assign({}, curr, {
        isPending: false,
        success: false,
        error: format_error(err),
        data: paginate ? curr.data : []
      });
    }
  };
};

module.exports = Req();
