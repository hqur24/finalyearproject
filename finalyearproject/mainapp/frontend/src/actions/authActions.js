import axios from "axios";
import Cookies from "js-cookie";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from "./types";
const API_URL = process.env.REACT_APP_API_URL;
console.log("API ENV VARIABLE", API_URL)

export const authenticationCheck = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  
  const response = await axios.get(
    // `http://127.0.0.1:8000/accounts/authenticated/`,
    `${API_URL}/accounts/authenticated/`,
    config
  );

  if (response.data.success || response.data.isAuthenticated === "success") {
    dispatch({
      type: AUTHENTICATION_SUCCESS,
      payload: true,
    });
  } else if (
    response.data.error ||
    response.data.isAuthenticated === "failure"
  ) {
    dispatch({
      type: AUTHENTICATION_FAIL,
      payload: false,
    });
  }
};

export const login = (username, password) => async (dispatch) => {

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({ username, password });
  const response = await axios.post(
    `${API_URL}/accounts/login/`,
    // `http://127.0.0.1:8000/accounts/login/`,
    body,
    config
  );

  if (response.data.error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  } else {
    dispatch({
      type: LOGIN_SUCCESS,
      // payload: response.data.username
    });
  }
};

export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    withCredentials: true,
  });

  try {
    const response = await axios.post(
      // `http://127.0.0.1:8000/accounts/logout/`,
      `${API_URL}/accounts/logout/`,

      body,
      config
    );

    if (response.data.success) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({ username, email, password });
  const response = await axios.post(
    // `http://127.0.0.1:8000/accounts/register/`,
    `${API_URL}/accounts/register/`,

    body,
    config
  );

  if (response.data.error) {
    dispatch({
      type: REGISTER_FAIL,
    });
  } else {
    dispatch({
      type: REGISTER_SUCCESS,
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      // `http://127.0.0.1:8000/accounts/currentuser/`,
      `${API_URL}/accounts/currentuser/`,

      config
    );
    if (response.data.success) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_USER_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
    });
  }
};
