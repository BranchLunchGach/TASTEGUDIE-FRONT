import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navirouter from "./Navirouter";

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
