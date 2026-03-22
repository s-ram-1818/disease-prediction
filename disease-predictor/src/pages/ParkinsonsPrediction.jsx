import { useState } from 'react';
// import axios from 'axios';
import { predictionService } from '../services/api';


function ParkinsonsPrediction() {
  const [formData, setFormData] = useState({
    fo: '',
    fhi: '',
    flo: '',
    Jitter_percent: '',
    Jitter_Abs: '',
    RAP: '',
    PPQ: '',
    DDP: '',
    Shimmer: '',
    Shimmer_dB: '',
    APQ3: '',
    APQ5: '',
    APQ: '',
    DDA: '',
    NHR: '',
    HNR: '',
    RPDE: '',
    DFA: '',
    spread1: '',
    spread2: '',
    D2: '',
    PPE: ''
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
      const response = await predictionService.makeParkinsonsPrediction(formData);
            console.log(response.data.data.message);
      setResult(response.data.result);
    } catch (error) {
      console.error('Error submitting form:', error);
      setResult('An error occurred during prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-form">
      <h2>Parkinson's Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>MDVP:Fo(Hz):</label>
            <input type="number" name="fo" value={formData.fo} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>MDVP:Fhi(Hz):</label>
            <input type="number" name="fhi" value={formData.fhi} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>MDVP:Flo(Hz):</label>
            <input type="number" name="flo" value={formData.flo} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>MDVP:Jitter(%):</label>
            <input type="number" name="Jitter_percent" value={formData.Jitter_percent} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>MDVP:Jitter(Abs):</label>
            <input type="number" name="Jitter_Abs" value={formData.Jitter_Abs} onChange={handleChange} required step="0.0000001" />
          </div>
          
          <div className="form-group">
            <label>MDVP:RAP:</label>
            <input type="number" name="RAP" value={formData.RAP} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>MDVP:PPQ:</label>
            <input type="number" name="PPQ" value={formData.PPQ} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>Jitter:DDP:</label>
            <input type="number" name="DDP" value={formData.DDP} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>MDVP:Shimmer:</label>
            <input type="number" name="Shimmer" value={formData.Shimmer} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>MDVP:Shimmer(dB):</label>
            <input type="number" name="Shimmer_dB" value={formData.Shimmer_dB} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>Shimmer:APQ3:</label>
            <input type="number" name="APQ3" value={formData.APQ3} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>Shimmer:APQ5:</label>
            <input type="number" name="APQ5" value={formData.APQ5} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>MDVP:APQ:</label>
            <input type="number" name="APQ" value={formData.APQ} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>Shimmer:DDA:</label>
            <input type="number" name="DDA" value={formData.DDA} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>NHR:</label>
            <input type="number" name="NHR" value={formData.NHR} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>HNR:</label>
            <input type="number" name="HNR" value={formData.HNR} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>RPDE:</label>
            <input type="number" name="RPDE" value={formData.RPDE} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>DFA:</label>
            <input type="number" name="DFA" value={formData.DFA} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>spread1:</label>
            <input type="number" name="spread1" value={formData.spread1} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>spread2:</label>
            <input type="number" name="spread2" value={formData.spread2} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>D2:</label>
            <input type="number" name="D2" value={formData.D2} onChange={handleChange} required step="0.001" />
          </div>
          
          <div className="form-group">
            <label>PPE:</label>
            <input type="number" name="PPE" value={formData.PPE} onChange={handleChange} required step="0.001" />
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

export default ParkinsonsPrediction;