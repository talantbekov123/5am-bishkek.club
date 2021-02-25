/* eslint-disable consistent-return */
const auth = (req, res, next) => {
	if (req.session.admin === true) {
		return next();
	}
	res.redirect('/admins/login');
};

module.exports = { auth };
