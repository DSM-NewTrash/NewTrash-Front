import { Route, Routes, BrowserRouter } from "react-router-dom";
import FirstCreatePage from "./pages/createQuestion/FirstCreate";
import MainPage from "./pages/main";
import NewListPage from "./pages/newList";
import PopularListPage from "./pages/popularList";
import CreatePage from "./pages/createQuestion/CreateQuestionPage";
import EnvReportPage from "./pages/report/EnvReportPage";
import SignUpPage from "./pages/signup/SignPage";
import LoginPage from "./pages/login/LoginPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/env-report" element={<EnvReportPage />} />
        <Route path="/popular" element={<PopularListPage />} />
        <Route path="/new" element={<NewListPage />} />
      </Routes>
      <Routes>
        <Route path="/first-create" element={<FirstCreatePage />} />
        <Route path="/question-create" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
