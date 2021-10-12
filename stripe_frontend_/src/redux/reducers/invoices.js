import {
    INVOICES_GET_ID,
    INVOICES_DELETE,
    INVOICES_LIST,
    INVOICES_UPDATE,
    INVOICES_FINALIZE_INVOICE,
    INVOICES_PAY,
    INVOICES_SEND_INVOICE,
    INVOICES_VOID_INVOICE,
    INVOICES_MARK_UNCOLLECTIBLE,
    INVOICES_LIST_LINE_ITEM,
    INVOICES_RETRIEVE_UPCOMING,
    INVOICES_LIST_UPCOMING_LINE_ITEM,
} from "redux/actions";

export default (
    state = {
        resInvoicesCreate: {},
        resInvoicesGetId: {},
        resInvoicesDelete: {},
        resInvoicesList: {},
        resInvoicesUpdate: {},
        resInvoicesFinalizeInvoice: {},
        resInvoicesPay: {},
        resInvoicesSendInvoice: {},
        resInvoicesVoidInvoice: {},
        resInvoicesMarkUncollectible: {},
        resInvoicesListLineItems: {},
        resInvoicesRetrieveUpcoming: {},
        resInvoicesListUpcomingLineItems: {},
    },
    action
) => {
    switch (action.type) {
        case INVOICES_GET_ID:
            return {
                ...state,
                resInvoicesCreate: action.resInvoicesCreate
            };
        case INVOICES_DELETE:
            return {
                ...state,
                resInvoicesDelete: action.resInvoicesDelete
            };
        case INVOICES_UPDATE:
            return {
                ...state,
                resInvoicesUpdate: action.resInvoicesUpdate
            };
        case INVOICES_LIST:
            return {
                ...state,
                resInvoicesList: action.resInvoicesList
            };
        case INVOICES_FINALIZE_INVOICE:
            return {
                ...state,
                resInvoicesFinalizeInvoice: action.resInvoicesFinalizeInvoice
            };
        case INVOICES_PAY:
            return {
                ...state,
                resInvoicesPay: action.resInvoicesPay
            };
        case INVOICES_SEND_INVOICE:
            return {
                ...state,
                resInvoicesSendInvoice: action.resInvoicesSendInvoice
            };
        case INVOICES_VOID_INVOICE:
            return {
                ...state,
                resInvoicesVoidInvoice: action.resInvoicesVoidInvoice
            };
        case INVOICES_MARK_UNCOLLECTIBLE:
            return {
                ...state,
                resInvoicesMarkUncollectible: action.resInvoicesMarkUncollectible
            };
        case INVOICES_LIST_LINE_ITEM:
            return {
                ...state,
                resInvoicesListLineItems: action.resInvoicesListLineItems
            };
        case INVOICES_RETRIEVE_UPCOMING:
            return {
                ...state,
                resInvoicesRetrieveUpcoming: action.resInvoicesRetrieveUpcoming
            };
        case INVOICES_LIST_UPCOMING_LINE_ITEM:
            return {
                ...state,
                resInvoicesListUpcomingLineItems: action.resInvoicesListUpcomingLineItems
            };
        default:
            return state;
    }
};