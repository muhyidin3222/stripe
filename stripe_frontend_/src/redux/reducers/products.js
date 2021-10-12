import {
    PRODUCTS_GET,
    PRODUCTS_CREATE,
    PRODUCTS_UPDATE,
    PRODUCTS_GET_ID,
    PRODUCTS_DELETE,

    PRICES_CREATE,
    PRICES_UPDATE,
    PRICES_GET,
    PRICES_GET_ID,

    PROMOTIONS_CREATE,
    PROMOTIONS_UPDATE,
    PROMOTIONS_GET,
    PROMOTIONS_GET_ID,

    TRANSACTIONS_GET,
    TRANSACTIONS_CREATE,
    TRANSACTIONS_UPDATE,
    TRANSACTIONS_GET_ID,

    CUPONS_CREATE,
    CUPONS_UPDATE,
    CUPONS_GET,
    CUPONS_GET_ID,

    TEX_CODE_CREATE,
    TEX_CODE_UPDATE,
    TEX_CODE_GET,
    TEX_CODE_GET_ID,

    TEX_RATE_GET,
    TEX_RATE_CREATE,
    TEX_RATE_UPDATE,
    TEX_RATE_GET_ID,
} from "redux/actions";

export default (
    state = {
        resProductsGetAll: {},
        resProductsCreate: {},
        resProductsUpdate: {},
        resProductsGetId: {},

        resPricesGetAll: [],
        resPricesCreate: {},
        resPricesUpdate: {},
        resPricesGetId: {},

        resPromotionsGetAll: {},
        resPromotionsCreate: {},
        resPromotionsUpdate: {},
        resPromotionsGetId: {},

        resCuponsGetAll: {},
        resCuponsCreate: {},
        resCuponsUpdate: {},
        resCuponsGetId: {},

        resTexCodeUpate: {},
        resTexCodeCreate: {},

        resTexRateAll: {},
        resTexRateCreate: {},
        resTexRateUpdate: {},
        resTexRateGetId: {},
    },
    action
) => {
    switch (action.type) {
        //PRODUCTS
        case PRODUCTS_GET:
            return {
                ...state,
                resProductsGetAll: action.resProductsGetAll
            };
        case PRODUCTS_CREATE:
            return {
                ...state,
                resProductsCreate: action.resProductsCreate
            };
        case PRODUCTS_UPDATE:
            return {
                ...state,
                resProductsUpdate: action.resProductsUpdate
            };
        case PRODUCTS_GET_ID:
            return {
                ...state,
                resProductsGetId: action.resProductsGetId
            };

        //PRICES
        case PRICES_GET:
            return {
                ...state,
                resPricesGetAll: action.resPricesGetAll
            };
        case PRICES_CREATE:
            return {
                ...state,
                resPricesCreate: action.resPricesCreate
            };
        case PRICES_UPDATE:
            return {
                ...state,
                resPricesUpdate: action.resPricesUpdate
            };
        case PRICES_GET_ID:
            return {
                ...state,
                resPricesGetId: action.resPricesGetId
            };


        //PRICES
        case PROMOTIONS_GET:
            return {
                ...state,
                resPromotionsGetAll: action.resPromotionsGetAll
            };
        case PROMOTIONS_CREATE:
            return {
                ...state,
                resPromotionsCreate: action.resPromotionsCreate
            };
        case PROMOTIONS_UPDATE:
            return {
                ...state,
                resPromotionsUpdate: action.resPromotionsUpdate
            };
        case PROMOTIONS_GET_ID:
            return {
                ...state,
                resPromotionsGetId: action.resPromotionsGetId
            };


        //CUPONS
        case CUPONS_GET:
            return {
                ...state,
                resCuponsGetAll: action.resCuponsGetAll
            };
        case CUPONS_CREATE:
            return {
                ...state,
                resCuponsCreate: action.resCuponsCreate
            };
        case CUPONS_UPDATE:
            return {
                ...state,
                resCuponsUpdate: action.resCuponsUpdate
            };
        case CUPONS_GET_ID:
            return {
                ...state,
                resCuponsGetId: action.resCuponsGetId
            };

        //TEX_RATE
        case TEX_CODE_UPDATE:
            return {
                ...state,
                resTexCodeUpate: action.resTexCodeUpate
            };
        case TEX_CODE_CREATE:
            return {
                ...state,
                resTexCodeCreate: action.resTexCodeCreate
            };

        //TEX_RATE
        case TEX_RATE_GET:
            return {
                ...state,
                resTexRateAll: action.resTexRateAll
            };
        case TEX_RATE_CREATE:
            return {
                ...state,
                resTexRateCreate: action.resTexRateCreate
            };
        case TEX_RATE_UPDATE:
            return {
                ...state,
                resTexRateUpdate: action.resTexRateUpdate
            };
        case TEX_RATE_GET_ID:
            return {
                ...state,
                resTexRateGetId: action.resTexRateGetId
            };

        default:
            return state;
    }
};