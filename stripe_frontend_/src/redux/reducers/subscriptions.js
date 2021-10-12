import { SUBSCRIPTIONS_CREATE, SUBSCRIPTIONS_UPDATE, SUBSCRIPTIONS_GET, SUBSCRIPTIONS_GET_ID, SUBSCRIPTIONS_DELETE } from "redux/actions";

export default (
    state = {
        resSubscriptionsCreate: {},
        resSubscriptionsGetId: {},
        resSubscriptionsDelete: {},
        resSubscriptionsList: {},
        resSubscriptionsUpdate: {},
    },
    action
) => {
    switch (action.type) {
        case SUBSCRIPTIONS_CREATE:
            return {
                ...state,
                resSubscriptionsCreate: action.resSubscriptionsCreate
            };
        case SUBSCRIPTIONS_UPDATE:
            return {
                ...state,
                resSubscriptionsUpdate: action.resSubscriptionsUpdate
            };
        case SUBSCRIPTIONS_GET:
            return {
                ...state,
                resSubscriptionsList: action.resSubscriptionsList
            };
        case SUBSCRIPTIONS_GET_ID:
            return {
                ...state,
                resSubscriptionsGetId: action.resSubscriptionsGetId
            };
        case SUBSCRIPTIONS_DELETE:
            return {
                ...state,
                resSubscriptionsDelete: action.resSubscriptionsDelete
            };
        default:
            return state;
    }
};