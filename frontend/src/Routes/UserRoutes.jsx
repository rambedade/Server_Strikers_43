import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../components/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import VerifyEmail from "../components/VerifyEmail";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import ResetPasswordLink from "../components/ResetPasswordLink";
import ChangePassword from "../components/ChangePassword";
import User from "../dashboard/User";

function UserRoutes() {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <div>
      {!isProfilePage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password-link" element={<ResetPasswordLink />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<User />} />
      </Routes>
      {!isProfilePage && (
        <div className="footer-section">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default UserRoutes;
