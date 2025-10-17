
// import { useState, useEffect, useMemo } from 'react';
// import NavBar from './components/NavBar';
// import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// //import NewsList from './components/NewsList';
// import SportsPage from './components/SportsPage';
// import General from './pages/General';
// import HealthPage from './components/HealthPage';
// import BusinessNewsPage from './pages/BusinessNewsPage';
// import WeatherPage from './pages/WeatherPage';
// import TechnologyNewsPage from './pages/TechnologyNewsPage';
// import EntertainmentNewsPage from './pages/EntertainmentNewsPage';
// import SciNewsPage from './pages/SciNewsPage';


// function App() {
//   // ✅ Load theme mode from localStorage or default to light
//   const [mode, setMode] = useState(() => {
//     const savedMode = localStorage.getItem('themeMode');
//     return savedMode === 'dark' ? 'dark' : 'light';
//   });

//   // ✅ Save theme mode whenever it changes
//   useEffect(() => {
//     localStorage.setItem('themeMode', mode);
//   }, [mode]);

//   // ✅ Toggle between light and dark
//   const toggleTheme = () => {
//     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//   };

//   // ✅ Create theme based on mode
//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//           primary: {
//             main: mode === 'dark' ? '#90caf9' : '#1976d2',
//           },
//           secondary: {
//             main: mode === 'dark' ? '#f48fb1' : '#dc004e',
//           },
//           background: {
//             default: mode === 'dark' ? '#0c151f' : '#f5f9ff',
//             paper: mode === 'dark' ? '#a3a3a3ff' : '#CED46A',
//           },
//         },
//       }),
//     [mode]
//   );

//   // ✅ Search term state
//   const [searchTerm, setSearchTerm] = useState('');

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         {/* ✅ NavBar must be inside Router so it can use navigation */}
//         <NavBar
//           name="Malakand News"
//           toggleTheme={toggleTheme}
//           mode={mode}
//           onSearch={(term) => setSearchTerm(term)}
//         />

//         {/* ✅ Routes */}
//         <Routes>
//           <Route path="/home" element={<Home searchTerm={searchTerm} />} />
//           <Route path="/health" element={<HealthPage searchTerm={searchTerm} />} />
//           <Route path="/sports" element={<SportsPage searchTerm={searchTerm} />} />
//           <Route path="/general" element={<General  searchTerm={searchTerm} />} />
//           <Route path="/business" element={<BusinessNewsPage  searchTerm={searchTerm} />} />
//           <Route path="/weather" element={<WeatherPage  searchTerm={searchTerm} />} />
//           <Route path="/technology" element={<TechnologyNewsPage searchTerm={searchTerm} />} />
//           <Route path="/entertainment" element={<EntertainmentNewsPage searchTerm={searchTerm} />} />
//           <Route path="/science" element={< SciNewsPage searchTerm={searchTerm} />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;





import { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

// ✅ Pages
import Home from './pages/Home';
import SportsPage from './components/SportsPage';
import General from './pages/General';
import HealthPage from './components/HealthPage';
import BusinessNewsPage from './pages/BusinessNewsPage';
import WeatherPage from './pages/WeatherPage';
import TechnologyNewsPage from './pages/TechnologyNewsPage';
import EntertainmentNewsPage from './pages/EntertainmentNewsPage';
import SciNewsPage from './pages/SciNewsPage';
import Footer from './components/Footer'

function App() {
  // ✅ Load theme mode from localStorage or default to light
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode === 'dark' ? 'dark' : 'light';
  });

  // ✅ Save theme mode whenever it changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // ✅ Toggle between light and dark
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // ✅ Create theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',
          },
          secondary: {
            main: mode === 'dark' ? '#f48fb1' : '#dc004e',
          },
          background: {
            default: mode === 'dark' ? '#0c151f' : '#f5f9ff',
            paper: mode === 'dark' ? '#080808ff' : '#515241ff',
          },
        },
      }),
    [mode]
  );

  // ✅ Search term state
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* ✅ Navbar stays at the top */}
        <NavBar
          name="Malakand News"
          toggleTheme={toggleTheme}
          mode={mode}
          onSearch={(term) => setSearchTerm(term)}
        />

        {/* ✅ All pages wrapped in Layout */}
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/health" element={<HealthPage searchTerm={searchTerm} />} />
          <Route path="/sports" element={<SportsPage searchTerm={searchTerm} />} />
          <Route path="/general" element={<General searchTerm={searchTerm} />} />
          <Route path="/business" element={<BusinessNewsPage searchTerm={searchTerm} />} />
          <Route path="/weather" element={<WeatherPage searchTerm={searchTerm} />} />
          <Route path="/technology" element={<TechnologyNewsPage searchTerm={searchTerm} />} />
          <Route path="/entertainment" element={<EntertainmentNewsPage searchTerm={searchTerm} />} />
          <Route path="/science" element={<SciNewsPage searchTerm={searchTerm} />} />
        </Routes>

           <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
