import { CHECKOUT_GET} from "redux/actions";

export default (
    state = {
        resCheckoutList: {},
    },
    action
) => {
    switch (action.type) {
        case CHECKOUT_GET:
            return {
                ...state,
                resCheckoutList: action.resCheckoutList
            };
        default:
            return state;
    }
};