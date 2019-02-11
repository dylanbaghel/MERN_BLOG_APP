import {
    SET_POSTS,
    COUNT_PAGES,
    SET_VIEW_POST,
    ADD_POST,
    DELETE_POST
} from './types';
import axios from 'axios';

import { BASE_URL } from './../utils/utils';
import { history } from './../router/AppRouter';
import { setLoading } from './loadingActions';

export const startSetPosts = () => {
    const size = 10;
    let pageNo = 1;
    const query = new URLSearchParams(history.location.search);
    if (query) {
        pageNo = query.get('pageNo');
    }
    return dispatch => {
        dispatch(setLoading(true));
        axios
            .get(`${BASE_URL}/posts?pageNo=${pageNo}&size=${size}`)
            .then(res => {
                dispatch(setPosts(res.data.posts, res.data.count));
                dispatch(setPages(res.data.pages));
                dispatch(setLoading(false));
            })
            .catch(e => {
                console.log(e.response);
                dispatch(setLoading(false));
            });
    };
};

export const startSetMyPosts = (pageNo = 1) => {
    const size = 10;

    return dispatch => {
        dispatch(setLoading(true));    
        axios.get(`${BASE_URL}/posts/my?pageNo=${pageNo}&size=${size}`)
            .then(res => {
                dispatch(setPosts(res.data.myPosts, res.data.count));
                dispatch(setPages(res.data.pages));
                dispatch(setLoading(false));
            })
            .catch(e => {
                console.log(e.response);
                dispatch(setLoading(false));
            });
    };
};

export const startSetViewPost = (postId) => {
    return dispatch => {
        dispatch(setLoading(true));
        axios
            .get(`${BASE_URL}/posts/${postId}`)
            .then(res => {
                dispatch(setViewPost(res.data.post));
                dispatch(setLoading(false));
            })
            .catch(e => {
                console.log(e.response);
                dispatch(setLoading(false));
            });
    };
};

export const startAddPost = (data) => {
    return dispatch => {
        dispatch(setLoading(true));
        axios
            .post(`${BASE_URL}/posts`, data)
            .then(res => {
                dispatch(setLoading(false));
            })
            .catch(e => {
                console.log(e.response);
                dispatch(setLoading(false));
            });
    };
};

export const startRemovePost = (postId) => {
    return dispatch => {
        dispatch(setLoading(true));
        axios
            .delete(`${BASE_URL}/posts/${postId}`)
            .then(res => {
                dispatch(removePost(res.data.deletedPost._id));
                dispatch(setLoading(false));
            })
            .catch(e => {
                console.log(e.response);
                dispatch(setLoading(false));
            });
    };
};

export const startEditPost = (postId, data) => {
    return dispatch => {
        dispatch(setLoading(true));
        axios
            .put(`${BASE_URL}/posts/${postId}`, data)
            .then(res => {
                dispatch(setLoading(false));
            })
            .catch(e => {
                console.log(e.response);
                dispatch(setLoading(false));
            });
    };
};

export const setViewPost = (view) => {
    return {
        type: SET_VIEW_POST,
        view
    };
};

export const setPosts = (posts, count) => {
    return {
        type: SET_POSTS,
        posts,
        count
    };
};


export const setPages = (totalPages) => {
    return {
        type: COUNT_PAGES,
        payload: totalPages
    };
};

export const removePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    };
};