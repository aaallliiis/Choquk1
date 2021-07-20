/* eslint-disable class-methods-use-this */
const passport = require('passport');
const Middleware = require('./Middleware');

module.exports = new (class AdminAuthMiddleware extends Middleware {
  handle(req, res, next) {
    passport.authenticate('admin-jwt', { session: false }, (err, admin) => {
      if (err || !admin) {
        return res.status(401).json({
          data: 'برای دسترسی به این صفحه باید وارد شوید',
          status: 'error',
        });
      }
      req.admin = admin;
      next();
    })(req, res, next);
  }
})();
