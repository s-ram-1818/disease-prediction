# Disease Prediction System - Project Documentation

## Overview

This is a comprehensive **Disease Prediction System** that leverages Machine Learning (ML) models to predict the likelihood of various diseases, including diabetes, heart disease, and kidney disease, based on user-provided medical data. The system is built as a full-stack web application, combining a React-based frontend for user interaction with a Node.js backend that integrates Python-based ML predictions. Users can register, log in, input medical parameters through intuitive forms, and receive instant predictions. The application also includes additional features such as diet recommendations, yoga suggestions, and skin disease classification.

## Technologies and Frameworks Used

### Backend

- **Node.js** with **Express.js**: Handles server-side logic, API endpoints, and request routing.
- **MongoDB** (via Mongoose): NoSQL database for storing user information and prediction history.
- **Python**: Executes ML predictions using scripts that load pre-trained models.
- **JWT (JSON Web Tokens)**: Manages user authentication and session security.
- **bcryptjs**: Hashes user passwords for secure storage.
- **CORS**: Enables cross-origin resource sharing between frontend and backend.
- **Nodemailer**: Sends email verification codes during user registration.
- **python-shell**: Bridges Node.js and Python for seamless ML execution.

### Frontend

- **React.js**: Component-based UI library for building dynamic user interfaces.
- **Vite**: Fast build tool and development server for React applications.
- **Tailwind CSS**: Utility-first CSS framework for responsive and modern styling.
- **React Router**: Handles client-side routing and navigation.
- **Axios**: HTTP client for making API requests to the backend.
- **Lucide React**: Icon library for enhancing UI elements.

### Machine Learning

- **Python Libraries**:
  - **scikit-learn**: Core ML library for model training, evaluation, and prediction.
  - **numpy**: Handles numerical computations and array operations.
  - **pandas**: Data manipulation and analysis for CSV datasets.
- **Models**:
  - Support Vector Machine (SVM) for diabetes prediction.
  - Logistic Regression for heart disease prediction.
  - K-Nearest Neighbors (KNN) for kidney disease prediction.
- **Data Persistence**: Models are serialized using Python's pickle module and stored as .sav files.

### Other Components

- **Virtual Environment (myvenv)**: Isolated Python environment for dependency management.
- **Datasets**: CSV files containing medical data for model training (diabetes.csv, heart.csv, kidney.csv).
- **Saved Models**: Pre-trained ML models ready for deployment (diabetes_model.sav, heart_disease_model.sav, kidney.sav).

## How to Run the Project

### Prerequisites

- **Node.js** (version 14 or higher)
- **Python** (version 3.8 or higher) with pip package manager
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Git** (for cloning the repository, if applicable)

### Installation and Setup Steps

1. **Clone or Download the Project**:

   ```
   cd /path/to/your/projects
   git clone <repository-url> disease-main
   cd disease-main/ml\ model\ project
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Install Node.js dependencies:
     ```
     npm install
     ```
   - Create a `.env` file in the backend directory with the following environment variables:
     ```
     MONGODB_URI=mongodb://localhost:27017/healthPredictionApp
     JWT_SECRET=your_secure_jwt_secret_here
     NODE_ENV=development
     ```
   - Activate the Python virtual environment:
     ```
     source myvenv/bin/activate  # On Linux/Mac
     # Or on Windows: myvenv\Scripts\activate
     ```
   - Install Python dependencies:
     ```
     pip install scikit-learn numpy pandas
     ```
   - Ensure MongoDB is running (start local MongoDB service or connect to cloud instance).
   - Start the backend server:
     ```
     npm run server
     ```
     The backend will run on `http://localhost:5000`.

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```
     cd ../disease-predictor
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - (Optional) Create a `.env` file to specify the API base URL:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```
     If not set, it defaults to `http://localhost:5000/api`.
   - Start the development server:
     ```
     npm run dev
     ```
     The frontend will run on `http://localhost:5173` (or another available port).

4. **Access the Application**:
   - Open a web browser and navigate to `http://localhost:5173` to access the frontend.
   - The backend API is available at `http://localhost:5000`.

### Additional Notes

- Ensure the Python virtual environment is activated whenever running backend operations that involve ML predictions.
- The ML models are pre-trained and do not require retraining for basic usage. However, you can modify the training scripts in the `ml model/colab_files_to_train_models/` directory if needed.
- For production deployment, build the frontend with `npm run build` and configure the backend to serve static files.
- If using a cloud MongoDB instance, update the `MONGODB_URI` in the `.env` file accordingly.

## System Requirements

- **Operating System**: Linux, macOS, or Windows (Linux recommended for optimal Python virtual environment performance).
- **Memory (RAM)**: Minimum 4GB, recommended 8GB for smooth ML processing.
- **Storage**: At least 1GB of free disk space for datasets, models, and dependencies.
- **Software Dependencies**:
  - Node.js v14+ (verify with `node --version`).
  - Python 3.8+ (verify with `python3 --version`).
  - MongoDB 4.4+ (local or cloud-based).
  - pip (Python package installer, usually included with Python).
- **Network**: Internet connection required for initial dependency installation; local MongoDB operation does not require internet access.
- **Hardware**: Standard CPU sufficient; no GPU acceleration required for the current ML models.

## Machine Learning Explanation

### Introduction to Machine Learning

Machine Learning (ML) is a subset of Artificial Intelligence (AI) that enables computers to learn patterns and make decisions from data without being explicitly programmed for every scenario. Instead of relying on hardcoded rules (e.g., "if blood sugar > 140, then diabetic"), ML algorithms analyze large datasets to identify complex relationships and patterns.

**Why Use ML in This Project?**

- Medical diagnoses involve multiple interacting factors (e.g., age, blood pressure, cholesterol, and family history).
- ML can process thousands of patient records to uncover subtle patterns that might be missed by human analysis.
- It provides consistent, data-driven predictions that can assist in early disease detection and prevention.
- In this application, ML serves as a screening tool to assess disease risk based on user-inputted medical parameters.

**Core ML Workflow**:

1. **Data Collection**: Gather historical medical data with known outcomes (e.g., patient records labeled as "diabetic" or "non-diabetic").
2. **Training**: Feed the data into an algorithm that learns patterns and relationships between input features and outcomes.
3. **Prediction**: Apply the trained model to new, unseen data to generate predictions.
4. **Evaluation**: Test the model's accuracy on separate data to ensure reliability and prevent overfitting.

### Key ML Concepts in This Project

- **Supervised Learning**: All models are trained on labeled datasets where the correct outcomes are known.
- **Classification**: The task of predicting discrete categories (e.g., disease present/absent) rather than continuous values.
- **Features**: Input variables used for prediction (e.g., age, glucose level, blood pressure).
- **Labels/Targets**: The output variables to predict (e.g., 1 for disease present, 0 for absent).
- **Training/Test Split**: Data is divided into training sets (for learning) and test sets (for evaluation), typically 80/20.
- **Accuracy**: A metric measuring the percentage of correct predictions (e.g., 85% accuracy means 85 out of 100 predictions are correct).

### Specific ML Models and Implementation

The project utilizes **scikit-learn**, a popular Python library for ML, to train and deploy models. Trained models are saved as .sav files using Python's pickle module for efficient loading during predictions.

1. **Diabetes Prediction Model**:
   - **Algorithm**: Support Vector Machine (SVM) with a linear kernel.
   - **Why SVM?**: Effective for binary classification tasks with clear decision boundaries. It performs well on medical datasets by finding optimal hyperplanes that separate classes in high-dimensional space.
   - **How It Works**: SVM identifies a "hyperplane" (a line or plane) that best separates diabetic from non-diabetic patients based on feature combinations (e.g., glucose and BMI). New predictions are made by determining which side of the hyperplane the input data falls on.
   - **Training Details**: Trained on the PIMA Diabetes Dataset (768 samples). Data split into 80% training and 20% testing. Achieved approximately 78% accuracy on test data.
   - **Input Features**: Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age.
   - **Output**: 0 (non-diabetic) or 1 (diabetic).

2. **Heart Disease Prediction Model**:
   - **Algorithm**: Logistic Regression.
   - **Why Logistic Regression?**: A simple yet powerful algorithm for binary classification. It provides interpretable results and is well-suited for medical risk assessment.
   - **How It Works**: Uses a sigmoid (S-shaped) function to calculate the probability of heart disease. If the probability exceeds 0.5, it predicts disease presence; otherwise, it predicts absence.
   - **Training Details**: Trained on a heart disease dataset (303 samples). Data split 80/20. Achieved approximately 85% accuracy on test data.
   - **Input Features**: Age, sex, chest pain type, resting blood pressure, serum cholesterol, fasting blood sugar, resting ECG, maximum heart rate, exercise-induced angina, ST depression, slope, number of major vessels, thalassemia.
   - **Output**: 0 (healthy heart) or 1 (defective heart).

3. **Kidney Disease Prediction Model**:
   - **Algorithm**: K-Nearest Neighbors (KNN) with k=5.
   - **Why KNN?**: Effective for datasets with mixed data types (numerical and categorical). It makes predictions based on similarity to existing cases.
   - **How It Works**: For a new patient, KNN identifies the 5 most similar (nearest) patients from the training data based on feature distances. It then predicts the majority outcome among these neighbors (e.g., if 3 out of 5 similar patients have kidney disease, it predicts disease presence).
   - **Training Details**: Trained on a kidney disease dataset. Data preprocessing included scaling numerical features and encoding categorical variables. Achieved approximately 97% accuracy on test data.
   - **Input Features**: Age, blood pressure, specific gravity, albumin, sugar, red blood cells, pus cell, pus cell clumps, bacteria, blood glucose random, blood urea, serum creatinine, sodium, potassium, haemoglobin, packed cell volume, white blood cell count, red blood cell count, hypertension, diabetes mellitus, coronary artery disease, appetite, pedal edema, anemia.
   - **Output**: 0 (no kidney disease) or 1 (kidney disease).

### Prediction Workflow in the Application

- Users input medical data through web forms.
- Data is sent to the backend via API calls.
- Backend validates inputs and invokes Python scripts.
- Python loads the appropriate pre-trained model and makes predictions.
- Results are returned to the frontend and displayed to the user (e.g., "The person is diabetic").
- Predictions are logged in the database for user history tracking.

### Limitations and Considerations

- **Accuracy**: Models are not infallible (e.g., diabetes model ~78% accurate). They should be used as screening tools, not definitive diagnoses.
- **Generalization**: Models are trained on specific datasets and may not perform equally well across all populations or demographics.
- **Data Quality**: Predictions depend on the quality and completeness of input data.
- **Ethical Use**: This application is for educational and demonstrative purposes. Always consult healthcare professionals for medical advice.
- **Model Updates**: The current implementation uses static, pre-trained models. In a production environment, consider periodic retraining with new data.

## Medical Terms and Definitions

The following are key medical terms used in the prediction forms, explained in simple, non-technical language:

### Diabetes Prediction Terms

- **Pregnancies**: The number of times a person has been pregnant. Multiple pregnancies can increase diabetes risk due to hormonal changes.
- **Glucose**: Blood sugar level measured in mg/dL. Elevated glucose indicates potential diabetes.
- **BloodPressure**: The force of blood against artery walls, measured in mm Hg. High blood pressure often accompanies diabetes.
- **SkinThickness**: The thickness of a fold of skin, measured in mm. Thinner skin may indicate insulin-related issues.
- **Insulin**: A hormone that regulates blood sugar. Low levels can lead to diabetes.
- **BMI (Body Mass Index)**: A measure of body fat based on height and weight (weight in kg divided by height in meters squared). Values over 25 indicate overweight, a diabetes risk factor.
- **DiabetesPedigreeFunction**: A score representing family history of diabetes (range 0-2.5). Higher scores indicate greater genetic risk.
- **Age**: Age in years. Diabetes risk increases with age.

### Heart Disease Prediction Terms

- **Age**: Age in years.
- **Sex**: Biological sex (1 for male, 0 for female).
- **Chest Pain Type (cp)**: The nature of chest pain experienced (0: typical angina, 1: atypical angina, 2: non-anginal pain, 3: no symptoms).
- **Resting Blood Pressure (trestbps)**: Blood pressure measured at rest, in mm Hg. Elevated levels increase heart disease risk.
- **Serum Cholesterol (chol)**: Blood cholesterol level in mg/dL. High cholesterol contributes to artery plaque buildup.
- **Fasting Blood Sugar (fbs)**: Blood sugar after fasting (1 if >120 mg/dL, 0 otherwise). Indicates diabetes, which affects heart health.
- **Resting ECG (restecg)**: A measure of heart's electrical activity at rest (scale 0-2).
- **Max Heart Rate (thalach)**: The highest heart rate achieved during exercise. Lower values may indicate heart problems.
- **Exercise Angina (exang)**: Chest pain triggered by physical activity (1: yes, 0: no).
- **ST Depression (oldpeak)**: A measure of heart stress during exercise.
- **Slope**: The slope of the ST segment in an ECG (0-2), indicating heart response to stress.
- **Major Vessels (ca)**: Number of major heart vessels with blockages (0-3).
- **Thalassemia (thal)**: A blood disorder affecting oxygen transport (values 1-3).

### Kidney Disease Prediction Terms

- **Age**: Age in years.
- **Blood Pressure**: Blood pressure in mm/Hg. High pressure can damage kidney filters.
- **Specific Gravity**: A measure of urine concentration (range 1.005-1.025). Abnormal values indicate kidney function issues.
- **Albumin**: Protein level in urine (scale 0-5). High levels suggest kidney damage.
- **Sugar**: Glucose level in urine (scale 0-5). Presence indicates diabetes affecting kidneys.
- **Red Blood Cells**: Presence of red blood cells in urine (0: normal, 1: abnormal).
- **Pus Cell**: White blood cells in urine (0: normal, 1: abnormal), indicating possible infection.
- **Pus Cell Clumps**: Clustered white blood cells in urine (0: no, 1: yes).
- **Bacteria**: Bacterial presence in urine (0: no, 1: yes).
- **Blood Glucose Random**: Random blood sugar level in mg/dL.
- **Blood Urea**: Urea (waste product) level in blood in mg/dL. High levels indicate poor kidney filtration.
- **Serum Creatinine**: A marker of kidney function in mg/dL. Elevated levels suggest kidney damage.
- **Sodium**: Sodium level in blood in mEq/L. Imbalances can result from kidney issues.
- **Potassium**: Potassium level in blood in mEq/L. Abnormal levels may indicate kidney problems.
- **Haemoglobin**: Protein in red blood cells in g/dL. Low levels indicate anemia, often caused by kidney disease.
- **Packed Cell Volume**: Percentage of blood composed of cells. Low values suggest anemia.
- **White Blood Cell Count**: Number of immune cells in blood. Abnormal counts may indicate infection.
- **Red Blood Cell Count**: Number of oxygen-carrying cells in blood.
- **Hypertension**: High blood pressure (1: yes, 0: no).
- **Diabetes Mellitus**: Diabetes (1: yes, 0: no).
- **Coronary Artery Disease**: Heart artery disease (1: yes, 0: no).
- **Appetite**: General appetite level (0: poor, 1: good).
- **Pedal Edema**: Swelling in the legs (1: yes, 0: no), often due to kidney-related fluid retention.
- **Anemia**: Low red blood cell count (1: yes, 0: no).

## Conclusion

This Disease Prediction System demonstrates the integration of modern web technologies with machine learning to create a practical health assessment tool. By combining React for the user interface, Node.js for backend services, and Python-based ML models, the application provides an accessible way for users to assess potential health risks. However, it is crucial to emphasize that this tool is for informational and educational purposes only. Machine learning predictions, while valuable, should never replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for any health concerns.

For further development, consider expanding the model selection, incorporating more advanced ML techniques, or adding real-time data validation and user feedback mechanisms.</content>
<parameter name="filePath">/media/s_ram_1818/VOLUME R/Project/disease-main/ml model project/PROJECT_DOCUMENTATION.md
