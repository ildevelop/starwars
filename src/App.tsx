import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Search from './pages/Search';
import Category from './pages/Category';
import NotFound from './pages/NotFound';
import ResponsiveAppBar from './components/AppBar';
import { useEffect } from 'react';

function App() {
  return (
    <>
      <Router>
        <StarWarsRedirect />
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/categories/:category" element={<Category />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

const StarWarsRedirect = () => {
  // this is for GitHub pages
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/starwars/') {
      navigate('/');
    }
  }, [location, navigate]);

  return null;
};
