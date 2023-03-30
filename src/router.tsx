import { Route, Routes, BrowserRouter } from "react-router-dom";
import FirstCreatePage from "./pages/createQuestion/first";
import MainPage from "./pages/main";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />} />
      </Routes>
      <Routes>
        <Route path="/first-create" element={<FirstCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
