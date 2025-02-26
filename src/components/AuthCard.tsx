import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full flex justify-center perspective">
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <LoginForm onFlip={handleFlip} />
        </div>
        <div className="flip-card-back">
          <SignupForm onFlip={handleFlip} />
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
