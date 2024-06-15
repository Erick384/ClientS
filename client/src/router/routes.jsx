import React, { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../components/login";
import Signup from "../components/signup";
import Home from "../components/home";
const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const routes = createRoutesFromElements(
    <Route path="/">
      <Route path="login" element={<Login setAuth={setIsAuthenticated} />} />
      <Route path="signup" element={<Signup setAuth={setIsAuthenticated} />} />
      <Route
        path="home"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Route>
  );

  return createBrowserRouter(routes);
};

export default Router;
