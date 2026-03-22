const { spawn } = require("child_process");
const path = require("path");

// Path to saved models
const MODELS_PATH = path.join(__dirname, "saved_models");

// Input validation schemas
const validationSchemas = {
  diabetes: [
    "Pregnancies",
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI",
    "DiabetesPedigreeFunction",
    "Age",
  ],
  heart: [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal",
  ],
  parkinsons: [
    "fo",
    "fhi",
    "flo",
    "Jitter_percent",
    "Jitter_Abs",
    "RAP",
    "PPQ",
    "DDP",
    "Shimmer",
    "Shimmer_dB",
    "APQ3",
    "APQ5",
    "APQ",
    "DDA",
    "NHR",
    "HNR",
    "RPDE",
    "DFA",
    "spread1",
    "spread2",
    "D2",
    "PPE",
  ],
  kidney: [
    "age",
    "blood_pressure",
    "specific_gravity",
    "albumin",
    "sugar",
    "red_blood_cells",
    "pus_cell",
    "pus_cell_clumps",
    "bacteria",
    "blood_glucose_random",
    "blood_urea",
    "serum_creatinine",
    "sodium",
    "potassium",
    "haemoglobin",
    "packed_cell_volume",
    "white_blood_cell_count",
    "red_blood_cell_count",
    "hypertension",
    "diabetes_mellitus",
    "coronary_artery_disease",
    "appetite",
    "peda_edema",
    "aanemia",
  ],
};

// Validate input data based on model type
exports.validateInputData = (modelType, data) => {
  const requiredFields = validationSchemas[modelType];

  if (!requiredFields) {
    throw new Error(`Invalid model type: ${modelType}`);
  }

  for (const field of requiredFields) {
    if (data[field] === undefined) {
      throw new Error(`Missing required field: ${field}`);
    }

    // Check if value is numeric
    if (isNaN(parseFloat(data[field]))) {
      throw new Error(`Field ${field} must be numeric`);
    }
  }
};

// Make prediction using Python script
exports.makePrediction = (modelType, inputData) => {
  return new Promise((resolve, reject) => {
    // Spawn Python process
    const pythonProcess = spawn("myvenv/bin/python3", [
      "predict.py",
      modelType,
      JSON.stringify(inputData),
      MODELS_PATH,
    ]);

    let result = "";
    let errorMessage = "";

    // Collect data from stdout
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    // Collect errors from stderr
    pythonProcess.stderr.on("data", (data) => {
      errorMessage += data.toString();
    });

    // Handle process completion
    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Python process exited with code ${code}: ${errorMessage}`),
        );
      }

      try {
        const predictionResult = JSON.parse(result);
        resolve(predictionResult);
      } catch (error) {
        reject(new Error(`Error parsing Python output: ${error.message}`));
      }
    });
  });
};
