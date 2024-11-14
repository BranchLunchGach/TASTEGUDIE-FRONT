import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navirouter from "./Navirouter";
import ResRecommResultPage from "./pages/restaurent/ResRecommResultPage";
import ResDetailPage from "./pages/restaurent/ResDetailPage";
import MainPage from "./pages/MainPage";
import SelectPage from "./pages/ChoiceListPage";
import ChoiceListPage from "./pages/ChoiceListPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Navirouter /> 
        {/* <ResDetailPage /> */}
        {/* <MainPage /> */}
        {/* <ChoiceListPage /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
