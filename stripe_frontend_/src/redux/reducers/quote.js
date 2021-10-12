import { QUOTE_CREATE, QUOTE_UPDATE, QUOTE_GET, QUOTE_GET_ID, QUOTE_DELETE , QUOTE_FINALIZE, QUOTE_ACCEPT, QUOTE_PDF, QUOTE_LIST_COMPUTED_UP_FRONT_LINE_ITEMS, QUOTE_LIST_LINE_ITEM,} from "redux/actions";

export default (
    state = {
        resQuoteCreate: {},
        resQuoteGetId: {},
        resQuoteDelete: {},
        resQuoteList: {},
        resQuoteUpdate: {},
        resQuoteFinalizeQuote: {},
        resQuoteAcceptQuote: {},
        resQuotePdf: {},
        resQuoteListComputedUpfrontLineItems: {},
        resQuoteListLineItemsService: {},
    },
    action
) => {
    switch (action.type) {
        case QUOTE_CREATE:
            return {
                ...state,
                resQuoteCreate: action.resQuoteCreate
            };
        case QUOTE_GET_ID:
            return {
                ...state,
                resQuoteGetId: action.resQuoteGetId
            };
        case QUOTE_DELETE:
            return {
                ...state,
                resQuoteDelete: action.resQuoteDelete
            };
        case QUOTE_GET:
            return {
                ...state,
                resQuoteList: action.resQuoteList
            };
        case QUOTE_UPDATE:
            return {
                ...state,
                resQuoteUpdate: action.resQuoteUpdate
            };
        case QUOTE_FINALIZE:
            return {
                ...state,
                resQuoteFinalizeQuote: action.resQuoteFinalizeQuote
            };
        case QUOTE_ACCEPT:
            return {
                ...state,
                resQuoteAcceptQuote: action.resQuoteAcceptQuote
            };
        case QUOTE_PDF:
            return {
                ...state,
                resQuotePdf: action.resQuotePdf
            };
        case QUOTE_LIST_COMPUTED_UP_FRONT_LINE_ITEMS:
            return {
                ...state,
                resQuoteListComputedUpfrontLineItems: action.resQuoteListComputedUpfrontLineItems
            };
        case QUOTE_LIST_LINE_ITEM:
            return {
                ...state,
                resQuoteListLineItemsService: action.resQuoteListLineItemsService
            };
        default:
            return state;
    }
};