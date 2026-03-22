const Prediction = require("../models/Prediction");
const User = require("../models/User");
const mlModels = require("../mlModels");
const mongoose = require("mongoose");

// @desc    Make diabetes prediction
// @route   POST /api/predictions/diabetes
// @access  Private
exports.diabetesPrediction = async (req, res) => {
  try {
    // Validate input data
    console.log(req.body);

    mlModels.validateInputData("diabetes", req.body);

    // Make prediction
    const result = await mlModels.makePrediction("diabetes", req.body);

    if (!result.success) {
      console.log(result.error);
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }

    // Save prediction to database
    const prediction = await Prediction.create({
      predictionType: "diabetes",
      result: result.result,
      inputData: req.body,
      user: req.user ? req.user.id : null,
    });

    // Add prediction to user's predictions
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { predictions: prediction._id },
      });
    }

    console.log(result);
    res.status(200).json({
      success: true,
      data: {
        message: result.message,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Make heart disease prediction
// @route   POST /api/predictions/heart
// @access  Private
exports.heartDiseasePrediction = async (req, res) => {
  try {
    // Validate input data
    console.log(req.body);

    mlModels.validateInputData("heart", req.body);

    // Make prediction
    const result = await mlModels.makePrediction("heart", req.body);

    if (!result.success) {
      console.log(result.error);
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }

    // You can add database operations here as shown in your code
    // Save prediction to database
    const prediction = await Prediction.create({
      predictionType: "heart",
      result: result.result,
      inputData: req.body,
      user: req.user ? req.user.id : null,
    });

    // Add prediction to user's predictions
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { predictions: prediction._id },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        result: result.result,
        message: result.message,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Make Parkinson's disease prediction
// @route   POST /api/predictions/parkinsons
// @access  Private
exports.parkinsonsPrediction = async (req, res) => {
  try {
    // Validate input data
    console.log(req.body);

    mlModels.validateInputData("parkinsons", req.body);

    // Make prediction
    const result = await mlModels.makePrediction("parkinsons", req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }

    // Save prediction to database
    const prediction = await Prediction.create({
      predictionType: "parkinsons",
      result: result.result,
      inputData: req.body,
      user: req.user ? req.user.id : null,
    });

    // Add prediction to user's predictions
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { predictions: prediction._id },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        prediction,
        message: result.message,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get prediction by ID
// @route   GET /api/predictions/:id
// @access  Private
exports.getPrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findOne({ _id: req.params.id });
    // console.log(prediction);

    if (!predictionq) {
      return res.status(404).json({
        success: false,
        error: "Prediction not found",
      });
    }

    // Check if prediction belongs to user
    if (predictionq.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to access this prediction",
      });
    }

    res.status(200).json({
      success: true,
      data: predictionq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete prediction
// @route   DELETE /api/predictions/:id
// @access  Private
exports.deletePrediction = async (req, res) => {
  try {
    const anyPrediction = await Prediction.findById(req.params.id);
    if (!anyPrediction) {
      return res.status(404).json({
        success: false,
        error: "Prediction not found",
      });
    }

    // Check if prediction belongs to user
    if (anyPrediction.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to delete this prediction",
      });
    }

    // Remove prediction from user's predictions array
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { predictions: anyPrediction._id },
    });

    // Delete prediction
    await Prediction.findByIdAndDelete(anyPrediction._id);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.KidneyPrediction = async (req, res) => {
  try {
    // Validate input data
    console.log(req.body);

    mlModels.validateInputData("kidney", req.body);

    // Make prediction
    const result = await mlModels.makePrediction("kidney", req.body);

    if (!result.success) {
      console.log(result.error);
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }

    // Save prediction to database
    const prediction = await Prediction.create({
      predictionType: "kidney",
      result: result.result,
      inputData: req.body,
      user: req.user ? req.user.id : null,
    });

    // Add prediction to user's predictions
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { predictions: prediction._id },
      });
    }

    console.log(result);
    res.status(200).json({
      success: true,
      data: {
        message: result.message,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// exports.SkinPrediction = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No image file provided' });
//     }

//     if (!model) {
//       return res.status(503).json({ error: 'Model not loaded' });
//     }

//     // Preprocess image
//     const inputTensor = await preprocessImage(req.file.buffer);

//     // Make prediction
//     const predictions = await model.predict(inputTensor).data();

//     // Get top predictions
//     const predictionArray = Array.from(predictions);
//     const allPredictions = predictionArray.map((prob, index) => ({
//       class: DISEASE_CLASSES[index],
//       probability: prob
//     })).sort((a, b) => b.probability - a.probability);

//     const topPrediction = allPredictions[0];

//     // Get disease information
//     const diseaseInfo = DISEASE_INFO[topPrediction.class] || {};

//     // Clean up tensor
//     inputTensor.dispose();

//     // Response
//     res.json({
//       predicted_class: topPrediction.class,
//       confidence: topPrediction.probability,
//       all_predictions: allPredictions,
//       description: diseaseInfo.description,
//       recommendations: diseaseInfo.recommendations,
//       timestamp: new Date().toISOString()
//     });

//   } catch (error) {
//     console.error('Prediction error:', error);
//     res.status(500).json({ error: 'Prediction failed' });
//   }
// };

// // routes/prediction.js
// const express = require('express');
// const multer = require('multer');
// const tf = require('@tensorflow/tfjs-node');
// const sharp = require('sharp');
// const path = require('path');
// const fs = require('fs');

// const router = express.Router();

// // Configure multer for file uploads
// const upload = multer({
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed'));
//     }
//   }
// });

// // Load your trained model (adjust path)
// let model;
// const loadModel = async () => {
//   try {
//     model = await tf.loadLayersModel('file://./models/skin_disease_model/model.json');
//     console.log('Skin disease model loaded successfully');
//   } catch (error) {
//     console.error('Error loading model:', error);
//   }
// };
// loadModel();

// // Disease classes (adjust based on your model)
// const DISEASE_CLASSES = [
//   'Actinic keratoses',
//   'Basal cell carcinoma',
//   'Benign keratosis-like lesions',
//   'Dermatofibroma',
//   'Melanoma',
//   'Melanocytic nevi',
//   'Vascular lesions'
// ];

// // Disease information
// const DISEASE_INFO = {
//   'Actinic keratoses': {
//     description: 'Rough, scaly patches on sun-exposed skin that can be precancerous.',
//     recommendations: [
//       'Consult a dermatologist for evaluation',
//       'Use broad-spectrum sunscreen daily',
//       'Avoid excessive sun exposure',
//       'Regular skin checks recommended'
//     ]
//   },
//   'Melanoma': {
//     description: 'A serious form of skin cancer that develops in melanocytes.',
//     recommendations: [
//       'URGENT: See a dermatologist immediately',
//       'Avoid sun exposure',
//       'Monitor any changes in moles',
//       'Regular dermatological check-ups essential'
//     ]
//   },
//   // Add more disease info as needed
// };

// // Image preprocessing function
// const preprocessImage = async (imageBuffer) => {
//   try {
//     // Resize and normalize image
//     const processedImage = await sharp(imageBuffer)
//       .resize(224, 224) // Adjust size based on your model
//       .removeAlpha()
//       .raw()
//       .toBuffer();

//     // Convert to tensor
//     const tensor = tf.tensor3d(processedImage, [224, 224, 3])
//       .div(255.0) // Normalize to [0,1]
//       .expandDims(0); // Add batch dimension

//     return tensor;
//   } catch (error) {
//     throw new Error('Image preprocessing failed');
//   }
// };
