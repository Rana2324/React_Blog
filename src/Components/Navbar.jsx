import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
    // Initialize theme state with value from localStorage or default to 'light'
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    // Apply theme when component mounts or theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleThemeChange = (e) => {
        if (e.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    return (
       <div className="navbar bg-base-100 shadow-sm">
  <Link to='/' className="flex-1 text-xl text-secondary">Byte <span className='text-primary'>Blaze</span></Link>
  <div className="flex-none">
    <ul className='menu menu-horizontal px-1 gap-3 font-bold'>
      <NavLink to='/'className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
        }>Home
      </NavLink>
      <NavLink to='/blog'className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
        }>Blog
      </NavLink>
      <NavLink to='/bookmark'className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
        }>Bookmark
      </NavLink>
    
    </ul>
    <label className="toggle text-base-content">
        <input 
          type="checkbox" 
          onChange={handleThemeChange}  
          className="theme-controller" 
          checked={theme === 'dark'}
        />

        <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

        <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

    </label>
  </div>
</div>
    );
};

export default Navbar;