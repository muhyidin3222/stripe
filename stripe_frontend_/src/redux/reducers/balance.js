import {
    BALANCES_CREATE_BANK_ACCOUNT,
    GET_BALANCE_RETRIEVE,
    CUSTOMERS_CREATE_COURCE,
    GET_BALANCE_TRANSACTION
} from "redux/actions";

export default (
    state = {
        dataBalanceCreate: {},
        balanceRetrieveData: {},
        customersCreateSource: {}
    },
    action
) => {
    switch (action.type) {
        case BALANCES_CREATE_BANK_ACCOUNT:
            return {
                ...state,
                dataBalanceCreate: action.dataBalanceCreate
            };
        case GET_BALANCE_RETRIEVE:
            return {
                ...state,
                balanceRetrieveData: action.balanceRetrieveData
            };
        case CUSTOMERS_CREATE_COURCE:
            return {
                ...state,
                customersCreateSource: action.customersCreateSource
            };
        case GET_BALANCE_TRANSACTION:
            return {
                ...state,
                resBalanceTransactionsList: action.resBalanceTransactionsList
            };
        default:
            return state;
    }
};