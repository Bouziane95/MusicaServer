const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bandSchema = new Schema({
  bandPicture: String,
  bandBoss_id: { type: Schema.Types.ObjectId, ref: "User" },
  bandName: String,
  musicStyle: [String],
  lookingFor: [String],
  description: String,
  bandLocation: String,
  email: String,
  link: String,
});

const Band = mongoose.model("Band", bandSchema);
module.exports = Band;
