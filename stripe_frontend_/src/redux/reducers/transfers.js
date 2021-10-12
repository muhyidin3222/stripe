import { TRANSFERS_CREATE, TRANSFERS_UPDATE, TRANSFERS_GET, TRANSFERS_GET_ID, TRANSFERS_DELETE } from "redux/actions";

export default (
    state = {
        resTransfersCreate: {},
        resTransfersGetId: {},
        resTransfersDelete: {},
        resTransfersList: {},
        resTransfersUpdate: {},
    },
    action
) => {
    switch (action.type) {
        case TRANSFERS_CREATE:
            return {
                ...state,
                resTransfersCreate: action.resTransfersCreate
            };
        case TRANSFERS_UPDATE:
            return {
                ...state,
                resTransfersUpdate: action.resTransfersUpdate
            };
        case TRANSFERS_GET:
            return {
                ...state,
                resTransfersList: action.resTransfersList
            };
        case TRANSFERS_GET_ID:
            return {
                ...state,
                resTransfersGetId: action.resTransfersGetId
            };
        default:
            return state;
    }
};