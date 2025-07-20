const express = require("express");
const db = require("./db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./models/Users");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const passport = require("./auth");
app.use(passport.initialize());

app.get("/", (req, res) => {
	res.send("API is running");
});

app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (user) {
			return res.status(400).json({ Error: "User Already Exists" });
		}

		const newUser = new User({ username, password });
		const response = await newUser.save();
		res.status(200).json({ message: "User Registered Successfully" });
	} catch (err) {
		res.status(500).json(err);
	}
});

app.post("/login", (req, res, next) => {
	passport.authenticate("local", { session: false }, (err, user, info) => {
		if (err) {
			return res.status(500).json({ error: "Authentication error" });
		}
		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const payload = { id: user._id, username: user.username };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});

		res.status(200).json({
			message: "Login successful",
			token: token,
			user: {
				id: user._id,
				username: user.username,
			},
		});
	})(req, res, next);
});

app.get(
	"/watchlist",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const userId = req.user._id;
			const user = await User.findById(userId);
			if (!user) {
				res.status(404).json({ Error: "User not Found" });
			}

			res.json({ watchlist: user.watchlist });
		} catch (err) {
			res.json(500).json(err);
		}
	}
);

app.get(
	"/portfolio",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const userId = req.user._id;
			const user = await User.findById(userId);
			if (!user) {
				res.status(404).json({ Error: "User not Found" });
			}

			res.json(user.portfolio);
		} catch (err) {
			res.json(500).json(err);
		}
	}
);

app.listen(PORT);
