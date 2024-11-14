import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navirouter from "./Navirouter";

import { HelloProvider } from "./context/HelloContext";
import ResRecommResultPage from "./pages/restaurent/ResRecommResultPage";
import ResDetailPage from "./pages/restaurent/ResDetailPage";
import MainPage from "./pages/MainPage";
import SelectPage from "./pages/ChoiceListPage";
import ChoiceListPage from "./pages/ChoiceListPage";


function App() {
  return (
    <div className="App">
      <HelloProvider>
        <BrowserRouter>
          <Navirouter />
        </BrowserRouter>
      </HelloProvider>
    </div>
  );
}

export default App;
