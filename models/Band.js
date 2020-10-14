const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bandSchema = new Schema({
  bandPicture: String,
  bandBoss_id: { type: Schema.Types.ObjectId, ref: "User" },
  bandName: String,
  musicStyle: [String],
  groupMembers: [String],
  lookingFor: [String],
  description: String,
  location: [Number],
  email: String,
  link: String,
});

const Band = mongoose.model("Band", bandSchema);
module.exports = Band;
