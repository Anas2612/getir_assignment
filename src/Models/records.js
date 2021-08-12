const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * Define records Collection
 */

const RecordsSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  counts: {
    type: [Number],
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Records = mongoose.model("Records", RecordsSchema);

module.exports = Records;
