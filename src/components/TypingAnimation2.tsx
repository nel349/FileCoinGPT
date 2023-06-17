import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const textArray = [...text.split(' '), ''];
  const delay = 1000;

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % textArray.length;
      const fullText = textArray[current];

      setDisplayText(isDeleting ? fullText.substring(0, displayText.length - 1) : fullText.substring(0, displayText.length + 1));
      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum((prevLoopNum) => prevLoopNum + 1);
      }
    };

    const typingTimer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [displayText, isDeleting, typingSpeed, loopNum, textArray, delay]);

  return <>{displayText}</>;
};

export default TypingAnimation;