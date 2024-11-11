import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import MenuRecommendPage from './pages/MenuRecommendPage';
import MenuResultPage from './pages/MenuResultPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/user/LoginPage';
import JoinPage from './pages/user/JoinPage';
import Navirouter from './Navirouter';
import MenuOption from './components/menu/MenuOption';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navirouter />
      </BrowserRouter> 
    </div>
  );
}

export default App;
