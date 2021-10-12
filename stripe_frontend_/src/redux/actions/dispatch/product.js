import {
    productsCreateService,
    productsUpdateService,
    productsGetAllService,
    productsGetIdService,
    productsDeleteService,

    pricesCreateService,
    pricesUpdateService,
    pricesGetAllService,
    pricesGetIdService,

    cuponsCreateService,
    cuponsUpdateService,
    cuponsGetAllService,
    cuponsGetIdService,

    promotionsCreateService,
    promotionsUpdateService,
    promotionsGetAllService,
    promotionsGetIdService,

    taxRateCreateService,
    taxRateUpdateService,
    taxRateGetAllService,
    taxRateGetIdService,

    taxCodeCreateService,
    taxCodeUpdateService,
} from 'services/products';
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

    LOADING_GET,
    LOADING_CREATE,
    LOADING_UPDATE,
    LOADING_GET_ID,
    LOADING_DELETE,

    TRANSACTIONS_GET,
    TRANSACTIONS_CREATE,
    TRANSACTIONS_UPDATE,
    TRANSACTIONS_GET_ID,

    CUPONS_CREATE,
    CUPONS_UPDATE,
    CUPONS_GET,
    CUPONS_GET_ID,

    TEX_RATE_CREATE,
    TEX_RATE_UPDATE,
    TEX_RATE_GET,
    TEX_RATE_GET_ID,

    TEX_CODE_CREATE,
    TEX_CODE_UPDATE,

    ERROR_CREATE,
    ERROR_DELETE,
    ERROR_GET
} from 'redux/actions'

import {
    handleErrorGetAll,
    handleErrorGetId,
    handleErrorUpdate,
    handleErrorCreate,
    handleErrorDelete
} from 'utils/handleResApi'

import { successHandle, errorHandle } from 'utils/handleRes'
import { ERROR_UPDATE } from '../type';

// products
export const productsCreate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resProductsCreate = await productsCreateService(data)
        dispatch({ type: PRODUCTS_CREATE, resProductsCreate: resProductsCreate?.data?.payload })
    } catch (error) {
        handleErrorCreate(error)
    }
    dispatch({ type: LOADING_CREATE, loadingGet: false })
};
export const productsUpdate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resProductsUpdate = await productsUpdateService(data)
        dispatch({ type: PRODUCTS_UPDATE, resProductsUpdate: resProductsUpdate?.data?.payload })
    } catch (error) {
        handleErrorUpdate(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};
export const productsGetAll = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resProductsGetAll = await productsGetAllService(data)
        dispatch({ type: PRODUCTS_GET, resProductsGetAll: resProductsGetAll?.data?.payload })
        successHandle({ type: "get", dispatch, typeLoading: LOADING_GET })
        return resProductsGetAll?.data?.payload
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
        return false
    }
};
export const productsGetId = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resProductsGetId = await productsGetIdService(data)
        dispatch({ type: PRODUCTS_GET_ID, resProductsGetId: resProductsGetId?.data?.payload })
        successHandle({ type: "get", dispatch, typeLoading: LOADING_GET })
        return resProductsGetId?.data?.payload
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
        return false
    }
};
export const productsDelete = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_DELETE, loadingGet: true })
    try {
        const resProductsDelete = await productsDeleteService(id)
        dispatch({ type: PRODUCTS_DELETE, resProductsDelete: resProductsDelete?.data?.payload })
        successHandle({ type: "delete", dispatch, typeLoading: LOADING_DELETE })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_DELETE, dispatch, typeLoading: LOADING_DELETE })
        return false
    }
    // dispatch({ type: LOADING_DELETE, loadingGet: false })
};


//prices
export const pricesCreate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resPricesCreate = await pricesCreateService(data)
        dispatch({ type: PRICES_CREATE, resPricesCreate: resPricesCreate?.data?.payload })
        successHandle({ type: "get", dispatch, typeLoading: LOADING_CREATE })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_CREATE, dispatch, typeLoading: LOADING_CREATE })
        return false
    }
};
export const pricesUpdate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resPricesUpdate = await pricesUpdateService(data)
        dispatch({ type: PRICES_UPDATE, resPricesUpdate: resPricesUpdate?.data?.payload })
    } catch (error) {
        handleErrorUpdate(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};
export const pricesGetAll = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resPricesGetAll = await pricesGetAllService(data)
        console.log(resPricesGetAll)
        dispatch({ type: PRICES_GET, resPricesGetAll: resPricesGetAll?.data?.payload?.data })
        successHandle({ type: "get", dispatch, typeLoading: LOADING_GET })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
        return false
    }
};
export const pricesGetId = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resPricesGetId = await pricesGetIdService(id)
        dispatch({ type: PRICES_GET_ID, resPricesGetId: resPricesGetId?.data?.payload })
    } catch (error) {
        handleErrorGetId(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
};

//cupons
export const cuponsCreate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resCuponsCreate = await cuponsCreateService(data)
        dispatch({ type: CUPONS_CREATE, resCuponsCreate: resCuponsCreate })
        successHandle({ type: "get", dispatch, typeLoading: LOADING_CREATE, type: "create" })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_CREATE, dispatch, typeLoading: LOADING_CREATE })
        console.log(ERROR_CREATE)
        return false
    }
};
export const cuponsUpdate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resCuponsUpdate = await cuponsUpdateService(data)
        dispatch({ type: CUPONS_UPDATE, resCuponsUpdate: resCuponsUpdate?.data?.payload })
    } catch (error) {
        handleErrorUpdate(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};
export const cuponsGetAll = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resCuponsGetAll = await cuponsGetAllService(data)
        dispatch({ type: CUPONS_GET, resCuponsGetAll: resCuponsGetAll?.data?.payload })
    } catch (error) {
        handleErrorGetAll(error)
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
};
export const cuponsGetId = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resCuponsGetId = await cuponsGetIdService(data)
        dispatch({ type: CUPONS_GET_ID, resCuponsGetId: resCuponsGetId?.data?.payload })
    } catch (error) {
        handleErrorGetId(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
};

//promotion
export const promotionCreate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resPromotionsCreate = await promotionsCreateService(data)
        dispatch({ type: PROMOTIONS_CREATE, resPromotionsCreate: resPromotionsCreate?.data?.payload })
    } catch (error) {
        handleErrorGetAll(error)
    }
    dispatch({ type: LOADING_CREATE, loadingGet: false })
};
export const promotionUpdate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resPromotionsUpdate = await promotionsUpdateService(data)
        dispatch({ type: PROMOTIONS_UPDATE, resPromotionsUpdate: resPromotionsUpdate?.data?.payload })
    } catch (error) {
        handleErrorUpdate(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};
export const promotionGetAll = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resPromotionsGetAll = await promotionsGetAllService(data)
        dispatch({ type: PROMOTIONS_GET, resPromotionsGetAll: resPromotionsGetAll?.data?.payload })
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
        handleErrorGetAll(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
};
export const promotionGetId = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resPromotionsGetId = await promotionsGetIdService(data)
        dispatch({ type: PROMOTIONS_GET_ID, resPromotionsGetId: resPromotionsGetId?.data?.payload })
    } catch (error) {
        handleErrorGetId(error)
    }
    dispatch({ type: LOADING_GET_ID, loadingGet: false })
};


//taxRates
export const texRatesCreate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resTexRateCreate = await taxRateCreateService(data)
        dispatch({ type: TEX_RATE_CREATE, resTexRateCreate: resTexRateCreate?.data?.payload })
        successHandle({ dispatch, typeLoading: LOADING_CREATE, type: "create" })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_CREATE, dispatch, typeLoading: LOADING_CREATE })
        return false
    }
};
export const texRatesUpdate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resTexRateUpdate = await taxRateUpdateService(data)
        dispatch({ type: TEX_RATE_UPDATE, resTexRateUpdate: resTexRateUpdate?.data?.payload })
        successHandle({ dispatch, typeLoading: LOADING_UPDATE, type: "update" })
        return true
    } catch (error) {
        errorHandle({ error, typeError: ERROR_UPDATE, dispatch, typeLoading: LOADING_UPDATE })
        return false
    }
};
export const texRatesGetAll = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: true })
    try {
        const resTexRateAll = await taxRateGetAllService(data)
        dispatch({ type: TEX_RATE_GET, resTexRateAll: resTexRateAll?.data?.payload })
    } catch (error) {
        errorHandle({ error, typeError: ERROR_GET, dispatch, typeLoading: LOADING_GET })
        handleErrorGetAll(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
};
export const texRatesGetId = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET_ID, loadingGet: true })
    try {
        const resTexRateGetId = await taxRateGetIdService(data)
        dispatch({ type: TEX_RATE_GET_ID, resTexRateGetId: resTexRateGetId?.data?.payload })
        successHandle({ dispatch, typeLoading: LOADING_GET_ID, type: "get" })
    } catch (error) {
        errorHandle({ error, typeError: LOADING_GET_ID, dispatch, typeLoading: LOADING_GET_ID })
        return false
    }
};


//taxCode
export const texCodeCreate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_CREATE, loadingGet: true })
    try {
        const resTexRateCreate = await taxCodeCreateService(data)
        dispatch({ type: TEX_CODE_CREATE, resTexRateCreate: resTexRateCreate?.data?.payload })
    } catch (error) {
        handleErrorGetAll(error)
    }
    dispatch({ type: LOADING_CREATE, loadingGet: false })
};
export const texCodeUpdate = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UPDATE, loadingGet: true })
    try {
        const resTexRateUpdate = await taxCodeUpdateService(data)
        dispatch({ type: TEX_CODE_UPDATE, resTexRateUpdate: resTexRateUpdate?.data?.payload })
    } catch (error) {
        handleErrorUpdate(error)
    }
    dispatch({ type: LOADING_UPDATE, loadingGet: false })
};