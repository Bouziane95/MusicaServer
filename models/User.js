const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  ageName: Number,
  profilePicture: String,
  description: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: [Number],
  lookingFor:[String],
  instrumentsPlayed:[String],
  typesOfMusicPlay: String,
  favouriteBand: String,
  link: String,
  myBands: [String],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
