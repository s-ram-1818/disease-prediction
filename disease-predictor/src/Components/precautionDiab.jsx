import React from 'react'

function precautionDiab() {
  return (
    <div>
       <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">🩺 Diabetes Management Guide</h1>

      {/* ✅ Diet Plan */}
      <section>
        <h2 className="text-xl font-semibold text-green-700">✅ Recommended Diet Plan</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
          <li>🥦 Vegetables: Broccoli, spinach, cauliflower, carrots, beans</li>
          <li>🥗 Whole Grains: Brown rice, oats, quinoa, whole wheat bread</li>
          <li>🍎 Fruits: Apple, berries, orange (in moderation)</li>
          <li>🥜 Proteins: Tofu, paneer (low-fat), lentils, boiled eggs, grilled chicken/fish</li>
          <li>🥛 Dairy: Low-fat milk, yogurt (unsweetened)</li>
          <li>💧 Water: 2.5 – 3 liters daily</li>
        </ul>
      </section>

      {/* ❌ Foods to Avoid */}
      <section>
        <h2 className="text-xl font-semibold text-red-700">❌ Foods to Avoid</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
          <li>🍬 Sugar & sweets (candies, cakes, pastries)</li>
          <li>🥤 Sugary drinks (soft drinks, sweetened juices)</li>
          <li>🍞 Refined carbs (white bread, white rice, pasta)</li>
          <li>🍟 Fried and oily food</li>
          <li>🍕 Junk food and fast food</li>
          <li>🍺 Alcohol and smoking (strictly avoid)</li>
        </ul>
      </section>

      {/* 📊 Necessary Parameters */}
      <section>
        <h2 className="text-xl font-semibold text-purple-700">📊 Important Parameters to Monitor</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
          <li>🩸 Blood Sugar (Fasting & Post-meal)</li>
          <li>🩺 HbA1c (Every 3 months)</li>
          <li>⚖️ Weight and BMI</li>
          <li>💓 Blood Pressure</li>
          <li>💉 Cholesterol levels</li>
          <li>👣 Foot care (daily inspection)</li>
          <li>🏃‍♂️ Physical Activity (at least 30 min/day walk)</li>
        </ul>
      </section>

      {/* 💡 Tips */}
      <section>
        <h2 className="text-xl font-semibold text-yellow-600">💡 Tips for Diabetics</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
          <li>Eat small, frequent meals</li>
          <li>Never skip breakfast</li>
          <li>Do regular physical activity</li>
          <li>Consult your doctor before any diet or medication changes</li>
        </ul>
      </section>
    </div>
    </div>
  )
}

export default precautionDiab
