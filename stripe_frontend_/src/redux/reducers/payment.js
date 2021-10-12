import {
    PAYMENT_CREATE,
    PAYMENT_UPDATE,
    PAYMENT_GET,
    PAYMENT_GET_ID,
    PAYMENT_CONFIRM,
    PAYMENT_CAPTURE,
    PAYMENT_CANCEL,

    PAYMENT_METHOD_CREATE,
    PAYMENT_METHOD_UPDATE,
    PAYMENT_METHOD_GET,
    PAYMENT_METHOD_GET_ID,

    REVIEW_APPROVE,
    REVIEW_GET_ID,
    REVIEW_LIST,

    APPLICATION_LIST,
    APPLICATION_GET_ID
} from "redux/actions";

export default (
    state = {
        resPaymentCreate: {},
        resPaymentGetId: {},
        resPaymentDelete: {},
        resPaymentList: {},
        resPaymentUpdate: {},
        resPaymentConfirm: {},
        resPaymentCapture: {},
        resPaymentCancel: {},

        resPaymentMethodCreate: {},
        resPaymentMethodUpdate: {},
        resPaymentMethodDelete: {},
        resPaymentMethodList: {},

        resApplicationFeesGetId: {},
        resApplicationFeesList: {}
    },
    action
) => {
    switch (action.type) {
        case PAYMENT_CREATE:
            return {
                ...state,
                resPaymentCreate: action.resPaymentCreate
            };
        case PAYMENT_UPDATE:
            return {
                ...state,
                resPaymentUpdate: action.resPaymentUpdate
            };
        case PAYMENT_GET:
            return {
                ...state,
                resPaymentList: action.resPaymentList
            };
        case PAYMENT_GET_ID:
            return {
                ...state,
                resPaymentGetId: action.resPaymentGetId
            };
        case PAYMENT_CONFIRM:
            return {
                ...state,
                resPaymentConfirm: action.resPaymentConfirm
            };
        case PAYMENT_CAPTURE:
            return {
                ...state,
                resPaymentCapture: action.resPaymentCapture
            };
        case PAYMENT_CANCEL:
            return {
                ...state,
                resPaymentCancel: action.resPaymentCancel
            };
        case REVIEW_APPROVE:
            return {
                ...state,
                resReviewApprove: action.resReviewApprove
            };
        case REVIEW_LIST:
            return {
                ...state,
                resReviewList: action.resReviewList
            };
        case REVIEW_GET_ID:
            return {
                ...state,
                resReviewGetId: action.resReviewGetId
            };
        case PAYMENT_METHOD_CREATE:
            return {
                ...state,
                resPaymentMethodCreate: action.resPaymentMethodCreate
            };
        case PAYMENT_METHOD_UPDATE:
            return {
                ...state,
                resPaymentMethodUpdate: action.resPaymentMethodUpdate
            };
        case PAYMENT_METHOD_GET:
            return {
                ...state,
                resPaymentMethodList: action.resPaymentMethodList
            };
        case PAYMENT_METHOD_GET_ID:
            return {
                ...state,
                resPaymentMethodGetId: action.resPaymentMethodGetId
            };
        case APPLICATION_LIST:
            return {
                ...state,
                resApplicationFeesList: action.resApplicationFeesList
            };
        case APPLICATION_GET_ID:
            return {
                ...state,
                resApplicationFeesGetId: action.resApplicationFeesGetId
            };
        default:
            return state;
    }
};