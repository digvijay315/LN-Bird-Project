import React, { useState } from 'react';
import '../css/demo.css' // Import your CSS styles

const Demo = () => {
  const [progress, setProgress] = useState(0);

  const handleMouseMove = (e) => {
    const progressBar = e.target.getBoundingClientRect();
    const newProgress = ((e.clientX - progressBar.left) / progressBar.width) * 100;
    setProgress(Math.max(0, Math.min(newProgress, 100))); // Clamp between 0 and 100
  };

  const handleMouseDown = (e) => {
    handleMouseMove(e); // Set initial progress
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="progress-container" onMouseDown={handleMouseDown}>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className="progress-percentage">{Math.round(progress)}%</div>
    </div>
  );
};

export default Demo;
