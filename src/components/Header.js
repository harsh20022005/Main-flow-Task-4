import React from 'react';

const Header = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1>To-Do List</h1>
      <div className="dark-mode-toggle">
        <label>Dark Mode</label>
        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
      </div>
    </header>
  );
};

export default Header;
