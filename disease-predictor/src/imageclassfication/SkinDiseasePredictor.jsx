import React, { useState, useRef } from 'react';
import { Camera, Upload, X, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const SkinDiseasePredictor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  // Process and preview image
  const processImage = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Image size should be less than 5MB');
      return;
    }

    setSelectedImage(file);
    setError(null);
    setPrediction(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit image for prediction
  const handlePrediction = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('/api/predictions/skin-disease', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear current image and prediction
  const clearImage = () => {
    setSelectedImage(null);
    setPreview(null);
    setPrediction(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Skin Disease Prediction</h2>
        <p className="text-gray-600">Upload an image of the affected skin area for AI-powered analysis</p>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <AlertCircle className="inline w-4 h-4 mr-1" />
            This is for informational purposes only. Please consult a healthcare professional for proper diagnosis.
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="mb-8">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          {!preview ? (
            <>
              <div className="flex justify-center space-x-4 mb-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </button>
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Take Photo
                </button>
              </div>
              <p className="text-gray-500">Drag and drop an image here, or click to select</p>
              <p className="text-sm text-gray-400 mt-2">Supported formats: JPG, PNG, JPEG (Max 5MB)</p>
            </>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-96 mx-auto rounded-lg shadow-md"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </p>
        </div>
      )}

      {/* Analyze Button */}
      {preview && !prediction && (
        <div className="text-center mb-8">
          <button
            onClick={handlePrediction}
            disabled={loading}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center mx-auto"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Image'
            )}
          </button>
        </div>
      )}

      {/* Prediction Results */}
      {prediction && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
            Analysis Results
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Primary Prediction */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2">Primary Prediction</h4>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {prediction.predicted_class}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                Confidence: {(prediction.confidence * 100).toFixed(1)}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${prediction.confidence * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Top Predictions */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-3">All Predictions</h4>
              <div className="space-y-2">
                {prediction.all_predictions?.slice(0, 5).map((pred, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{pred.class}</span>
                    <span className="text-sm font-medium">{(pred.probability * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {prediction.description && (
            <div className="mt-6 bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2">Information</h4>
              <p className="text-gray-700">{prediction.description}</p>
            </div>
          )}

          {/* Recommendations */}
          {prediction.recommendations && (
            <div className="mt-6 bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2">Recommendations</h4>
              <ul className="text-gray-700 space-y-1">
                {prediction.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={clearImage}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Analyze Another Image
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinDiseasePredictor;