import { CUSTOMERS_CREATE, CUSTOMERS_UPDATE, CUSTOMERS_GET, CUSTOMERS_GET_ID, CUSTOMERS_DELETE, CUSTOMERS_BANK } from "redux/actions";

export default (
    state = {
        resCustomersCreate: {},
        resCustomersGetId: {},
        resCustomersDelete: {},
        resCustomersList: {},
        resCustomersUpdate: {},
        resCustomersBank: {}
    },
    action
) => {
    switch (action.type) {
        case CUSTOMERS_CREATE:
            return {
                ...state,
                resCustomersCreate: action.resCustomersCreate
            };
        case CUSTOMERS_UPDATE:
            return {
                ...state,
                resCustomersUpdate: action.resCustomersUpdate
            };
        case CUSTOMERS_GET:
            return {
                ...state,
                resCustomersList: action.resCustomersList
            };
        case CUSTOMERS_GET_ID:
            return {
                ...state,
                resCustomersGetId: action.resCustomersGetId
            };
        case CUSTOMERS_DELETE:
            return {
                ...state,
                resCustomersDelete: action.resCustomersDelete
            };
        case CUSTOMERS_BANK:
            return {
                ...state,
                resCustomersBank: action.resCustomersBank
            };
        default:
            return state;
    }
};