import {
    SET_FLASH,
    REMOVE_FLASH
} from './types';

export const setFlash = (type, message) => {
    return dispatch => {
        dispatch({
            type: SET_FLASH,
            payload: {
                type,
                message
            }
        });

        setTimeout(() => {
            dispatch(removeFlash());
        }, 3000);
    };
};

export const removeFlash = () => {
    return {
        type: REMOVE_FLASH
    }
};