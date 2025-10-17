


// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import { useState } from 'react';
// import { useTheme } from '@mui/material/styles';
// import { useNavigate, useLocation, Link } from 'react-router-dom';

// import Brightness2TwoToneIcon from '@mui/icons-material/Brightness2TwoTone';
// import { BsSun } from 'react-icons/bs';

// import { FaHeartbeat, FaFootballBall, FaBriefcase, FaNewspaper, FaFilm, FaFlask, FaLaptopCode } from 'react-icons/fa';
// import { WiDayCloudy } from 'react-icons/wi';

// export default function NavBar({ name, toggleTheme, mode, onSearch }) {
//   const theme = useTheme();
//   const [text, setText] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (typeof onSearch === 'function') {
//       onSearch(text);
//     }
//     if (location.pathname !== '/') {
//       navigate('/');
//     }
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setText(value);
//     if (typeof onSearch === 'function') {
//       onSearch(value);
//     }
//   };

//   const categories = [
//     { name: 'Health', icon: <FaHeartbeat /> },
//     { name: 'Sports', icon: <FaFootballBall /> },
//     { name: 'Business', icon: <FaBriefcase /> },
//     { name: 'General', icon: <FaNewspaper /> },
//     { name: 'Weather', icon: <WiDayCloudy /> },
//     { name: 'Entertainment', icon: <FaFilm /> },
//     { name: 'Science', icon: <FaFlask /> },
//     { name: 'Technology', icon: <FaLaptopCode /> },
//   ];

//   return (
//     <nav
//       className="navbar navbar-expand-lg"
//       style={{
//         backgroundColor: theme.palette.background.paper,
//         color: theme.palette.text.primary,
//         transition: 'background-color 0.3s ease',
//       }}
//     >
//       <div className="container-fluid">
//         {/* Mobile Toggle */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarTogglerDemo01"
//           aria-controls="navbarTogglerDemo01"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Items */}
//         <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//           {/* Site Title */}
//           <h1 className="me-4">{name}</h1>

//           {/* Navigation Links */}
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ gap: '10px' }}>
//             {/* Home Link */}
//             <li className="nav-item">
//               <Link
//                 to="/"
//                 style={{
//                   color: theme.palette.text.primary,
//                   fontWeight: 'bolder',
//                   textDecoration: 'none',
//                   paddingLeft: '20px',
//                   paddingTop: '5px',
//                   display: 'block',
//                 }}
//               >
//                 <h5>Home</h5>
//               </Link>
//             </li>

//             {/* Category Links */}
//             {categories.map(({ name, icon }) => {
//               const path = `/${name.toLowerCase()}`;
//               const isActive = location.pathname === path;
//               return (
//                 <li className="nav-item" key={name}>
//                   <Link
//                     to={path}
//                     style={{
//                       color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
//                       fontWeight: isActive ? 'bold' : 'normal',
//                       textDecoration: 'none',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '5px',
//                       padding: '5px 10px',
//                       borderRadius: '5px',
//                       backgroundColor: isActive ? theme.palette.action.hover : 'transparent',
//                     }}
//                   >
//                     {icon} {name}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>

//           {/* Search Box */}
//           <form className="d-flex" role="search" onSubmit={handleSubmit}>
//             <input
//               className="form-control me-2"
//               type="text"
//               placeholder="Search here..."
//               value={text}
//               onChange={handleChange}
//             />
//             <button className="btn btn-outline-success" type="submit">
//               Search
//             </button>
//           </form>
//         </div>

//         {/* Theme Toggle */}
//         <div className="form-check form-switch ms-3">
//           <input
//             className="form-check-input"
//             type="checkbox"
//             onChange={toggleTheme}
//             checked={mode === 'dark'}
//           />
//           <label className="form-check-label">
//             {mode === 'dark' ? <Brightness2TwoToneIcon /> : <BsSun />}
//           </label>
//         </div>
//       </div>
//     </nav>
//   );
// }














import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { IconButton, Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { FaHeartbeat, FaFootballBall, FaBriefcase, FaNewspaper, FaFilm, FaFlask, FaLaptopCode } from 'react-icons/fa';
import { WiDayCloudy } from 'react-icons/wi';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';

export default function NavBar({ name, toggleTheme, mode, onSearch }) {
  const theme = useTheme();
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSearch === 'function') onSearch(text);
    if (location.pathname !== '/') navigate('/');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (typeof onSearch === 'function') onSearch(value);
  };

  const categories = [
    { name: 'Health', icon: <FaHeartbeat /> },
    { name: 'Sports', icon: <FaFootballBall /> },
    { name: 'Business', icon: <FaBriefcase /> },
    { name: 'General', icon: <FaNewspaper /> },
    { name: 'Weather', icon: <WiDayCloudy /> },
    { name: 'Entertainment', icon: <FaFilm /> },
    { name: 'Science', icon: <FaFlask /> },
    { name: 'Technology', icon: <FaLaptopCode /> },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: mode === 'light'
          ? 'linear-gradient(90deg, #0288d1, #26c6da)'
          : 'linear-gradient(90deg, #121212, #1e1e1e)',
        fontFamily: "'Montserrat', sans-serif",
        color: '#fff',
        transition: 'all 0.4s ease',
        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
      }}
    >
      <div className="container-fluid">
        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* Site Title */}
          <h1 className="me-4" style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff' }}>
            {name}
          </h1>

          {/* Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ gap: '10px' }}>
            <li className="nav-item">
              <Link
                to="/"
                style={{
                  color: '#fff',
                  fontWeight: '700',
                  textDecoration: 'none',
                  padding: '5px 15px',
                  borderRadius: '5px',
                  transition: '0.3s',
                  backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.2)' : 'transparent',
                }}
              >
                Home
              </Link>
            </li>

            {categories.map(({ name, icon }) => {
              const path = `/${name.toLowerCase()}`;
              const isActive = location.pathname === path;
              return (
                <li className="nav-item" key={name}>
                  <Link
                    to={path}
                    style={{
                      color: '#fff',
                      fontWeight: isActive ? '700' : '500',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 12px',
                      borderRadius: '5px',
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {icon} {name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Search Box */}
          <form className="d-flex me-3" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search..."
              value={text}
              onChange={handleChange}
              style={{ borderRadius: '8px' }}
            />
            <button
              className={`btn ${mode === 'light' ? 'btn-light text-dark' : 'btn-dark text-light'}`}
              type="submit"
              style={{ borderRadius: '8px' }}
            >
              Search
            </button>
          </form>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: '#fff',
              marginRight: '15px',
              transition: '0.3s',
            }}
          >
            {mode === 'light' ? <BsMoonStarsFill size={22} /> : <BsSunFill size={22} />}
          </IconButton>

          {/* Avatar Login/Register */}
          <Tooltip title="Login / Register">
            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: mode === 'light' ? '#fff' : '#1976d2', color: mode === 'light' ? '#1976d2' : '#fff' }}>U</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleClose}>Login</MenuItem>
            <MenuItem onClick={handleClose}>Register</MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
