import { GET_ALL_USER, DETAIL_USER } from 'redux/actions'

export const getDataAll = (dataList) => {
    return {
        type: GET_ALL_USER,
        dataList
    };
};
export const getDetalUser = (dataDetail) => {
    return {
        type: DETAIL_USER,
        dataDetail
    };
};