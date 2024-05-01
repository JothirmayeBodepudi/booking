// ThemeToggle.js

import React, { useState } from 'react';
import './ThemeToggle.css'; // Import CSS file for styling
// import './components/ThemeToggle/DarkTheme.css'; // Import dark theme CSS file
// import './components/ThemeToggle/LightTheme.css';

const ToggleTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="theme-toggle">
      <label className="switch">
        <input type="checkbox" onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <span className="toggle-label">{isDarkMode ? 'Dark Mode' : 'Bright Mode'}</span>
    </div>
  );
};

export default ToggleTheme;
