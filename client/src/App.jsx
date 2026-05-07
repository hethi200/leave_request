import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentPage from "./pages/StudentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentPage />} />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;