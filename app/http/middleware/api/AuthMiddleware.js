/* eslint-disable class-methods-use-this */
const passport = require('passport');
const Middleware = require('./Middleware');

module.exports = new (class AuthMiddleware extends Middleware {
  handle(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          data: 'برای دسترسی به این صفحه باید وارد شوید',
          status: 'error',
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  }
})();
