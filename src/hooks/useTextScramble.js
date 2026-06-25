import { useState, useEffect } from 'react';

const CHARS = '01!@#$%&';

export function useTextScramble(text, duration = 600, trigger = true) {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    let frameId;
    let startTime;
    setIsScrambling(true);

    const scramble = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Scramble logic: reveal characters gradually from left to right
      let currentText = '';
      for (let i = 0; i < text.length; i++) {
        // Character reveal point (0 to 1) based on index
        const revealPoint = i / text.length;
        
        // If progress is past this character's reveal point + a small buffer, show actual char
        // The buffer ensures the scramble effect happens for a bit before locking
        if (text[i] === ' ') {
          currentText += ' ';
        } else if (progress > revealPoint + 0.1 || progress === 1) {
          currentText += text[i];
        } else {
          currentText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(currentText);

      if (progress < 1) {
        frameId = requestAnimationFrame(scramble);
      } else {
        setIsScrambling(false);
      }
    };

    frameId = requestAnimationFrame(scramble);

    return () => cancelAnimationFrame(frameId);
  }, [text, duration, trigger]);

  return { displayText, isScrambling };
}
