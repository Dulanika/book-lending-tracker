import { useState } from 'react';
import LoginForm from '../features/auth/LoginForm';
import RegisterForm from '../features/auth/RegisterForm';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    console.log('Logging in with:', formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('Login successful!');
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    console.log('Registering user:', formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('Registration successful!');
    setIsLogin(true); // Switch to login form after registration
  }; 

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Log In' : 'Create an Account'}
        </h2>

        {isLogin ? (
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        ) : (
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
        )}

        <div className="mt-6 text-center">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={toggleForm}
                className="text-purple-600 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={toggleForm}
                className="text-purple-600 font-semibold hover:underline"
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
