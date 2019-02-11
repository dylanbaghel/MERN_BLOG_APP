import axios from 'axios';

import {
    SET_CURRENT_USER,
    REMOVE_CURRENT_USER
} from './types';
import { BASE_URL } from './../utils/utils';
import getUser from './../utils/getUser';
import setAuthToken from './../utils/setAuthToken';
import { setLoading } from './loadingActions';
import moment from 'moment';

export const startLogin = (email, password) => {
    return dispatch => {
        dispatch(setLoading(true));
        return axios.post(`${BASE_URL}/users/login`, {email, password}).then(res => {
            const token = res.data.token;
            const user = getUser(token);
            const userId = user.userId;
            setAuthToken(token);
            localStorage.setItem('blogToken', token);
            dispatch(setCurrentUser({ userId, name: res.data.user.name }));
            dispatch(setLoading(false));
            dispatch(autoLogout(user.exp - moment().unix()));
            return Promise.resolve(res.data.user);
        }).catch(e => {
            console.log('startLogin', e.response.data);
            dispatch(setLoading(false));
            return Promise.reject(e.response.data);
        });
    };
};

export const startRegister = (data) => {
    return dispatch => {
        dispatch(setLoading(true));
        return axios
                .post(`${BASE_URL}/users`, data)
                .then(res => {
                    const token = res.data.token;
                    const user = getUser(token);
                    const userId = user.userId;
                    setAuthToken(token);
                    localStorage.setItem('blogToken', token);
                    dispatch(setCurrentUser({ userId, name: res.data.user.name }));
                    dispatch(setLoading(false));
                    dispatch(autoLogout(user.exp - moment().unix()));
                    return Promise.resolve(res.data.user);
                })
                .catch(e => {
                    console.log('startRegister', e.response.data);
                    dispatch(setLoading(false));
                    return Promise.reject(e.response.data);
                });
    };
};

export const startGetProfile = () => {
    return dispatch => {
        axios.get(`${BASE_URL}/users/me`)
            .then(res => {
                dispatch(setCurrentUser({
                    name: res.data.me.name
                }));
            });
    };
};

const autoLogout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(startLogout());
        }, expiresIn * 1000);
    };
}

export const startLogout = () => {
    return dispatch => {
        setAuthToken(false);
        localStorage.removeItem('blogToken');
        dispatch(removeCurrentUser());
    };
};

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
};

export const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    };
};