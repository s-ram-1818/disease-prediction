import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import DiabetesPrediction from './pages/DiabetesPrediction';
import HeartDiseasePrediction from './pages/HeartDiseasePrediction';
import ParkinsonsPrediction from './pages/ParkinsonsPrediction';
import Dashboard from './pages/Dashboard';
import Login from './Components/login';
import Signup from './Components/signup';
import PrecautionDiab from './Components/precautionDiab';
import YogaDataDisplay from './Yoga/YogaDataDisplay';
import Diet from './Diet/Diet';
import './App.css';
import Footer from './Components/Footer';
import RecipeDetailDemo from './Diet/RecipeDetail';
import SkinDiseasePredictor from './imageclassfication/SkinDiseasePredictor';
import KidneyDiseasePrediction from './pages/Kidney';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  // Check for existing session on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsLoggedIn(true);
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  // Public Route Component (redirect to home if already logged in)
  const PublicRoute = ({ children }) => {
    return !isLoggedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <div className="app">
        <Navbar 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          user={user} 
          setUser={setUser} 
        />
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <Signup setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
                </PublicRoute>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                  <Home />
              } 
            />
            <Route 
              path="/diabetes" 
              element={
                  <DiabetesPrediction />
              } 
            />
            <Route 
              path="/heart" 
              element={
                  <HeartDiseasePrediction />
              } 
            />
            <Route 
              path="/parkinsons" 
              element={
                  <ParkinsonsPrediction />
              } 
            />
            <Route 
              path="/precautionDiab" 
              element={
                  <PrecautionDiab />
              } 
            />
            <Route 
              path="/Kidney" 
              element={
                  <KidneyDiseasePrediction />
              } 
            />
            <Route 
              path="/yoga" 
              element={
                  <YogaDataDisplay />
              } 
            />
            <Route 
              path="/diet" 
              element={
                  <Diet />
              } 
            />
            {/* <Route 
              path="/diet/detail" 
              element={
                  <RecipeDetailDemo />
              } 
            /> */}
            <Route path="/d" element={<SkinDiseasePredictor />} />
            <Route 
              path="/dashboard" 
              element={
                  <Dashboard />
              } 
            />

            {/* Catch all route - redirect to login if not authenticated, home if authenticated */}
            <Route 
              path="*" 
              element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} 
            />
          </Routes>
        </div>
         <Footer 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          user={user} 
          setUser={setUser} 
        />
      </div>
    </Router>
  );
}

export default App;