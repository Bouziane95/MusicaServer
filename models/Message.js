const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  receivedMessage: String,
  sentMessages: String,
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
