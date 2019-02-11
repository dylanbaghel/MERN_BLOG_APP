import {
    SET_COMMENTS,
    REMOVE_COMMENT,
    ADD_COMMENT
} from './types';
import axios from 'axios';

import { BASE_URL } from './../utils/utils';

export const startSetComments = () => {
    return dispatch => {
        return axios
            .get(`${BASE_URL}/comments`)
            .then(res => {
                dispatch(setComments(res.data.comments));
                return Promise.resolve(res.data.comments);
            })
            .catch(e => {
                console.log('startSetComments', e.response.data);
                return Promise.reject(e.response.data);
            });
    };
};

export const startRemoveComment = (commentId) => {
    return dispatch => {
        axios
            .delete(`${BASE_URL}/comments/${commentId}`)
            .then(res => {
                dispatch(removeComment(res.data.deletedComment._id));
            })
            .catch(e => {
                console.log('startRemoveComment', e.response.data);
            })
    };
};

export const startAddComment = (postId, data) => {
    return dispatch => {
        axios
            .post(`${BASE_URL}/comments/${postId}`, data)
            .then(res => {
                dispatch(addComment(res.data.newComment));
            })
            .catch(e => {
                console.log('startAddComment', e.response.data);
            });
    };
};

export const setComments = (comments) => {
    return {
        type: SET_COMMENTS,
        comments
    };
};

const removeComment = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        commentId
    };
};

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    };
};