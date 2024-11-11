import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navirouter from "./Navirouter";
import MenuResultPage from "./pages/MenuResultPage";
import LoginPage from "./pages/user/LoginPage";
import FindIDPWDPage from "./pages/user/FindIDPWDPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FindIDPWDPage />
      </BrowserRouter>
    </div>
  );
}

export default App;
