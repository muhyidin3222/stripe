import { ACCOUNT_CREATE, ACCOUNT_UPDATE, ACCOUNT_GET, ACCOUNT_GET_ID } from "redux/actions";

export default (
    state = {
        resAccountCreate: {},
        resAccountGetId: {},
        resAccountList: {},
        resAccountUpdate: {},
    },
    action
) => {
    switch (action.type) {
        case ACCOUNT_CREATE:
            return {
                ...state,
                resAccountCreate: action.resAccountCreate
            };
        case ACCOUNT_UPDATE:
            return {
                ...state,
                resAccountUpdate: action.resAccountUpdate
            };
        case ACCOUNT_GET:
            return {
                ...state,
                resAccountList: action.resAccountList
            };
        case ACCOUNT_GET_ID:
            return {
                ...state,
                resAccountGetId: action.resAccountGetId
            };
        default:
            return state;
    }
};