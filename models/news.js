const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
	topic: { type: String, required: true },
	url: { type: String, required: true },
	notes: String,
	pubDate: { type: Date, default: Date.now }
});

const News = mongoose.model("News", newsSchema);

module.exports = News;

