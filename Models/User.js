const mongoogse = require("mongoose");

const userSchema = new mongoogse.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    account_status: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoogse.model("User", userSchema);