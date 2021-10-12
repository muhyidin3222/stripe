import { checkoutListService } from 'services/checkout';
import { CHECKOUT_GET, LOADING_GET, LOADING_CREATE, LOADING_UPDATE } from 'redux/actions'

export const checkoutListDispatch = (data) => async (dispatch, getState) => {
    dispatch({ type: LOADING_GET, loadingGet: false })
    try {
        const resCheckoutList = await checkoutListService(data)
        dispatch({ type: CHECKOUT_GET, resCheckoutList: resCheckoutList?.data?.payload })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: LOADING_GET, loadingGet: false })
}
