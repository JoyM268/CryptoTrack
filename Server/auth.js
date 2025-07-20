const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/Users");
require("dotenv").config();

passport.use(
	new localStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username });
			if (!user) {
				return done(null, false, { message: "Username not found." });
			}

			const isPassword = await user.comparePassword(password);
			if (isPassword) {
				return done(null, user);
			} else {
				return done(null, false, { message: "Incorrect password." });
			}
		} catch (err) {
			return done(err, false);
		}
	})
);

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		},
		async (payload, done) => {
			try {
				const user = await User.findById(payload.id);
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (err) {
				return done(err, false);
			}
		}
	)
);

module.exports = passport;
