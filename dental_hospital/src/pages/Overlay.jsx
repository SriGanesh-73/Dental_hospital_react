import React, { useCallback } from 'react';
import '../styles/index.css'; // Make sure to import your CSS

const Overlay = React.forwardRef(({ onClick }, ref) => {
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    onClick();
  }, [onClick]);

  return (
    <div 
      className="overlay" 
      ref={ref}
      onClick={handleClick}
      style={{ display: 'none' }}
    />
  );
});

export default Overlay;