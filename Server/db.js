const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
	console.log("Connected to DB");
});

db.on("error", (err) => {
	console.log("Connection Error:", err);
});

db.on("disconnected", () => {
	console.log("Disconnected from DB");
});

module.exports = db;
