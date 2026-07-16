import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AddApplicationForm from "./forms/AddApplicationForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AddApplicationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;