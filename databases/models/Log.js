const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  actionType: { type: String, required: true },
  role: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  metadata: mongoose.Schema.Types.Mixed,
},{
  timestamps:true
});

module.exports = mongoose.model("Log", logSchema);
