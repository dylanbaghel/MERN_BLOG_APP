import {
    SET_CURRENT_USER,
    REMOVE_CURRENT_USER
} from './../action/types';

const authReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                ...action.payload
            };
        case REMOVE_CURRENT_USER:
            return {};
        default:
            return state;
    }
}

export default authReducer;