import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import MenuRecommendPage from './pages/MenuRecommendPage';
import MenuResultPage from './pages/MenuResultPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          {/* <Route path='login/:id' element={<Login />} /> */}
          <Route path='menu' element={<MenuRecommendPage />} />
          <Route path='/menu-result' element={<MenuResultPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
