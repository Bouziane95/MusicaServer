const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  profilePicture: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: [Number], required: true },
  lookingFor: { type: [String], required: true },
  instrumentsPlayed: { type: [String], required: true },
  locationAddress: { type: String, required: true },
  favouriteBand: { type: String, required: true },
  link: String,
  myBands: { type: [String], required: true },
  bandsCreated: [{ type: Schema.Types.ObjectId, ref: "Band" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
