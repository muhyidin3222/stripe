import { COLLAPSED } from "redux/actions";

export default (
    state = {
        collapsed: false
    },
    action
) => {
    switch (action.type) {
        case COLLAPSED:
            return {
                ...state,
                collapsed: action.collapsed
            };
        default:
            return state;
    }
};