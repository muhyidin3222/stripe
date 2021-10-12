import { TOPUP_CREATE, TOPUP_UPDATE, TOPUP_GET, TOPUP_GET_ID, TOPUP_DELETE } from "redux/actions";

export default (
    state = {
        resTopUpCreate: {},
        resTopUpGetId: {},
        resTopUpDelete: {},
        resTopUpList: {},
        resTopUpUpdate: {},
    },
    action
) => {
    switch (action.type) {
        case TOPUP_CREATE:
            return {
                ...state,
                resTopUpCreate: action.resTopUpCreate
            };
        case TOPUP_UPDATE:
            return {
                ...state,
                resTopUpUpdate: action.resTopUpUpdate
            };
        case TOPUP_GET:
            return {
                ...state,
                resTopUpList: action.resTopUpList
            };
        case TOPUP_GET_ID:
            return {
                ...state,
                resTopUpGetId: action.resTopUpGetId
            };
        default:
            return state;
    }
};