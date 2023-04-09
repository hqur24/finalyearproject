import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Layout from "./hocs/Layout.js";
import PrivateRouter from "./hocs/PrivateRouter.js";
import Assignments from "./pages/Assignments.js";
import Exams from "./pages/Exams";
import Moods from "./pages/Moods";
import Applications from "./pages/Applications";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

import store from "./Store";

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <PrivateRouter>
                <Dashboard />
              </PrivateRouter>
            }
          />
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            path="/assignments"
            element={
              <PrivateRouter>
                <Assignments />
              </PrivateRouter>
            }
          />
          <Route
            path="/exams"
            element={
              <PrivateRouter>
                <Exams />
              </PrivateRouter>
            }
          />
          <Route
            path="/applications"
            element={
              <PrivateRouter>
                <Applications />
              </PrivateRouter>
            }
          />         
          <Route
            path="/moods"
            element={
              <PrivateRouter>
                <Moods />
              </PrivateRouter>
            }
          />
        </Routes>
      </Layout>
    </Router>
  </Provider>
);

export default App;
