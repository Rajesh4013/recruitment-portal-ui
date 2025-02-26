import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SignupFormProps {
  onFlip: () => void;
}

const SignupForm = ({ onFlip }: SignupFormProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswords()) {
      // Handle signup logic here
    }
  };

  return (
    <div className="glass w-full p-6 rounded-2xl shadow-xl">
      <div className="space-y-6">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-sm text-gray-600 mt-1">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="input-animation w-full h-9 placeholder:text-gray-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input-animation w-full h-9 placeholder:text-gray-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Choose a password"
                className="input-animation w-full h-9 placeholder:text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="input-animation w-full h-9 placeholder:text-gray-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {passwordError && (
            <p className="text-xs text-red-500 mt-1">{passwordError}</p>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="role">
              Role
            </label>
            <Select>
              <SelectTrigger className="w-full input-animation h-9 bg-white/50">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-xl border border-white/30">
                <SelectItem value="hr" className="hover:bg-blue-50">HR</SelectItem>
                <SelectItem value="vp" className="hover:bg-blue-50">VP</SelectItem>
                <SelectItem value="pm" className="hover:bg-blue-50">Project Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full h-9 button-animation text-sm mt-2" type="submit">
            Sign up
          </Button>
        </form>

        <div className="text-center mt-2">
          <button
            onClick={onFlip}
            className="text-sm text-primary hover:underline transition-all"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
