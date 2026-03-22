import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Heart, Activity, Brain, BarChart3, Home, Dumbbell, Apple ,Bean } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Navbar({ isLoggedIn, setIsLoggedIn, user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  // Update active link based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveLink('home');
    else if (path === '/diabetes') setActiveLink('diabetes');
    else if (path === '/heart') setActiveLink('heart');
    // else if (path === '/parkinsons') setActiveLink('parkinsons');
    else if (path === '/kidney') setActiveLink('kidney');
    else if (path === '/yoga') setActiveLink('yoga');
    else if (path === '/diet') setActiveLink('diet');
    else if (path === '/dashboard') setActiveLink('dashboard');
  }, [location]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    setIsLoggedIn(false);
    setUser(null);
    setActiveLink('home');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (linkName, path = '/') => {
    setActiveLink(linkName);
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('home', '/')}
              className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Health<span className="text-pink-200"> AI</span>
              </h1>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {!isLoggedIn ? (
                // Show only authentication options when not logged in
                <>
                  <button
                    onClick={handleLogin}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 border border-white/20"
                  >
                    Login
                  </button>
                  <Link
                    to="/signup"
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                // Show full navigation when logged in
                <>
                  <NavLink
                    onClick={() => handleNavClick('home', '/')}
                    icon={<Home className="h-4 w-4" />}
                    active={activeLink === 'home'}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    onClick={() => handleNavClick('diabetes', '/diabetes')}
                    icon={<Activity className="h-4 w-4" />}
                    active={activeLink === 'diabetes'}
                  >
                    Diabetes
                  </NavLink>
                  <NavLink
                    onClick={() => handleNavClick('heart', '/heart')}
                    icon={<Heart className="h-4 w-4" />}
                    active={activeLink === 'heart'}
                  >
                    Heart Disease
                  </NavLink>
                  {/* <NavLink
                    onClick={() => handleNavClick('parkinsons', '/parkinsons')}
                    icon={<Brain className="h-4 w-4" />}
                    active={activeLink === 'parkinsons'}
                  >
                    Parkinsons
                  </NavLink> */}
                  <NavLink
                    onClick={() => handleNavClick('kidney', '/kidney')}
                    icon={<Bean className="h-4 w-4" />}
                    active={activeLink === 'kidney'}
                  >
                    Kidney
                  </NavLink>
                  <NavLink
                    onClick={() => handleNavClick('yoga', '/yoga')}
                    icon={<Dumbbell className="h-4 w-4" />}
                    active={activeLink === 'yoga'}
                  >
                    Yoga
                  </NavLink>
                  <NavLink
                    onClick={() => handleNavClick('diet', '/diet')}
                    icon={<Apple className="h-4 w-4" />}
                    active={activeLink === 'diet'}
                  >
                    Diet
                  </NavLink>
                  <NavLink
                    onClick={() => handleNavClick('dashboard', '/dashboard')}
                    icon={<BarChart3 className="h-4 w-4" />}
                    active={activeLink === 'dashboard'}
                  >
                    Dashboard
                  </NavLink>

                  {/* User Menu */}
                  <div className="relative ml-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-white text-sm font-medium hidden lg:block">
                        {user?.name || user?.email || 'User'}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500/80 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-1 shadow-lg"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 inline-flex items-center justify-center p-2 rounded-md text-white transition-all duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="bg-black/20 backdrop-blur-lg border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {!isLoggedIn ? (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleLogin();
                      setIsOpen(false);
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200"
                  >
                    Login
                  </button>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="bg-pink-500 hover:bg-pink-600 text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 w-full text-left"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  <MobileNavLink
                    onClick={() => handleNavClick('home', '/')}
                    icon={<Home className="h-4 w-4" />}
                    active={activeLink === 'home'}
                  >
                    Home
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => handleNavClick('diabetes', '/diabetes')}
                    icon={<Activity className="h-4 w-4" />}
                    active={activeLink === 'diabetes'}
                  >
                    Diabetes Prediction
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => handleNavClick('heart', '/heart')}
                    icon={<Heart className="h-4 w-4" />}
                    active={activeLink === 'heart'}
                  >
                    Heart Disease Prediction
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => handleNavClick('parkinsons', '/parkinsons')}
                    icon={<Brain className="h-4 w-4" />}
                    active={activeLink === 'parkinsons'}
                  >
                    Parkinsons Prediction
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => handleNavClick('yoga', '/yoga')}
                    icon={<Dumbbell className="h-4 w-4" />}
                    active={activeLink === 'yoga'}
                  >
                    Yoga
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => handleNavClick('diet', '/diet')}
                    icon={<Apple className="h-4 w-4" />}
                    active={activeLink === 'diet'}
                  >
                    Diet
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => handleNavClick('dashboard', '/dashboard')}
                    icon={<BarChart3 className="h-4 w-4" />}
                    active={activeLink === 'dashboard'}
                  >
                    Dashboard
                  </MobileNavLink>

                  <div className="border-t border-white/10 pt-2 mt-2">
                    <div className="flex items-center space-x-2 px-3 py-2 text-white">
                      <User className="h-4 w-4" />
                      <span className="text-sm">{user?.name || user?.email || 'User'}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="bg-red-500/80 hover:bg-red-600 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 flex items-center space-x-2 mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Desktop Navigation Link Component
function NavLink({ onClick, children, icon, active }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-1 border ${active
          ? 'bg-white/20 text-white border-white/30 shadow-lg'
          : 'text-white hover:bg-white/10 backdrop-blur-sm border-transparent hover:border-white/20'
        }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ onClick, children, icon, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center space-x-2 ${active
          ? 'bg-white/20 text-white border-l-4 border-pink-400'
          : 'text-white hover:bg-white/20'
        }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

export default Navbar;