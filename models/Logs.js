var mongoose = require("mongoose");
const { Schema } = mongoose;

var LogsSchema = new Schema(
  {
    log: { type: String, required: [true, "Log is required!"] }
  },
  { timestamps: true }
);

var Logs = mongoose.model("Logs", LogsSchema);
module.exports = Logs;
