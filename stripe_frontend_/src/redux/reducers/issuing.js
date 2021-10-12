import {
    ISSUING_CARDHOLDER,
    ISSUING_CARDHOLDER_GET,
    ISSUING_CARDHOLDER_CREATE,
    ISSUING_CARDHOLDER_UPDATE,
    ISSUING_CARDHOLDER_GET_ID,

    ISSUING_CARD_GET,
    ISSUING_CARD_CREATE,
    ISSUING_CARD_UPDATE,
    ISSUING_CARD_GET_ID,

    DISPUTES_GET,
    DISPUTES_CREATE,
    DISPUTES_UPDATE,
    DISPUTES_GET_ID,

    TRANSACTIONS_GET,
    TRANSACTIONS_CREATE,
    TRANSACTIONS_UPDATE,
    TRANSACTIONS_GET_ID,

    AUTHORIZATIONS_GET,
    AUTHORIZATIONS_DECLINE,
    AUTHORIZATIONS_APPROVE,
    AUTHORIZATIONS_UPDATE,
    AUTHORIZATIONS_GET_ID,
} from "redux/actions";

export default (
    state = {
        cardholderCreateData: {},
        resCardholderCreate: {},
        resCardholderUpdate: {},
        resCardholderGetAll: {},
        resCardholderGetId: {},

        resCardCreate: {},
        resCardUpdate: {},
        resCardGetAll: {},
        resCardGetId: {},

        resDisputesGetAll: {},
        resDisputesCreate: {},
        resDisputesUpdate: {},
        resDisputesGetId: {},

        resTransactionsGetAll: {},
        resTransactionsCreate: {},
        resTransactionsUpdate: {},
        resTransactionsGetId: {},

        resAuthorizationsGetAll: {},
        resAuthorizationsDecline: {},
        resAuthorizationsApprove: {},
        resAuthorizationsUpdate: {},
        resAuthorizationsGetId: {},
    },
    action
) => {
    switch (action.type) {
        //CARDHOLDER
        case ISSUING_CARDHOLDER_GET:
            return {
                ...state,
                resCardholderGetAll: action.resCardholderGetAll
            };
        case ISSUING_CARDHOLDER_CREATE:
            return {
                ...state,
                resCardholderCreate: action.resCardholderCreate
            };
        case ISSUING_CARDHOLDER_UPDATE:
            return {
                ...state,
                resCardholderUpdate: action.resCardholderUpdate
            };
        case ISSUING_CARDHOLDER_GET_ID:
            return {
                ...state,
                resCardholderGetId: action.resCardholderGetId
            };

        //Card
        case ISSUING_CARD_GET:
            return {
                ...state,
                resCardGetAll: action.resCardGetAll
            };
        case ISSUING_CARD_CREATE:
            return {
                ...state,
                resCardCreate: action.resCardCreate
            };
        case ISSUING_CARD_UPDATE:
            return {
                ...state,
                resCardUpdate: action.resCardUpdate
            };
        case ISSUING_CARD_GET_ID:
            return {
                ...state,
                resCardGetId: action.resCardGetId
            };

        //disputes
        case DISPUTES_GET:
            return {
                ...state,
                resDisputesGetAll: action.resDisputesGetAll
            };
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
        case DISPUTES_GET_ID:
            return {
                ...state,
                resDisputesGetId: action.resDisputesGetId
            };


        //transactions
        case TRANSACTIONS_GET:
            return {
                ...state,
                resTransactionsGetAll: action.resTransactionsGetAll
            };
        case TRANSACTIONS_CREATE:
            return {
                ...state,
                resTransactionsCreate: action.resTransactionsCreate
            };
        case TRANSACTIONS_UPDATE:
            return {
                ...state,
                resTransactionsUpdate: action.resTransactionsUpdate
            };
        case TRANSACTIONS_GET_ID:
            return {
                ...state,
                resTransactionsGetId: action.resTransactionsGetId
            };

        //transactions
        case AUTHORIZATIONS_GET:
            return {
                ...state,
                resAuthorizationsGetAll: action.resAuthorizationsGetAll
            };
        case AUTHORIZATIONS_DECLINE:
            return {
                ...state,
                resAuthorizationsDecline: action.resAuthorizationsDecline
            };
        case AUTHORIZATIONS_APPROVE:
            return {
                ...state,
                resAuthorizationsApprove: action.resAuthorizationsApprove
            };
        case AUTHORIZATIONS_UPDATE:
            return {
                ...state,
                resAuthorizationsUpdate: action.resAuthorizationsUpdate
            };
        case AUTHORIZATIONS_GET_ID:
            return {
                ...state,
                resAuthorizationsGetId: action.resAuthorizationsGetId
            };

        default:
            return state;
    }
};