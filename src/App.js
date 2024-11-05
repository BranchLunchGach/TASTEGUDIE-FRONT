import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MenuRecommendPage from './MenuRecommendPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MenuRecommendPage />
      </BrowserRouter>
    </div>
  );
}

export default App;
