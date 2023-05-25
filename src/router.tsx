import { Route, Routes, BrowserRouter } from "react-router-dom";
import FirstCreatePage from "./pages/createQuestion/FirstCreate";
import MainPage from "./pages/main";
import NewListPage from "./pages/newList";
import PopularListPage from "./pages/popularList";
import CreatePage from "./pages/createQuestion/CreateQuestionPage";
import EnvReportPage from "./pages/report/EnvReportPage";
import SignUpPage from "./pages/signup/SignPage";
import LoginPage from "./pages/login/LoginPage";
import MarketPage from "./pages/market/MarketPage";
import MyPagePage from "./pages/mypage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/env-report" element={<EnvReportPage />} />
        <Route path="/popular" element={<PopularListPage />} />
        <Route path="/new" element={<NewListPage />} />
      </Routes>
      <Routes>
        <Route path="/first-create" element={<FirstCreatePage />} />
        <Route path="/question-create" element={<CreatePage />} />
      </Routes>
      <Routes>
        <Route path="/market" element={<MarketPage />} />
        <Route path="/mypage" element={<MyPagePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
