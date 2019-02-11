import {
    SET_COMMENTS,
    REMOVE_COMMENT,
    ADD_COMMENT
} from './../action/types';

const commentReducer = (state = [], action) => {
    switch(action.type) {
        case SET_COMMENTS:
            return action.comments;
        case REMOVE_COMMENT:
            return state.filter(comment => comment._id !== action.commentId);
        case ADD_COMMENT:
            return [action.comment, ...state];
        default:
            return state;
    }
};

export default commentReducer;