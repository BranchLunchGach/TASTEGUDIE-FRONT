import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navirouter from "./Navirouter";
import { HelloProvider } from "./context/HelloContext";
import RegisterForm from "./components/user/RegisterForm";

function App() {
  return (
    <div className="App">
      <HelloProvider>
        <BrowserRouter>
          <Navirouter />
          <RegisterForm />
        </BrowserRouter>
      </HelloProvider>
    </div>
  );
}

export default App;
