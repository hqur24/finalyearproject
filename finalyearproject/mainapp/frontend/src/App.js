import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js';
import Dashboard from './pages/Dashboard.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Layout from './hocs/Layout.js';
import PrivateRouter from './hocs/PrivateRouter.js';
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
          <Route path='/dashboard' element={<PrivateRouter><Dashboard/></PrivateRouter>}/>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/register' element={<Register/>} />
              <Route exact path='/login' element={<Login/>} />
          </Routes>

        </Layout>
      </Router>
 </Provider>     
);

export default App;