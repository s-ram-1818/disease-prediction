const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  predictionType: {
    type: String,
    required: true,
    enum: ["diabetes", "heart", "parkinsons", "kidney"],
  },
  result: {
    type: Boolean,
    required: true,
  },
  inputData: {
    type: Object,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prediction", PredictionSchema);
