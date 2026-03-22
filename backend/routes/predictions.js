const express = require("express");
const router = express.Router();
// const multer = require('multer');
// const storage = multer.memoryStorage(); // store image in memory
// const upload = multer({ storage });

const {
  diabetesPrediction,
  heartDiseasePrediction,
  parkinsonsPrediction,
  KidneyPrediction,
  getPrediction,
  deletePrediction,
} = require("../controllers/predictionController");
const { protect } = require("../middleware/auth");

// All routes are protected
// router.use(protect);

// Prediction routes
router.post("/diabetes", diabetesPrediction);
router.post("/heart", heartDiseasePrediction);
router.post("/parkinsons", parkinsonsPrediction);
router.post("/Kidney", KidneyPrediction);
// router.post('/skin-disease',upload.single("image"),SkinPrediction);

// Single prediction routes
router.route("/:id").get(getPrediction).delete(deletePrediction);

module.exports = router;
