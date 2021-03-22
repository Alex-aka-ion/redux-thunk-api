import {
    FETCH_SERVICES_FAILURE,
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_SUCCESS,
    REMOVE_SERVICE, REMOVE_SERVICE_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    items: [],
    loading: false,
    error: true
};

export default function serviceListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SERVICES_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_SERVICES_FAILURE:
            return {...state, loading: false, error: action.payload.message}
        case FETCH_SERVICES_SUCCESS:
            return {...state, items: action.payload.items, loading: false, error: null};
        //case REMOVE_SERVICE_REQUEST:
        //case REMOVE_SERVICE_FAILURE:
        case REMOVE_SERVICE:
            return {...state, items: state.items.filter(item => item.id !== action.payload.id)};
        default:
            return state;
    }
}
