// client.src.reducers.authReducers.js

import {
    SET_CURRENT_USER,
    USER_LOADING,
    GET_CURRENT_USER,
    GET_CURRENT_USER_SEARCH,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_CURRENT_USER:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case GET_CURRENT_USER_SEARCH:
            return {
                ...state,
                response: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
