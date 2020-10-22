const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bandSchema = new Schema({
  bandPicture: { type: String, require: true },
  bandBoss_id: { type: Schema.Types.ObjectId, ref: "User" },
  bandName: { type: String, require: true },
  musicStyle: { type: [String], require: true },
  lookingFor: { type: [String], require: true },
  description: { type: String, require: true },
  bandLocation: { type: String, require: true },
  email: { type: String, require: true },
  link: String,
});

const Band = mongoose.model("Band", bandSchema);
module.exports = Band;
