import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginCliente } from "./Telas/Login/LoginCliente";
import { AdminLogin } from "./Telas/Login/AdmLogin/AdminLogin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginCliente />} />

        <Route path="/login/admin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
