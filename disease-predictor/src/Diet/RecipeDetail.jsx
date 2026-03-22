import React, { useState, useEffect } from 'react';
import { Clock, Users, DollarSign, Utensils, ArrowLeft } from 'lucide-react';

const RecipeDetail = ({ recipeId, onBack }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Replace with your actual API key
        const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
        
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setRecipe(data);
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to fetch recipe details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipeDetail();
    }
  }, [recipeId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-gray-300 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to recipes
        </button>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  // Safe access to nutrition data
  const nutrients = recipe.nutrition?.nutrients || [];
  const mainNutrients = nutrients.filter(n => 
    ['Calories', 'Protein', 'Fat', 'Carbohydrates', 'Fiber', 'Sugar'].includes(n.name)
  );

  const vitaminsAndMinerals = nutrients.filter(n => 
    ['Vitamin C', 'Calcium', 'Iron', 'Potassium', 'Sodium'].includes(n.name)
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to recipes
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {recipe.readyInMinutes} minutes
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {recipe.servings} servings
          </div>
          {recipe.pricePerServing && (
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              ${(recipe.pricePerServing / 100).toFixed(2)} per serving
            </div>
          )}
        </div>

        {recipe.cuisines && recipe.cuisines.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.cuisines.map((cuisine, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {cuisine}
              </span>
            ))}
            {recipe.diets && recipe.diets.map((diet, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {diet}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      {recipe.image && (
        <div className="mb-8">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Summary */}
          {recipe.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About This Recipe</h2>
              <p className="text-gray-700 leading-relaxed">
                {recipe.summary.replace(/<[^>]*>/g, '')}
              </p>
            </div>
          )}

          {/* Ingredients */}
          {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Utensils className="w-6 h-6 mr-2" />
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{ingredient.original}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              {recipe.analyzedInstructions.map((instruction, instrIndex) => (
                <ol key={instrIndex} className="space-y-4">
                  {instruction.steps.map((step) => (
                    <li key={step.number} className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                        {step.number}
                      </span>
                      <p className="text-gray-700 pt-1">{step.step}</p>
                    </li>
                  ))}
                </ol>
              ))}
            </div>
          )}
        </div>

        {/* Nutrition Panel */}
        {nutrients.length > 0 && (
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h2 className="text-2xl font-semibold mb-6">Nutrition Facts</h2>
              
              {/* Main Nutrients */}
              {mainNutrients.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Per Serving</h3>
                  <div className="space-y-3">
                    {mainNutrients.map((nutrient, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-700 font-medium">{nutrient.name}</span>
                        <div className="text-right">
                          <span className="font-semibold">{nutrient.amount.toFixed(1)}{nutrient.unit}</span>
                          {nutrient.percentOfDailyNeeds && (
                            <div className="text-xs text-gray-500">{nutrient.percentOfDailyNeeds.toFixed(0)}% DV</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vitamins & Minerals */}
              {vitaminsAndMinerals.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Vitamins & Minerals</h3>
                  <div className="space-y-2">
                    {vitaminsAndMinerals.map((nutrient, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{nutrient.name}</span>
                        <span className="font-medium">{nutrient.percentOfDailyNeeds?.toFixed(0) || 0}% DV</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cost Breakdown */}
              {recipe.pricePerServing && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium mb-3">Cost Analysis</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Per serving</span>
                      <span className="font-medium">${(recipe.pricePerServing / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total recipe</span>
                      <span className="font-medium">${((recipe.pricePerServing * recipe.servings) / 100).toFixed(2)}</span>
                    </div>
                    {mainNutrients.find(n => n.name === 'Calories') && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost per calorie</span>
                        <span className="font-medium">${((recipe.pricePerServing / 100) / mainNutrients.find(n => n.name === 'Calories').amount).toFixed(4)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;