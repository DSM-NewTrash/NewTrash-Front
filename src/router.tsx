import { Route, Routes, BrowserRouter } from "react-router-dom";
import FirstCreatePage from "./pages/createQuestion/first";
import MainPage from "./pages/main";
import NewListPage from "./pages/newList";
import PopularListPage from "./pages/popularList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/popular" element={<PopularListPage />} />
        <Route path="/new" element={<NewListPage />} />
      </Routes>
      <Routes>
        <Route path="/first-create" element={<FirstCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
