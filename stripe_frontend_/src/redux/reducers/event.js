import { EVENT_GET, EVENT_GET_ID } from "redux/actions";

export default (
    state = {
        resEventGetId: {},
        resEventList: {},
    },
    action
) => {
    switch (action.type) {
        case EVENT_GET:
            return {
                ...state,
                resEventList: action.resEventList
            };
        case EVENT_GET_ID:
            return {
                ...state,
                resEventGetId: action.resEventGetId
            };
        default:
            return state;
    }
};