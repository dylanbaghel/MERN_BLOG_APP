import {
    SET_FLASH,
    REMOVE_FLASH
} from './../action/types';

const flashReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_FLASH:
            return action.payload;
        case REMOVE_FLASH:
            return {};
        default:
            return state;
    }
};

export default flashReducer;