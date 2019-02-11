import {
    SET_LOADING
} from './types';

export const setLoading = (bool) => {
    return {
        type: SET_LOADING,
        bool
    };
};