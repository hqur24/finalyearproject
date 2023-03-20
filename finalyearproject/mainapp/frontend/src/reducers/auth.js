import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAIL
} from '../actions/types.js';

const initialState = {
    isAuthenticated: null,
    username: '',
}
export default function(state = initialState, action) {
    const { type, payload} = action;

    switch(type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false // this indicates that after a user signs up they will NOT be automatically signed in
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            }
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: payload
            } 
        case AUTHENTICATION_FAIL:
            return {
                ...state,
                isAuthenticated: payload
            }
        case LOGIN_FAIL:
            return { 
                ...state, 
                loginError: 'Invalid credentials entered. Please try again.'
            }
        case REGISTER_FAIL:
            return {
                ...state,            }
        case LOGOUT_FAIL:
            return state
        default:
            return state

    }




}