import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";
import ProtectedAuthRoute from "./protectedAuthRoutes";
import Loader from "../components/Loader/Loader";

const Signup = lazy(() => import("../screens/Signup/Signup"));
const Login = lazy(() => import("../screens/Login/Login"));
const ResetPassword = lazy(() =>
  import("../screens/Auth/ResetPassword/ResetPassword")
);
const ForgetPassword = lazy(() =>
  import("../screens/Auth/ForgetPassword/ForgetPassword")
);
const AdminApproval = lazy(() =>
  import("../screens/Auth/AdminApproval/AdminApproval")
);
const Dashboard = lazy(() => import("../screens/Dashboard/Main"));

export default function AppRoutes() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route
          exact
          path="/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* <Route exact path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/signup/:admin_Id" element={<Signup />} /> */}
        <Route
          exact
          path="/login"
          element={
            <ProtectedAuthRoute>
              <Login />
            </ProtectedAuthRoute>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <ProtectedAuthRoute>
              <Signup />
            </ProtectedAuthRoute>
          }
        />
        <Route
          exact
          path="/signup/:admin_Id"
          element={
            <ProtectedAuthRoute>
              <Signup />
            </ProtectedAuthRoute>
          }
        />
        <Route
          exact
          path="/resetPassword/:id"
          element={
            <ProtectedAuthRoute>
              <ResetPassword />
            </ProtectedAuthRoute>
          }
        />
        <Route
          exact
          path="/forgetPassword"
          element={
            <ProtectedAuthRoute>
              <ForgetPassword />
            </ProtectedAuthRoute>
          }
        />
        <Route
          exact
          path="/admin_approval/:id"
          element={
            <ProtectedAuthRoute>
              <AdminApproval />
            </ProtectedAuthRoute>
          }
        />
      </Routes>
    </React.Suspense>
  );
}
