import { useState, useEffect } from 'react';
import { Trash2, Activity, Heart, Brain, Droplet, TrendingUp, TrendingDown, Calendar, Clock, Eye, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { predictionService } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalPredictions: 0,
    diabetesPredictions: 0,
    heartPredictions: 0,
    parkinsonsPredictions: 0,
    positiveResults: 0,
    negativeResults: 0
  });

  const [recentPredictions, setRecentPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [expandedPrediction, setExpandedPrediction] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes] = await Promise.all([
          predictionService.getUserPredictions(),
        ]);

        const predictions = statsRes.data.data;
        //  console.log(predictions[0].inputData);
         
        const newStats = {
          totalPredictions: predictions.length,
          diabetesPredictions: predictions.filter(p => p.predictionType === 'diabetes').length,
          heartPredictions: predictions.filter(p => p.predictionType === 'heart').length,
          parkinsonsPredictions: predictions.filter(p => p.predictionType === 'parkinsons').length,
          positiveResults: predictions.filter(p => p.result === true).length,
          negativeResults: predictions.filter(p => p.result === false).length,
        };

        setStats(newStats);
        setRecentPredictions(predictions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDeletePrediction = async (id) => {
    setDeleting(id);
    try {
      // Find the prediction before deleting to update stats
      const deletedPrediction = recentPredictions.find(p => p._id === id);
      
      await predictionService.deletePrediction(id);
      
      // Update recent predictions list immediately
      setRecentPredictions(prev => prev.filter(p => p._id !== id));
      
      // Update stats immediately
      if (deletedPrediction) {
        setStats(prev => ({
          ...prev,
          totalPredictions: prev.totalPredictions - 1,
          [`${deletedPrediction.predictionType}Predictions`]: prev[`${deletedPrediction.predictionType}Predictions`] - 1,
          [deletedPrediction.result ? 'positiveResults' : 'negativeResults']: prev[deletedPrediction.result ? 'positiveResults' : 'negativeResults'] - 1
        }));
      }
    } catch (error) {
      console.error('Error deleting prediction:', error);
      // Optionally show error message to user
      alert('Failed to delete prediction. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const togglePredictionDetails = (predictionId) => {
    setExpandedPrediction(expandedPrediction === predictionId ? null : predictionId);
  };

  const formatInputData = (inputData) => {
    if (!inputData) return 'No input data available';
    
    return Object.entries(inputData).map(([key, value]) => {
      // Format key to be more readable
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      return { key: formattedKey, value: value };
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getPredictionIcon = (type) => {
    switch (type) {
      case 'diabetes': return <Droplet className="w-5 h-5" />;
      case 'heart': return <Heart className="w-5 h-5" />;
      case 'parkinsons': return <Brain className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getPredictionColor = (type) => {
    switch (type) {
      case 'diabetes': return 'bg-blue-500';
      case 'heart': return 'bg-red-500';
      case 'parkinsons': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Health Prediction Dashboard</h1>
          <p className="text-gray-600">Monitor your health predictions and track your wellness journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Predictions</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalPredictions}</p>
              </div>
              <Activity className="w-8 h-8 text-indigo-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Diabetes</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.diabetesPredictions}</p>
              </div>
              <Droplet className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Heart Disease</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.heartPredictions}</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Parkinson's</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.parkinsonsPredictions}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Positive Results</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.positiveResults}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Negative Results</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.negativeResults}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Recent Predictions */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-6 h-6 text-indigo-500" />
              Recent Predictions
            </h2>
            <p className="text-gray-600 mt-1">Your latest health predictions and results</p>
          </div>

          <div className="p-6">
            {recentPredictions.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No predictions found</p>
                <p className="text-gray-400">Start by making your first health prediction</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentPredictions.map((prediction) => (
                  <div key={prediction._id} className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${getPredictionColor(prediction.predictionType)} text-white`}>
                            {getPredictionIcon(prediction.predictionType)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 capitalize">
                              {prediction.predictionType} Prediction
                            </h4>
                            <div className="flex items-center gap-4 mt-1">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                prediction.result 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {prediction.result ? 'Positive' : 'Negative'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="flex items-center text-sm text-gray-500 gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(prediction.createdAt)}
                            </div>
                          </div>
                          
                          {/* View Input Data Icon */}
                          <button
                            onClick={() => togglePredictionDetails(prediction._id)}
                            className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="View input data"
                          >
                            {expandedPrediction === prediction._id ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                          
                          {/* Delete Icon */}
                          <button
                            onClick={() => handleDeletePrediction(prediction._id)}
                            disabled={deleting === prediction._id}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete prediction"
                          >
                            {deleting === prediction._id ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Input Data Section */}
                    {expandedPrediction === prediction._id && (
                      <div className="border-t border-gray-200 bg-white p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Info className="w-4 h-4 text-indigo-500" />
                          <h5 className="font-medium text-gray-700">Input Data</h5>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {formatInputData(prediction.inputData).map(({ key, value }, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3">
                              <div className="text-sm font-medium text-gray-600 mb-1">{key}</div>
                              <div className="text-gray-800 font-semibold">{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;