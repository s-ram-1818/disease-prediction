import { useState } from 'react';
import axios from 'axios';
import { predictionService } from '../services/api';


function HeartDiseasePrediction() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });
  
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // const response = await axios.post('http://localhost:5000/api/predictions/heart', formData);

       const response = await predictionService.makeHeartDiseasePrediction(formData);
            console.log(response.data.data.message);
            // setResult(response.data);
      setResult(response.data.data.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      setResult('An error occurred during prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-form">
      <h2>Heart Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Sex (1=male, 0=female):</label>
            <select name="sex" value={formData.sex} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Chest Pain Type (0-3):</label>
            <select name="cp" value={formData.cp} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="0">Typical Angina</option>
              <option value="1">Atypical Angina</option>
              <option value="2">Non-anginal Pain</option>
              <option value="3">Asymptomatic</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Resting Blood Pressure (mm Hg):</label>
            <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Serum Cholesterol (mg/dl):</label>
            <input type="number" name="chol" value={formData.chol} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Fasting Blood Sugar -- 120 mg/dl (1=true, 0=false):</label>
            <select name="fbs" value={formData.fbs} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">True</option>
              <option value="0">False</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Resting ECG Results (0-2):</label>
            <select name="restecg" value={formData.restecg} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="0">Normal</option>
              <option value="1">ST-T Wave Abnormality</option>
              <option value="2">Left Ventricular Hypertrophy</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Maximum Heart Rate:</label>
            <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Exercise Induced Angina (1=yes, 0=no):</label>
            <select name="exang" value={formData.exang} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>ST Depression Induced by Exercise:</label>
            <input type="number" name="oldpeak" value={formData.oldpeak} onChange={handleChange} required step="0.1" />
          </div>
          
          <div className="form-group">
            <label>Slope of Peak Exercise ST Segment:</label>
            <select name="slope" value={formData.slope} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="0">Upsloping</option>
              <option value="1">Flat</option>
              <option value="2">Downsloping</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Number of Major Vessels (0-3):</label>
            <select name="ca" value={formData.ca} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Thal (0=normal, 1=fixed defect, 2=reversible defect):</label>
            <select name="thal" value={formData.thal} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="0">Normal</option>
              <option value="1">Fixed Defect</option>
              <option value="2">Reversible Defect</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Get Prediction'}
        </button>
      </form>
      
      {result && (
        <div className={`result ${result.includes('not') ? 'negative' : 'positive'}`}>
          <h3>Prediction Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default HeartDiseasePrediction;