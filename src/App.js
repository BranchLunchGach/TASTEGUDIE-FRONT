import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navirouter from "./Navirouter";
import ResRecommResultPage from "./pages/restaurent/ResRecommResultPage";
import ResDetailPage from "./pages/restaurent/ResDetailPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navirouter /> */}
        <ResDetailPage />
        {/* <MainPage /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
