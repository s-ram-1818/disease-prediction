import { useState } from 'react';
import axios from 'axios';
import { predictionService } from '../services/api';

function KidneyDiseasePrediction() {
  const [formData, setFormData] = useState({
    age: '',
    blood_pressure: '',
    specific_gravity: '',
    albumin: '',
    sugar: '',
    red_blood_cells: '',
    pus_cell: '',
    pus_cell_clumps: '',
    bacteria: '',
    blood_glucose_random: '',
    blood_urea: '',
    serum_creatinine: '',
    sodium: '',
    potassium: '',
    haemoglobin: '',
    packed_cell_volume: '',
    white_blood_cell_count: '',
    red_blood_cell_count: '',
    hypertension: '',
    diabetes_mellitus: '',
    coronary_artery_disease: '',
    appetite: '',
    peda_edema: '',
    aanemia: ''
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
      // const response = await axios.post('http://localhost:5000/api/predictions/kidney', formData);
      
      const response = await predictionService.makeKidneyDiseasePrediction(formData);
      console.log(response.data.data.message);
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
      <h2>Kidney Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Basic Information */}
          <div className="form-group">
            <label>Age:</label>
            <input 
              type="number" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              required 
              min="1"
              max="120"
            />
          </div>
          
          <div className="form-group">
            <label>Blood Pressure (mm/Hg):</label>
            <input 
              type="number" 
              name="blood_pressure" 
              value={formData.blood_pressure} 
              onChange={handleChange} 
              required 
              min="50"
              max="200"
            />
          </div>
          
          {/* Urine Tests */}
          <div className="form-group">
            <label>Specific Gravity (1.005-1.025):</label>
            <select name="specific_gravity" value={formData.specific_gravity} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1.005">1.005</option>
              <option value="1.010">1.010</option>
              <option value="1.015">1.015</option>
              <option value="1.020">1.020</option>
              <option value="1.025">1.025</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Albumin (0-5):</label>
            <select name="albumin" value={formData.albumin} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Sugar (0-5):</label>
            <select name="sugar" value={formData.sugar} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Red Blood Cells (1=normal, 0=abnormal):</label>
            <select name="red_blood_cells" value={formData.red_blood_cells} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Normal</option>
              <option value="0">Abnormal</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Pus Cell (1=normal, 0=abnormal):</label>
            <select name="pus_cell" value={formData.pus_cell} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Normal</option>
              <option value="0">Abnormal</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Pus Cell Clumps (1=present, 0=not present):</label>
            <select name="pus_cell_clumps" value={formData.pus_cell_clumps} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Present</option>
              <option value="0">Not Present</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Bacteria (1=present, 0=not present):</label>
            <select name="bacteria" value={formData.bacteria} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Present</option>
              <option value="0">Not Present</option>
            </select>
          </div>
          
          {/* Blood Tests */}
          <div className="form-group">
            <label>Blood Glucose Random (mgs/dl):</label>
            <input 
              type="number" 
              name="blood_glucose_random" 
              value={formData.blood_glucose_random} 
              onChange={handleChange} 
              required 
              min="50"
              max="500"
            />
          </div>
          
          <div className="form-group">
            <label>Blood Urea (mgs/dl):</label>
            <input 
              type="number" 
              name="blood_urea" 
              value={formData.blood_urea} 
              onChange={handleChange} 
              required 
              min="1"
              max="400"
            />
          </div>
          
          <div className="form-group">
            <label>Serum Creatinine (mgs/dl):</label>
            <input 
              type="number" 
              name="serum_creatinine" 
              value={formData.serum_creatinine} 
              onChange={handleChange} 
              required 
              step="0.1"
              min="0"
              max="15"
            />
          </div>
          
          <div className="form-group">
            <label>Sodium (mEq/L):</label>
            <input 
              type="number" 
              name="sodium" 
              value={formData.sodium} 
              onChange={handleChange} 
              required 
              min="100"
              max="180"
            />
          </div>
          
          <div className="form-group">
            <label>Potassium (mEq/L):</label>
            <input 
              type="number" 
              name="potassium" 
              value={formData.potassium} 
              onChange={handleChange} 
              required 
              step="0.1"
              min="2"
              max="10"
            />
          </div>
          
          <div className="form-group">
            <label>Haemoglobin (gms):</label>
            <input 
              type="number" 
              name="haemoglobin" 
              value={formData.haemoglobin} 
              onChange={handleChange} 
              required 
              step="0.1"
              min="3"
              max="20"
            />
          </div>
          
          <div className="form-group">
            <label>Packed Cell Volume:</label>
            <input 
              type="number" 
              name="packed_cell_volume" 
              value={formData.packed_cell_volume} 
              onChange={handleChange} 
              required 
              min="10"
              max="60"
            />
          </div>
          
          <div className="form-group">
            <label>White Blood Cell Count (cells/cumm):</label>
            <input 
              type="number" 
              name="white_blood_cell_count" 
              value={formData.white_blood_cell_count} 
              onChange={handleChange} 
              required 
              min="2000"
              max="30000"
            />
          </div>
          
          <div className="form-group">
            <label>Red Blood Cell Count (millions/cmm):</label>
            <input 
              type="number" 
              name="red_blood_cell_count" 
              value={formData.red_blood_cell_count} 
              onChange={handleChange} 
              required 
              step="0.1"
              min="2"
              max="8"
            />
          </div>
          
          {/* Medical History */}
          <div className="form-group">
            <label>Hypertension (1=yes, 0=no):</label>
            <select name="hypertension" value={formData.hypertension} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Diabetes Mellitus (1=yes, 0=no):</label>
            <select name="diabetes_mellitus" value={formData.diabetes_mellitus} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Coronary Artery Disease (1=yes, 0=no):</label>
            <select name="coronary_artery_disease" value={formData.coronary_artery_disease} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          
          {/* Symptoms */}
          <div className="form-group">
            <label>Appetite (1=good, 0=poor):</label>
            <select name="appetite" value={formData.appetite} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Good</option>
              <option value="0">Poor</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Pedal Edema (1=yes, 0=no):</label>
            <select name="peda_edema" value={formData.peda_edema} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Anemia (1=yes, 0=no):</label>
            <select name="aanemia" value={formData.aanemia} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
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

export default KidneyDiseasePrediction;