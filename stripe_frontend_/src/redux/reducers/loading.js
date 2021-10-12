import {
    LOADING_GET,
    LOADING_CREATE,
    LOADING_UPDATE,
    LOADING_GET_ID,
    LOADING_DELETE
} from "redux/actions";

export default (
    state = {
        loadingGet: false,
        loadingCreate: false,
        loadingPost: false,
        loadingGetId: false,
        loadingDelete: false
    },
    action
) => {
    switch (action.type) {
        case LOADING_GET:
            return {
                ...state,
                loadingGet: action.loadingGet
            };
        case LOADING_CREATE:
            return {
                ...state,
                loadingCreate: action.loadingCreate
            };
        case LOADING_UPDATE:
            return {
                ...state,
                loadingPost: action.loadingPost
            };
        case LOADING_GET_ID:
            return {
                ...state,
                loadingGetId: action.loadingGetId
            };
        case LOADING_DELETE:
            return {
                ...state,
                loadingDelete: action.loadingDelete
            };
        default:
            return state;
    }
};