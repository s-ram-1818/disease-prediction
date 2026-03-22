import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../services/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 👁️ Eye icons

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userverificationcode: ''
  });

  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async () => {
    setError('');
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;
    const a=formData.name.length;
    console.log(a);
    
    if ( a<4) {
      setError('Please enter name greater than 3 letter');
      return;
    }
    if (!formData.email  || !emailRegex.test(formData.email)) {
      setError('Please enter your email first or Invalid email');
      return;
    }
    if (!formData.password  || !passwordRegex.test(formData.password)) {
      setError('Please enter your password first or Password must contain uppercase, lowercase, number, and special char');
      return;
    }
   

    try {
      const res = await authService.sendCode({ email: formData.email });
      setGeneratedCode(res.verificationCode);
      setCodeSent(true);
      setSuccess('Verification code sent to your email.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send verification code');
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.userverificationcode) {
      setError('Please enter the verification code sent to your email.');
      return;
    }

    if (formData.userverificationcode !== generatedCode) {
      setError('Invalid verification code');
      return;
    }

    try {
      const res = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setSuccess('Registration successful!');
      setFormData({
        name: '',
        email: '',
        password: '',
        userverificationcode: ''
      });
      setGeneratedCode('');
      setCodeSent(false);

      // navigate('/login'); // Optional
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 👁️ Password field with toggle */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Strong Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500 "
          >
            {showPassword ? <FaEye className='size-6'/> : <FaEyeSlash className='size-6'/>}
          </span>
        </div>

        <button
          type="button"
          onClick={handleSendCode}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Send Verification Code
        </button>

        {codeSent && (
          <input
            type="text"
            placeholder="Enter Verification Code"
            value={formData.userverificationcode}
            onChange={(e) =>
              setFormData({ ...formData, userverificationcode: e.target.value })
            }
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Register
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center font-medium">{success}</p>
        )}
      </form>
    </div>
  );
}

export default Signup;
