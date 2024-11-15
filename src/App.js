import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navirouter from "./Navirouter";
import ChoiceListPage from "./pages/ChoiceListPage";
import MenuRecommendOption from "./components/menu/MenuRecommendOption";
import MainPage from "./pages/MainPage";
import MenuResultPage from "./pages/MenuResultPageCopy";
import MenuResultPageCopy from "./pages/MenuResultPageCopy";
import FindIDPWDForm from "./components/user/FindIDPWDForm";
import LoginForm from "./components/user/LoginForm";
import RegisterForm from "./components/user/RegisterForm";
import JoinPage from "./pages/user/JoinPage";
import MyPage from "./pages/user/MyPage";
import MenuRecommendPage from "./pages/MenuRecommendPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navirouter /> */}
        {/* <ResDetailPage /> */}
        {/* <MainPage /> */}
        {/* <ChoiceListPage /> */}
        {/* <MenuRecommendPage /> */}
        <MenuRecommendPage />
      </BrowserRouter>
    </div>
  );
}

export default App;
