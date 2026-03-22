# import sys
# import os
# import json
# import pickle
# import numpy as np

# def load_model(model_type, models_path):
#     """Load the specified ML model from the saved_models directory."""
#     model_filename = None
    
#     if model_type == 'diabetes':
#         model_filename = os.path.join(models_path, 'diabetes_model.sav')
#     elif model_type == 'heart':
#         model_filename = os.path.join(models_path, 'heart_disease_model.sav')
#     elif model_type == 'parkinsons':
#         model_filename = os.path.join(models_path, 'parkinsons_model.sav')
#     else:
#         raise ValueError(f"Invalid model type: {model_type}")
    
#     try:
#         return pickle.load(open(model_filename, 'rb'))
#     except Exception as e:
#         raise Exception(f"Error loading model: {str(e)}")

# def prepare_input_data(model_type, input_data):
#     """Transform input data into the format expected by the ML model."""
#     if model_type == 'diabetes':
#         features = [
#             'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 
#             'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
#         ]
#     elif model_type == 'heart':
#         features = [
#             'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
#             'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
#         ]
#     elif model_type == 'parkinsons':
#         features = [
#             'fo', 'fhi', 'flo', 'Jitter_percent', 'Jitter_Abs', 'RAP', 'PPQ', 
#             'DDP', 'Shimmer', 'Shimmer_dB', 'APQ3', 'APQ5', 'APQ', 'DDA', 
#             'NHR', 'HNR', 'RPDE', 'DFA', 'spread1', 'spread2', 'D2', 'PPE'
#         ]
    
#     return np.array([[float(input_data[feature]) for feature in features]])

# def make_prediction(model_type, input_data_json, models_path):
#     """Make prediction using the specified model and input data."""
#     try:
#         # Parse input JSON
#         input_data = json.loads(input_data_json)
        
#         # Load model
#         model = load_model(model_type, models_path)
        
#         # Prepare input data
#         X = prepare_input_data(model_type, input_data)
        
#         # Make prediction
#         prediction = model.predict(X)
        
#         # Convert prediction to boolean (1 = positive, 0 = negative)
#         result = bool(prediction[0] == 1)
        
#         # Return result as JSON
#         return {
#             'success': True,
#             'model_type': model_type,
#             'result': result,
#             'message': get_result_message(model_type, result)
#         }
#     except Exception as e:
#         return {
#             'success': False,
#             'error': str(e)
#         }

# def get_result_message(model_type, result):
#     """Get human-readable message based on prediction result."""
#     if model_type == 'diabetes':
#         return "The person is diabetic" if result else "The person is not diabetic"
#     elif model_type == 'heart':
#         return "The person is having heart disease" if result else "The person does not have any heart disease"
#     elif model_type == 'parkinsons':
#         return "The person has Parkinson's disease" if result else "The person does not have Parkinson's disease"

# if __name__ == "__main__":
#     # Get arguments from Node.js
#     model_type = sys.argv[1]
#     input_data_json = sys.argv[2]
#     models_path = sys.argv[3]
    
#     # Make prediction
#     result = make_prediction(model_type, input_data_json, models_path)
    
#     # Print result as JSON (to be captured by Node.js)
#     print(json.dumps(result))





import sys
import os
import json
import pickle
import numpy as np

def load_model(model_type, models_path):
    """Load the specified ML model from the saved_models directory."""
    model_filename = None
    
    if model_type == 'diabetes':
        model_filename = os.path.join(models_path, 'diabetes_model.sav')
    elif model_type == 'heart':
        model_filename = os.path.join(models_path, 'heart_disease_model.sav')
    elif model_type == 'parkinsons':
        model_filename = os.path.join(models_path, 'parkinsons_model.sav')
    elif model_type == 'kidney':
        model_filename = os.path.join(models_path, 'kidney.sav')
    else:
        raise ValueError(f"Invalid model type: {model_type}")
    
    try:
        return pickle.load(open(model_filename, 'rb'))
    except Exception as e:
        raise Exception(f"Error loading model: {str(e)}")

def prepare_input_data(model_type, input_data):
    """Transform input data into the format expected by the ML model."""
    if model_type == 'diabetes':
        features = [
            'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 
            'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
        ]
    elif model_type == 'heart':
        features = [
            'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
            'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
        ]
    elif model_type == 'parkinsons':
        features = [
            'fo', 'fhi', 'flo', 'Jitter_percent', 'Jitter_Abs', 'RAP', 'PPQ', 
            'DDP', 'Shimmer', 'Shimmer_dB', 'APQ3', 'APQ5', 'APQ', 'DDA', 
            'NHR', 'HNR', 'RPDE', 'DFA', 'spread1', 'spread2', 'D2', 'PPE'
        ]
    elif model_type == 'kidney':
        features = [
            'age', 'blood_pressure', 'specific_gravity', 'albumin', 'sugar',
            'red_blood_cells', 'pus_cell', 'pus_cell_clumps', 'bacteria',
            'blood_glucose_random', 'blood_urea', 'serum_creatinine', 'sodium',
            'potassium', 'haemoglobin', 'packed_cell_volume',
            'white_blood_cell_count', 'red_blood_cell_count', 'hypertension',
            'diabetes_mellitus', 'coronary_artery_disease', 'appetite',
            'peda_edema', 'aanemia'
        ]
    
    return np.array([[float(input_data[feature]) for feature in features]])

def make_prediction(model_type, input_data_json, models_path):
    """Make prediction using the specified model and input data."""
    try:
        # Parse input JSON
        input_data = json.loads(input_data_json)
        
        # Load model
        model = load_model(model_type, models_path)
        
        # Prepare input data
        X = prepare_input_data(model_type, input_data)
        
        # Make prediction
        prediction = model.predict(X)
        
        # Convert prediction to boolean (1 = positive, 0 = negative)
        result = bool(prediction[0] == 1)
        
        # Return result as JSON
        return {
            'success': True,
            'model_type': model_type,
            'result': result,
            'message': get_result_message(model_type, result)
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def get_result_message(model_type, result):
    """Get human-readable message based on prediction result."""
    if model_type == 'diabetes':
        return "The person is diabetic" if result else "The person is not diabetic"
    elif model_type == 'heart':
        return "The person is having heart disease" if result else "The person does not have any heart disease"
    elif model_type == 'parkinsons':
        return "The person has Parkinson's disease" if result else "The person does not have Parkinson's disease"
    elif model_type == 'kidney':
        return "The person has kidney disease" if result else "The person does not have kidney disease"

if __name__ == "__main__":
    # Get arguments from Node.js
    model_type = sys.argv[1]
    input_data_json = sys.argv[2]
    models_path = sys.argv[3]
    
    # Make prediction
    result = make_prediction(model_type, input_data_json, models_path)
    
    # Print result as JSON (to be captured by Node.js)
    print(json.dumps(result))