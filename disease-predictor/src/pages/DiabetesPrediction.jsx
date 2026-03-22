import React, { useState } from 'react';
import { predictionService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const DiabetesPredictionForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);
    
    try {
      // Convert all values to floats
      const numericalData = Object.keys(formData).reduce((obj, key) => {
        obj[key] = parseFloat(formData[key]);
        return obj;
      }, {});
      
      // Validate that all fields are filled
      const emptyFields = Object.keys(numericalData).filter(key => 
        isNaN(numericalData[key]) || numericalData[key] === ''
      );
      
      if (emptyFields.length > 0) {
        setError(`Please fill all fields: ${emptyFields.join(', ')}`);
        setIsLoading(false);
        return;
      }
      
      // Make prediction API call
      const response = await predictionService.makeDiabetesPrediction(numericalData);
      console.log(response.data.data.message);
      setResult(response.data.data.message);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      Pregnancies: '',
      Glucose: '',
      BloodPressure: '',
      SkinThickness: '',
      Insulin: '',
      BMI: '',
      DiabetesPedigreeFunction: '',
      Age: ''
    });
    setResult(null);
    setError('');
  };

  return (
    <div className="diabetes-prediction-form">
      <h2>Diabetes Prediction</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Pregnancies">Number of Pregnancies</label>
              <input
                type="number"
                id="Pregnancies"
                name="Pregnancies"
                value={formData.Pregnancies}
                onChange={handleInputChange}
                min="0"
                step="1"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="Glucose">Glucose Level (mg/dL)</label>
              <input
                type="number"
                id="Glucose"
                name="Glucose"
                value={formData.Glucose}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="BloodPressure">Blood Pressure (mm Hg)</label>
              <input
                type="number"
                id="BloodPressure"
                name="BloodPressure"
                value={formData.BloodPressure}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="SkinThickness">Skin Thickness (mm)</label>
              <input
                type="number"
                id="SkinThickness"
                name="SkinThickness"
                value={formData.SkinThickness}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Insulin">Insulin Level (mu U/ml)</label>
              <input
                type="number"
                id="Insulin"
                name="Insulin"
                value={formData.Insulin}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="BMI">BMI (weight in kg/(height in m)²)</label>
              <input
                type="number"
                id="BMI"
                name="BMI"
                value={formData.BMI}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="DiabetesPedigreeFunction">Diabetes Pedigree Function</label>
              <input
                type="number"
                id="DiabetesPedigreeFunction"
                name="DiabetesPedigreeFunction"
                value={formData.DiabetesPedigreeFunction}
                onChange={handleInputChange}
                min="0"
                step="0.001"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="Age">Age (years)</label>
              <input
                type="number"
                id="Age"
                name="Age"
                value={formData.Age}
                onChange={handleInputChange}
                min="0"
                step="1"
                required
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" disabled={isLoading} className='submit-btn'>
              {isLoading ? 'Processing...' : 'Get Prediction'}
            </button>
          

          </div>
        </form>

        {result && (
        <div className={`result ${result.includes('not') ? 'negative' : 'positive'}`}>
          <h3>Prediction Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default DiabetesPredictionForm;