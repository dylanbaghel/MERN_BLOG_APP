import { 
    SET_POSTS,
    COUNT_PAGES,
    SET_VIEW_POST,
    ADD_POST,
    DELETE_POST
 } from './../action/types';

const postReducerDefaultState = {
    pages: null,
    count: null,
    data: [],
    view: null
};

const postReducer = (state = postReducerDefaultState, action) => {
    switch(action.type) {
        case SET_POSTS:
            return {
                ...state,
                data: action.posts,
                count: action.count
            };
        case COUNT_PAGES:
            return {
                ...state,
                pages: action.payload
            };
        case SET_VIEW_POST:
            return {
                ...state,
                view: action.view 
            };
        case DELETE_POST:
            return {
                ...state,
                data: state.data.filter((post) => post._id !== action.postId)
            };
        case ADD_POST:
            return {
                ...state,
                data: [action.post, ...state.data]
            };
        default:
            return state;
    }
}

export default postReducer;