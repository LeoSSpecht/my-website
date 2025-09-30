import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main_page/index";
import Food from "./pages/food/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/food" element={<Food />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
