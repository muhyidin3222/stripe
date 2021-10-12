import { ERROR_CREATE, ERROR_UPDATE, ERROR_GET, ERROR_GET_ID } from "redux/actions";

export default (
    state = {
        errorCreate: {},
        errorGetId: {},
        errorList: {},
        errorUpdate: {},
    },
    action
) => {
    switch (action.type) {
        case ERROR_CREATE:
            return {
                ...state,
                errorCreate: action.errorCreate
            };
        case ERROR_UPDATE:
            return {
                ...state,
                errorUpdate: action.errorUpdate
            };
        case ERROR_GET:
            return {
                ...state,
                errorList: action.errorList
            };
        case ERROR_GET_ID:
            return {
                ...state,
                errorGetId: action.errorGetId
            };
        default:
            return state;
    }
};