import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navirouter from "./Navirouter";

import { HelloProvider } from "./context/HelloContext";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navirouter /> 
        <ResDetailPage />
        <MainPage />
        <ChoiceListPage />
      </BrowserRouter>
    </div>
  );
}

export default App;
