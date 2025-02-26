import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface LoginFormProps {
  onFlip: () => void;
}

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    employee: {
      EmployeeID: number;
      FirstName: string;
      LastName: string;
      Email: string;
      Role: string | null;
    }
  };
  message: string;
}

const LoginForm = ({ onFlip }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json() as LoginResponse;

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.message || 'Login failed');
      }

      const userData = {
        firstName: responseData.data.employee.FirstName,
        lastName: responseData.data.employee.LastName,
        email: responseData.data.employee.Email,
        role: responseData.data.employee.Role || 'user'
      };

      await login(responseData.data.token, userData);
      
      navigate('/home');
      
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass w-full p-6 rounded-2xl shadow-xl">
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-600 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-animation w-full h-9 placeholder:text-gray-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-animation w-full h-9 placeholder:text-gray-500"
              required
            />
          </div>

          <Button 
            className="w-full h-9 button-animation text-sm mt-2" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={onFlip}
            className="text-sm text-primary hover:underline transition-all"
          >
            New user? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
