import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js';
import Dashboard from './pages/Dashboard.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Layout from './components/Layout.js';

import axios from "axios";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux'; 

import store from './Store';

const App = () => (
  <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/dashboard' element={<Dashboard/>} />
              <Route exact path='/register' element={<Register/>} />
              <Route exact path='/login' element={<Login/>} />
          </Routes>

        </Layout>
      </Router>
 </Provider>     
);

export default App;