import {CHANGE_FILTER, RESET_FILTER} from "../actions/actionTypes";

const initialState = '';

export default function serviceFilterReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_FILTER:
            return action.payload;
        case RESET_FILTER:
            return initialState;
        default:
            return state;
    }
}
