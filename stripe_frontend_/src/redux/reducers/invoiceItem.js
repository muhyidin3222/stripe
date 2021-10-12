import { INVOICE_ITEM_CREATE, INVOICE_ITEM_UPDATE, INVOICE_ITEM_GET, INVOICE_ITEM_GET_ID, INVOICE_ITEM_DELETE } from "redux/actions";

export default (
    state = {
        resInvoiceItemCreate: {},
        resInvoiceItemGetId: {},
        resInvoiceItemDelete: {},
        resInvoiceItemList: {},
        resInvoiceItemUpdate: {},
    },
    action
) => {
    switch (action.type) {
        case INVOICE_ITEM_CREATE:
            return {
                ...state,
                resInvoiceItemCreate: action.resInvoiceItemCreate
            };
        case INVOICE_ITEM_UPDATE:
            return {
                ...state,
                resInvoiceItemUpdate: action.resInvoiceItemUpdate
            };
        case INVOICE_ITEM_GET:
            return {
                ...state,
                resInvoiceItemList: action.resInvoiceItemList
            };
        case INVOICE_ITEM_GET_ID:
            return {
                ...state,
                resInvoiceItemGetId: action.resInvoiceItemGetId
            };
        case INVOICE_ITEM_DELETE:
            return {
                ...state,
                resInvoiceItemDelete: action.resInvoiceItemDelete
            };
        default:
            return state;
    }
};