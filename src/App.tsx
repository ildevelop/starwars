import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './pages/Search';
import Category from './pages/Category';
import NotFound from './pages/NotFound';
import ResponsiveAppBar from './components/AppBar';

function App() {
  return (
    <>
      <Router>
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
