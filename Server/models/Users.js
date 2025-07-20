const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UsersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},

	password: {
		type: String,
		required: true,
	},

	watchlist: {
		type: [String],
		required: true,
		default: [],
	},

	portfolio: {
		type: Map,
		of: {
			totalInvestment: {
				type: Number,
				required: true,
				default: 0,
			},
			coins: {
				type: Number,
				required: true,
				default: 0,
			},
		},

		default: {},
	},
});

UsersSchema.pre("save", async function (next) {
	const user = this;
	if (!user.isModified("password")) {
		return next();
	}

	try {
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(user.password, salt);
		user.password = hashed;
		next();
	} catch (err) {
		next(err);
	}
});

UsersSchema.methods.comparePassword = async function (enteredPassword) {
	try {
		const isPassword = await bcrypt.compare(enteredPassword, this.password);
		return isPassword;
	} catch (err) {
		throw err;
	}
};

const User = mongoose.model("Users", UsersSchema);

module.exports = User;
