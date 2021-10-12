import { DISPUTES_CREATE, DISPUTES_UPDATE, DISPUTES_GET, DISPUTES_GET_ID } from "redux/actions";

export default (
    state = {
        resDisputesCreate: {},
        resDisputesGetId: {},
        resDisputesList: {},
        resDisputesUpdate: {},
    },
    action
) => {
    switch (action.type) {
        case DISPUTES_CREATE:
            return {
                ...state,
                resDisputesCreate: action.resDisputesCreate
            };
        case DISPUTES_UPDATE:
            return {
                ...state,
                resDisputesUpdate: action.resDisputesUpdate
            };
        case DISPUTES_GET:
            return {
                ...state,
                resDisputesList: action.resDisputesList
            };
        case DISPUTES_GET_ID:
            return {
                ...state,
                resDisputesGetId: action.resDisputesGetId
            };
        default:
            return state;
    }
};