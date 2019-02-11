import {
    SET_LOADING
} from './../action/types';

const loadingReducer = (state = false, action) => {
    switch(action.type) {
        case SET_LOADING:
            return action.bool
        default:
            return state;
    }
}

export default loadingReducer;