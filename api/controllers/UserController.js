/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  createUser: function(req, res) {

    var value = req.param('name');

    var validatedUsername = req.param('name').replace(/\s+/g, '-');
    // validatedUsername = _.deburr(validatedUsername);
    // Username must be at least one character long and contain only numbers,
    // letters, and dashes.
    if ( !validatedUsername.match(/^[a-z0-9\-]+$/i) ) {
      return res.badRequest('Invalid `username`: must consist of numbers, letters, or dashes only.');
    }

    User.create({
      name: validatedUsername
    }).exec(function(err, createdUser){
      if (err) res.negotiate(err);

      return res.json({
        name: createdUser.name
      });
    });
  }
};

