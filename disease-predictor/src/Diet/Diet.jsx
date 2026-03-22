// import { useState, useEffect } from 'react';
// // Import your api service instead of predictionService
// import { authService } from '../services/api'; // Adjust path as needed

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         setLoading(true);
//         // Use api.get directly instead of predictionService.getCurrentUser()
//         const response = await authService.getCurrentUser();
//         // console.log(response.data.data);
//         setUser(response.data.data);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch user data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading user information...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
//           <h3 className="font-bold text-lg mb-2">Error</h3>
//           <p>{error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-gray-600">No user data available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
//             <div className="flex items-center space-x-4">
//               <img
//                 src={user.avatar || 'https://via.placeholder.com/100'}
//                 alt="User Avatar"
//                 className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
//               />
//               <div className="text-white">
//                 <h1 className="text-2xl font-bold">{user.name}</h1>
//                 <p className="text-blue-100">@{user.username}</p>
//                 <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
//                   user.isActive 
//                     ? 'bg-green-100 text-green-800' 
//                     : 'bg-red-100 text-red-800'
//                 }`}>
//                   {user.isActive ? 'Active' : 'Inactive'}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* User Details */}
//           <div className="p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">User Information</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">User ID</label>
//                 <p className="text-gray-900 font-mono">{user.id}</p>
//               </div>

//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
//                 <p className="text-gray-900">{user.email}</p>
//               </div>

//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
//                 <p className="text-gray-900 capitalize">{user.role}</p>
//               </div>

//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Member Since</label>
//                 <p className="text-gray-900">
//                   {new Date(user.createdAt).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                   })}
//                 </p>
//               </div>
//             </div>

//             {/* Raw JSON Display */}
//             <div className="mt-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Raw User Data</h3>
//               <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
//                 <pre className="text-sm whitespace-pre-wrap">
//                   {JSON.stringify(user, null, 2)}
//                 </pre>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-6 flex space-x-4">
//               <button 
//                 onClick={() => window.location.reload()}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Refresh Data
//               </button>
//               <button 
//                 onClick={() => console.log('User data:', user)}
//                 className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 Log to Console
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       </div>
//     );
//   }

// export default UserProfile;

// import.meta.env.VITE_SPOONACULAR_API_KEY

import React, { useState } from 'react';
import RecipeDetail from './RecipeDetail';

const Diet = () => {
  const [formData, setFormData] = useState({
    age: '20',
    height: '165',
    weight: '60',
    gender: 'male',
    activity: 'sedentary',
    diet: 'vegetarian',
    intolerances: 'non-veg,garlic,onlion',
    goal: 'maintain',
    mealsPerDay: '3'
  });

  const [mealPlan, setMealPlan] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });
  const [calories, setCalories] = useState(null);
  const [caloriesPerMeal, setCaloriesPerMeal] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [currentView, setCurrentView] = useState('form');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTDEE = () => {
    const { weight, height, age, gender, activity, goal } = formData;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (!w || !h || !a) {
      throw new Error('Please fill in all required fields');
    }

    // BMR calculation using Mifflin-St Jeor Equation
    let bmr =
      gender === 'male'
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    let multiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryactive: 1.9
    }[activity];

    let tdee = bmr * multiplier;

    // Adjust for goal
    if (goal === 'lose') tdee -= 500;
    else if (goal === 'gain') tdee += 500;

    return Math.round(tdee);
  };

  const calculateCaloriesPerMeal = (totalCalories, mealsPerDay) => {
    const meals = parseInt(mealsPerDay);
    
    if (meals === 1) {
      return { lunch: totalCalories };
    } else if (meals === 2) {
      return {
        breakfast: Math.round(totalCalories * 0.4),
        dinner: Math.round(totalCalories * 0.6)
      };
    } else if (meals === 3) {
      return {
        breakfast: Math.round(totalCalories * 0.25),
        lunch: Math.round(totalCalories * 0.4),
        dinner: Math.round(totalCalories * 0.35)
      };
    } else if (meals === 4) {
      return {
        breakfast: Math.round(totalCalories * 0.25),
        lunch: Math.round(totalCalories * 0.35),
        dinner: Math.round(totalCalories * 0.3),
        snacks: Math.round(totalCalories * 0.1)
      };
    } else if (meals === 5) {
      return {
        breakfast: Math.round(totalCalories * 0.2),
        lunch: Math.round(totalCalories * 0.3),
        dinner: Math.round(totalCalories * 0.3),
        snacks: Math.round(totalCalories * 0.2)
      };
    }
  };

  const fetchRecipesForMeal = async (mealType, maxCalories, API_KEY) => {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      number: 3,
      maxCalories: maxCalories,
      addRecipeNutrition: true,
      type: mealType === 'snacks' ? 'snack' : 'main course'
    });

    // Add meal-specific queries
    if (mealType === 'breakfast') {
      params.append('query', 'breakfast');
    } else if (mealType === 'lunch') {
      params.append('query', 'lunch');
    } else if (mealType === 'dinner') {
      params.append('query', 'dinner');
    } else if (mealType === 'snacks') {
      params.append('query', 'snack healthy');
    }

    // Add optional parameters if they exist
    if (formData.diet) params.append('diet', formData.diet);
    if (formData.intolerances) params.append('intolerances', formData.intolerances);

    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results || [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const tdee = calculateTDEE();
      setCalories(tdee);

      const calorieDistribution = calculateCaloriesPerMeal(tdee, formData.mealsPerDay);
      setCaloriesPerMeal(calorieDistribution);

      // Replace with your actual API key
      const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
      
      const newMealPlan = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
      };

      // Fetch recipes for each meal based on calorie distribution
      for (const [mealType, calories] of Object.entries(calorieDistribution)) {
        if (calories > 0) {
          const recipes = await fetchRecipesForMeal(mealType, calories, API_KEY);
          newMealPlan[mealType] = recipes;
        }
      }

      setMealPlan(newMealPlan);
      setCurrentView('list');

    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedRecipeId(null);
  };

  const handleBackToForm = () => {
    setCurrentView('form');
    setSelectedRecipeId(null);
    setError(null);
  };

  const getMealIcon = (mealType) => {
    const icons = {
      breakfast: '🌅',
      lunch: '☀️',
      dinner: '🌙',
      snacks: '🍎'
    };
    return icons[mealType] || '🍽️';
  };

  const getMealTitle = (mealType) => {
    const titles = {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snacks: 'Snacks'
    };
    return titles[mealType] || mealType;
  };

  // Render RecipeDetail component
  if (currentView === 'detail' && selectedRecipeId) {
    return (
      <RecipeDetail 
        recipeId={selectedRecipeId} 
        onBack={handleBackToList} 
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      {/* Header with navigation */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-center mb-4">Personalized Meal Plan</h2>
        
        {currentView === 'list' && (
          <button 
            onClick={handleBackToForm}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Form
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Form View */}
      {currentView === 'form' && (
        <>
          <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl mx-auto">
            <input 
              name="age" 
              type="number" 
              placeholder="Age" 
              value={formData.age}
              onChange={handleChange} 
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
            <input 
              name="height" 
              type="number" 
              placeholder="Height (cm)" 
              value={formData.height}
              onChange={handleChange} 
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
            <input 
              name="weight" 
              type="number" 
              placeholder="Weight (kg)" 
              value={formData.weight}
              onChange={handleChange} 
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />

            <select 
              name="gender" 
              value={formData.gender}
              onChange={handleChange} 
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select 
              name="activity" 
              value={formData.activity}
              onChange={handleChange} 
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedentary">Sedentary (little/no exercise)</option>
              <option value="light">Light Activity (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderate Activity (moderate exercise 3-5 days/week)</option>
              <option value="active">Active (hard exercise 6-7 days/week)</option>
              <option value="veryactive">Very Active (very hard exercise, physical job)</option>
            </select>

            <select 
              name="goal" 
              value={formData.goal}
              onChange={handleChange} 
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="maintain">Maintain Weight</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
            </select>

            {/* New field for meals per day */}
            <select 
              name="mealsPerDay" 
              value={formData.mealsPerDay}
              onChange={handleChange} 
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 Meal per Day</option>
              <option value="2">2 Meals per Day</option>
              <option value="3">3 Meals per Day (Recommended)</option>
              <option value="4">4 Meals per Day</option>
            </select>

            <input 
              name="diet" 
              type="text" 
              placeholder="Diet Type (e.g. vegetarian, vegan, ketogenic)" 
              value={formData.diet}
              onChange={handleChange} 
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              name="intolerances" 
              type="text" 
              placeholder="Intolerances (e.g. gluten, dairy, nuts)" 
              value={formData.intolerances}
              onChange={handleChange} 
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />

            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Meal Plan...' : 'Get Personalized Meal Plan'}
            </button>
          </form>

          {calories && !loading && (
            <div className="mt-6 max-w-xl mx-auto text-center">
              <h3 className="text-xl font-semibold">
                Estimated Daily Calories: {calories} kcal
              </h3>
              <p className="text-gray-600 mt-2">
                Divided into {formData.mealsPerDay} meal{formData.mealsPerDay > 1 ? 's' : ''} per day
              </p>
            </div>
          )}
        </>
      )}

      {/* Loading State */}
      {loading && currentView === 'form' && (
        <div className="mt-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Creating your personalized meal plan...</p>
        </div>
      )}

      {/* Meal Plan View */}
      {currentView === 'list' && (
        <>
          {calories && (
            <div className="mb-8 text-center bg-blue-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2">
                Daily Calorie Target: {calories} kcal
              </h3>
              <p className="text-gray-700">
                Distributed across {formData.mealsPerDay} meal{formData.mealsPerDay > 1 ? 's' : ''} per day
              </p>
            </div>
          )}

          <div className="space-y-8">
            {Object.entries(caloriesPerMeal).map(([mealType, mealCalories]) => (
              mealPlan[mealType] && mealPlan[mealType].length > 0 && (
                <div key={mealType} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{getMealIcon(mealType)}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{getMealTitle(mealType)}</h3>
                      <p className="text-gray-600">Target: {mealCalories} calories</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mealPlan[mealType].map((recipe) => (
                      <div 
                        key={recipe.id} 
                        className="bg-white border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleRecipeClick(recipe.id)}
                      >
                        {recipe.image && (
                          <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                        )}
                        <h4 className="font-bold text-lg mb-2 line-clamp-2">{recipe.title}</h4>
                        
                        {/* Show nutrition info if available */}
                        {recipe.nutrition && recipe.nutrition.nutrients && (
                          <div className="text-sm text-gray-600 mb-3 space-y-1">
                            <div>🔥 {Math.round(recipe.nutrition.nutrients.find(n => n.name === 'Calories')?.amount || 0)} cal</div>
                            <div>🥩 {Math.round(recipe.nutrition.nutrients.find(n => n.name === 'Protein')?.amount || 0)}g protein</div>
                            <div>🍞 {Math.round(recipe.nutrition.nutrients.find(n => n.name === 'Carbohydrates')?.amount || 0)}g carbs</div>
                          </div>
                        )}
                        
                        <button className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                          View Recipe →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-8 bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">📊 Your Meal Plan Summary</h3>
            <div className="grid gap-2">
              {Object.entries(caloriesPerMeal).map(([mealType, mealCalories]) => (
                <div key={mealType} className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span>{getMealIcon(mealType)}</span>
                    <span className="font-medium">{getMealTitle(mealType)}</span>
                  </span>
                  <span className="font-semibold">{mealCalories} cal</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total Daily Calories</span>
                  <span>{calories} cal</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Diet;