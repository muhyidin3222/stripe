import { PAYOUT_CREATE, PAYOUT_UPDATE, PAYOUT_GET, PAYOUT_GET_ID, PAYOUT_DELETE } from "redux/actions";

export default (
    state = {
        resPayOutCreate: {},
        resPayOutGetId: {},
        resPayOutDelete: {},
        resPayOutList: {},
        resPayOutUpdate: {},
    },
    action
) => {
    switch (action.type) {
        case PAYOUT_CREATE:
            return {
                ...state,
                resPayOutCreate: action.resPayOutCreate
            };
        case PAYOUT_UPDATE:
            return {
                ...state,
                resPayOutUpdate: action.resPayOutUpdate
            };
        case PAYOUT_GET:
            return {
                ...state,
                resPayOutList: action.resPayOutList
            };
        case PAYOUT_GET_ID:
            return {
                ...state,
                resPayOutGetId: action.resPayOutGetId
            };
        default:
            return state;
    }
};