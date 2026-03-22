import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Chatbot Component
const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 24 }); // Initial position (bottom-right)
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatboxRef = useRef(null);
  const initialPosition = { x: 24, y: 24 };
  const navigate = useNavigate();

  // Get chatbot URL from environment variable
  const chatbotUrl = import.meta.env.VITE_APP_BOTPRESS_URL;
  
  const toggleChat = () => {
    console.log(chatbotUrl);
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false); // When opening, always show maximized
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
    // Reset position to original bottom-right
    setPosition(initialPosition);
  };

  // Mouse down handler for dragging
  const handleMouseDown = (e) => {
    if (e.target.closest('.chat-controls')) return; // Don't drag when clicking controls
    
    const rect = chatboxRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  // Mouse move handler
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const chatboxWidth = 320; // w-80 = 320px
    const chatboxHeight = isMinimized ? 48 : 384; // h-12 = 48px, h-96 = 384px
    
    // Calculate new position based on mouse position and drag offset
    const newLeft = e.clientX - dragOffset.x;
    const newTop = e.clientY - dragOffset.y;
    
    // Convert to right/bottom positioning
    let newX = windowWidth - newLeft - chatboxWidth;
    let newY = windowHeight - newTop - chatboxHeight;
    
    // Constrain to window bounds
    newX = Math.max(24, Math.min(newX, windowWidth - chatboxWidth - 24));
    newY = Math.max(24, Math.min(newY, windowHeight - chatboxHeight - 24));
    
    setPosition({ x: newX, y: newY });
  };

  // Mouse up handler
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for mouse events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection while dragging
      document.body.style.cursor = 'grabbing'; // Show grabbing cursor globally
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, dragOffset]);

  return (
    <>
      {/* Floating Chat Icon */}
      <div 
        className={`fixed z-50 transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ 
          bottom: `${position.y}px`, 
          right: `${position.x}px` 
        }}
      >
        <button
          onClick={toggleChat}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatboxRef}
          className={`fixed z-50 transition-all duration-200 ${
            isMinimized ? 'h-12' : 'h-96'
          } w-80 bg-white rounded-lg shadow-2xl border overflow-hidden ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{ 
            bottom: `${position.y}px`, 
            right: `${position.x}px`,
            transition: isDragging ? 'none' : 'all 0.2s ease'
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} />
              <span className="font-medium">Health Assistant</span>
            </div>
            <div className="flex items-center space-x-2 chat-controls">
              {isMinimized ? (
                <button
                  onClick={maximizeChat}
                  className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
                  aria-label="Maximize chat"
                >
                  <Maximize2 size={16} />
                </button>
              ) : (
                <button
                  onClick={minimizeChat}
                  className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
                  aria-label="Minimize chat"
                >
                  <Minimize2 size={16} />
                </button>
              )}
              <button
                onClick={closeChat}
                className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="h-full">
              {chatbotUrl ? (
                <iframe
                  src={chatbotUrl}
                  className="w-full h-full border-0"
                  title="Health Assistant Chatbot"
                  allow="microphone; camera"
                  style={{ height: '340px' }}
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
                  <div className="text-center p-4">
                    <MessageCircle className="mx-auto mb-3 text-blue-400" size={48} />
                    <h4 className="font-semibold text-gray-700 mb-2">Health Assistant Chat</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      I'm here to help with your health questions!
                    </p>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-gray-500 mb-1">
                        To activate the chatbot:
                      </p>
                      <p className="text-xs text-blue-600">
                        Set VITE_APP_BOTPRESS_URL in your .env file
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

// Main Home Component
function Home() {
    const navigate = useNavigate(); // Add this line!

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="home min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Multiple Disease Prediction System
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Welcome to the Health Assistant. This application uses machine learning to predict various diseases based on medical data.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features grid md:grid-cols-3 gap-8 mb-16">
          <div className="feature-card bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Diabetes Prediction</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Predict diabetes risk based on medical indicators like glucose level, BMI, and other factors.
              </p>
            </div>
            <button 
              onClick={() => handleNavigate('/diabetes')}
              className="btn w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium transform hover:scale-105"
            >
              Check Now
            </button>
          </div>

          <div className="feature-card bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Heart Disease Prediction</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Assess heart disease risk using factors such as blood pressure, cholesterol, and ECG results.
              </p>
            </div>
            <button 
              onClick={() => handleNavigate('/heart')}
              className="btn w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium transform hover:scale-105"
            >
              Check Now
            </button>
          </div>

          <div className="feature-card bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-2xl font-semibold text-gray-800 mb-3">Kidney Disease Prediction</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
               Predict Kidney Disease Using Blood Pressure, Blood Sugar, Creatinine, and Urea Levels.
              </p>
            </div>
            <button 
              onClick={() => handleNavigate('/kidney')}
              className="btn w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium transform hover:scale-105"
            >
              Check Now
            </button>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <MessageCircle className="text-blue-600 mr-3" size={32} />
              <h3 className="text-2xl font-semibold text-gray-800">
                Need Help? Chat with our Assistant!
              </h3>
            </div>
            <p className="text-gray-600 text-lg">
              Click the chat icon in the bottom right corner to get instant help with our prediction tools.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}

export default Home;