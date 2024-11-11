import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navirouter from "./Navirouter";
import MenuResultPage from "./pages/MenuResultPage";
import LoginPage from "./pages/user/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </div>
  );
}

export default App;
