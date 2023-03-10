import React, { useContext, useState } from "react";
// import Header from "../../components/Header/Header";
// import "../../components/Button/button.css";
// import "./login.css";
// import Axios from "axios";
// import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  return (
     
 < div class="container-fluid">
  <div class="row justify-content-center">
 <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Username</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>     
</div>
</div>    
  );
};

export default Login;
