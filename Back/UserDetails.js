// UserDetails.js 
///Schema for the mongoose
const mongoose = require('mongoose');

const UserDeatilSchema = new mongoose.Schema({
    name: String,
    mobile: { type: String, unique: true },
    password: String // Fixed typo here
}, {
    collection: "UserInfo" // Fixed option name here
});

mongoose.model("UserInfo", UserDeatilSchema);
