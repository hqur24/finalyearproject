import axios from 'axios';
import Cookies from 'js-cookie'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAIL
} from './types';

export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    //try{
        const response = await axios.get(`http://127.0.0.1:8000/auth/authenticated`, config)
        console.log(response.data.isAuthenticated)

        if (response.data.success || response.data.isAuthenticated === 'success') {
        console.log('isAuthenticated:', response.data.isAuthenticated);
            dispatch({
                    type: AUTHENTICATION_SUCCESS,
                    payload: true
                });
        }
        else if (response.data.error ||  response.data.isAuthenticated === 'error') {
            // console.log('isAuthenticated:', response.data.isAuthenticated);
            dispatch({
                    type: AUTHENTICATION_FAIL,
                    payload: false
                });
        }
    //}

    // catch(err) {
    //     dispatch({
    //         type: AUTHENTICATION_FAIL,
    //         payload: false
    //     });

    // }


};

export const login = (username, password) => async dispatch => {
    console.log('username:', username);
    console.log('password:', password);

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({username, password});
    const response = await axios.post(`http://127.0.0.1:8000/auth/login/`, body, config)
    if (response.data.error) {
        dispatch(
            {
                type: LOGIN_FAIL,
            });
    } else {
        dispatch({
            type: LOGIN_SUCCESS,
            // payload: response.data.username
        });
    }
}

export const logout = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const response = await axios.post(`http://127.0.0.1:8000/auth/logout/`, config)

    if (response.data.success) {
        dispatch(
            {
                type: LOGOUT_SUCCESS,
            });
    } else {
        dispatch({
            type: LOGOUT_FAIL
        });
    }

}

export const register = (username, email, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({username, email, password});
    const response = await axios.post(`http://127.0.0.1:8000/auth/register/`, body, config)

    if (response.data.error) {
        dispatch(
            {
                type: REGISTER_FAIL
            });
    } else {
        dispatch({
            type: REGISTER_SUCCESS
        });
    }
};