import React, { useState } from 'react';
import yogaData from './1.json'

// Sample yoga data - replace with your actual data from 1.json
// const yogaData = {
//   "diseases": {
//     "diabetes": [
//       {
//         "name": "Dhanurasana",
//         "english_name": "Bow Pose",
//         "benefits": "Stimulates the pancreas, improves digestion, helps control blood sugar levels",
//         "contraindications": "Avoid during pregnancy, hernia, or lower back pain"
//       },
//       {
//         "name": "Ardha Matsyendrasana",
//         "english_name": "Half Spinal Twist",
//         "benefits": "Improves digestion and massages abdominal organs",
//         "contraindications": "Avoid with spinal injuries or during menstruation"
//       },
//       {
//         "name": "Paschimottanasana",
//         "english_name": "Seated Forward Bend",
//         "benefits": "Calms the nervous system and stimulates digestive organs",
//         "contraindications": "Avoid with lower back injuries"
//       }
//     ],
//     "hypertension": [
//       {
//         "name": "Shavasana",
//         "english_name": "Corpse Pose",
//         "benefits": "Relaxes the body and lowers blood pressure",
//         "contraindications": "None"
//       },
//       {
//         "name": "Balasana",
//         "english_name": "Child's Pose",
//         "benefits": "Reduces stress and anxiety, lowers blood pressure",
//         "contraindications": "Avoid with knee injuries"
//       }
//     ],
//     "back_pain": [
//       {
//         "name": "Marjaryasana",
//         "english_name": "Cat Pose",
//         "benefits": "Stretches the spine and relieves tension in back muscles",
//         "contraindications": "Avoid with severe spinal injuries"
//       },
//       {
//         "name": "Bitilasana",
//         "english_name": "Cow Pose",
//         "benefits": "Improves spinal flexibility and relieves back pain",
//         "contraindications": "Avoid with neck injuries"
//       }
//     ]
//   },
//   "yoga_poses": {
//     "Dhanurasana": {
//       "english_name": "Bow Pose",
//       "benefits": "Stimulates the pancreas, improves digestion, helps control blood sugar levels",
//       "contraindications": "Avoid during pregnancy, hernia, or lower back pain",
//       "helps_with": ["diabetes"]
//     },
//     "Ardha Matsyendrasana": {
//       "english_name": "Half Spinal Twist",
//       "benefits": "Improves digestion and massages abdominal organs",
//       "contraindications": "Avoid with spinal injuries or during menstruation",
//       "helps_with": ["diabetes"]
//     },
//     "Shavasana": {
//       "english_name": "Corpse Pose",
//       "benefits": "Relaxes the body and lowers blood pressure",
//       "contraindications": "None",
//       "helps_with": ["hypertension", "stress"]
//     },
//     "Balasana": {
//       "english_name": "Child's Pose",
//       "benefits": "Reduces stress and anxiety, lowers blood pressure",
//       "contraindications": "Avoid with knee injuries",
//       "helps_with": ["hypertension", "stress"]
//     },
//     "Marjaryasana": {
//       "english_name": "Cat Pose",
//       "benefits": "Stretches the spine and relieves tension in back muscles",
//       "contraindications": "Avoid with severe spinal injuries",
//       "helps_with": ["back_pain"]
//     },
//     "Bitilasana": {
//       "english_name": "Cow Pose",
//       "benefits": "Improves spinal flexibility and relieves back pain",
//       "contraindications": "Avoid with neck injuries",
//       "helps_with": ["back_pain"]
//     }
//   }
// };

const YogaDataDisplay = () => {
  const [selectedDisease, setSelectedDisease] = useState('');
  const [selectedPose, setSelectedPose] = useState('');
  const [activeTab, setActiveTab] = useState('diseases');
  const [searchTerm, setSearchTerm] = useState('');

  const diseases = Object.keys(yogaData.diseases);
  const poses = Object.keys(yogaData.yoga_poses);

  // Function to search YouTube for a specific yoga pose
  const searchYouTube = (poseName, englishName) => {
    const searchQuery = `${poseName} ${englishName} yoga tutorial`;
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    window.open(youtubeSearchUrl, '_blank');
  };

  // Filter poses based on search term
  const filteredPoses = poses.filter(pose => 
    pose.toLowerCase().includes(searchTerm.toLowerCase()) ||
    yogaData.yoga_poses[pose].english_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDiseaseInfo = (disease) => {
    const diseaseData = yogaData.diseases[disease];
    return (
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-green-700 mb-4 capitalize">
          {disease.replace('_', ' ')} - Recommended Yoga Poses
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {diseaseData.map((pose, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {pose.name} ({pose.english_name})
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-green-600">Benefits:</span>
                  <p className="text-gray-700 text-sm mt-1">{pose.benefits}</p>
                </div>
                <div>
                  <span className="font-medium text-red-600">Contraindications:</span>
                  <p className="text-gray-700 text-sm mt-1">{pose.contraindications}</p>
                </div>
                <button
                  onClick={() => searchYouTube(pose.name, pose.english_name)}
                  className="inline-flex items-center px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Search on YouTube
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPoseInfo = (poseName) => {
    const poseData = yogaData.yoga_poses[poseName];
    return (
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-green-700 mb-4">
          {poseName} ({poseData.english_name})
        </h3>
        <div className="space-y-4">
          <div>
            <span className="font-medium text-green-600">Benefits:</span>
            <p className="text-gray-700 mt-1">{poseData.benefits}</p>
          </div>
          <div>
            <span className="font-medium text-red-600">Contraindications:</span>
            <p className="text-gray-700 mt-1">{poseData.contraindications}</p>
          </div>
          <div>
            <span className="font-medium text-purple-600">Helps with:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {poseData.helps_with.map((condition, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                >
                  {condition.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => searchYouTube(poseName, poseData.english_name)}
            className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Search YouTube Tutorial
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🧘‍♀️ Yoga Therapy Guide
          </h1>
          <p className="text-gray-600">
            Discover yoga poses for various health conditions and find tutorials on YouTube
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => setActiveTab('diseases')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'diseases'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Browse by Condition
            </button>
            <button
              onClick={() => setActiveTab('poses')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'poses'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Browse by Pose
            </button>
          </div>
        </div>

        {/* Diseases Tab */}
        {activeTab === 'diseases' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Select a Health Condition
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {diseases.map((disease) => (
                <button
                  key={disease}
                  onClick={() => setSelectedDisease(disease)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedDisease === disease
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <span className="font-medium capitalize">
                    {disease.replace('_', ' ')}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    {yogaData.diseases[disease].length} poses
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Poses Tab */}
        {activeTab === 'poses' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Select a Yoga Pose
            </h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search poses by Sanskrit or English name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {filteredPoses.map((pose) => (
                <button
                  key={pose}
                  onClick={() => setSelectedPose(pose)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedPose === pose
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="font-medium">{pose.replace('_', ' ')}</div>
                  <div className="text-sm text-gray-600">
                    {yogaData.yoga_poses[pose].english_name}
                  </div>
                </button>
              ))}
            </div>
            {filteredPoses.length === 0 && searchTerm && (
              <p className="text-gray-500 text-center mt-4">No poses found matching your search.</p>
            )}
          </div>
        )}

        {/* Display Results */}
        {activeTab === 'diseases' && selectedDisease && renderDiseaseInfo(selectedDisease)}
        {activeTab === 'poses' && selectedPose && renderPoseInfo(selectedPose)}

        {/* Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Database Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.keys(yogaData.diseases).length}
              </div>
              <div className="text-sm text-gray-600">Health Conditions</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Object.keys(yogaData.yoga_poses).length}
              </div>
              <div className="text-sm text-gray-600">Yoga Poses</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Object.values(yogaData.diseases).flat().length}
              </div>
              <div className="text-sm text-gray-600">Disease-Pose Mappings</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                YouTube
              </div>
              <div className="text-sm text-gray-600">Video Search</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">How it works:</h4>
          <p className="text-blue-700 text-sm">
            Click on "Search on YouTube" or "Search YouTube Tutorial" buttons to automatically search for yoga pose tutorials on YouTube. 
            The search will include both the Sanskrit name and English name of the pose for better results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default YogaDataDisplay;