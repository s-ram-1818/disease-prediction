import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Shield, FileText, HelpCircle, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Footer({ isLoggedIn }) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Heart className="h-6 w-6 text-pink-300" />
              </div>
              <h3 className="text-2xl font-bold">
                Health<span className="text-pink-300"> AI</span>
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering your health journey with AI-powered predictions and personalized wellness recommendations.
            </p>
            <div className="flex space-x-3">
              <SocialLink href="#" icon={<Facebook className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Twitter className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Instagram className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Linkedin className="h-4 w-4" />} />
            </div>
          </div>

          {/* Health Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Health Services</h4>
            <ul className="space-y-2">
              {isLoggedIn ? (
                <>
                  <FooterLink to="/diabetes">Diabetes Prediction</FooterLink>
                  <FooterLink to="/heart">Heart Disease Detection</FooterLink>
                  <FooterLink to="/kidney">Kidney's Assessment</FooterLink>
                  <FooterLink to="/yoga">Yoga & Wellness</FooterLink>
                  <FooterLink to="/diet">Nutrition Planning</FooterLink>
                  <FooterLink to="/dashboard">Health Dashboard</FooterLink>
                </>
              ) : (
                <>
                  <li className="text-gray-400 text-sm">Login to access health services</li>
                  <FooterLink to="/login">Login</FooterLink>
                  <FooterLink to="/signup">Sign Up</FooterLink>
                </>
              )}
            </ul>
          </div>

          {/* Support & Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              <FooterLink onClick={() => alert('Help Center - Coming Soon!')} icon={<HelpCircle className="h-4 w-4" />}>
                Help Center
              </FooterLink>
              <FooterLink onClick={() => alert('About Us - Coming Soon!')} icon={<Users className="h-4 w-4" />}>
                About Us
              </FooterLink>
              <FooterLink onClick={() => alert('Privacy Policy - Coming Soon!')} icon={<Shield className="h-4 w-4" />}>
                Privacy Policy
              </FooterLink>
              <FooterLink onClick={() => alert('Terms of Service - Coming Soon!')} icon={<FileText className="h-4 w-4" />}>
                Terms of Service
              </FooterLink>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <ContactInfo 
                icon={<Mail className="h-4 w-4" />}
                text="support@healthai.com"
              />
              <ContactInfo 
                icon={<Phone className="h-4 w-4" />}
                text="+1 (555) 123-4567"
              />
              <ContactInfo 
                icon={<MapPin className="h-4 w-4" />}
                text="123 Health Street, Wellness City, WC 12345"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Health AI. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with ❤️ for better health</span>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-400" />
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Health Disclaimer */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            <strong>Medical Disclaimer:</strong> Health AI provides AI-powered health insights for informational purposes only. 
            Our predictions and recommendations are not a substitute for professional medical advice, diagnosis, or treatment. 
            Always consult with qualified healthcare providers for medical concerns.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Social Media Link Component
function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all duration-200 hover:scale-110 border border-white/20 hover:border-white/40"
    >
      {icon}
    </a>
  );
}

// Footer Link Component
function FooterLink({ to, onClick, children, icon }) {
  if (onClick) {
    return (
      <li>
        <button
          onClick={onClick}
          className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 hover:translate-x-1 transform text-left"
        >
          {icon}
          <span>{children}</span>
        </button>
      </li>
    );
  }

  return (
    <li>
      <Link
        to={to}
        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 hover:translate-x-1 transform"
      >
        {icon}
        <span>{children}</span>
      </Link>
    </li>
  );
}

// Contact Information Component
function ContactInfo({ icon, text }) {
  return (
    <div className="flex items-center space-x-2 text-gray-300">
      <div className="bg-white/10 p-1 rounded">
        {icon}
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
}

export default Footer;