import {
    ADD_SERVICE_FAILURE,
    ADD_SERVICE_REQUEST, ADD_SERVICE_SUCCESS,
    CHANGE_SERVICE_FIELD,
    EDIT_SERVICE
} from "../actions/actionTypes";

const initialState = {
    item: {
        name: '',
        price: '',
        content: '',
        id: 0
    },
    loading: false,
    error: null,
};

export default function serviceAddReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_SERVICE_REQUEST:
            return {...state, loading: true, error: null}
        case ADD_SERVICE_FAILURE:
            return {...state, loading: false, error: action.payload.message}
        case ADD_SERVICE_SUCCESS:
            return {...initialState}
        case CHANGE_SERVICE_FIELD:
            const {name, value} = action.payload;
            const {item} = state;
            return {...state, item: {...item, [name]: value}};
        case EDIT_SERVICE:
            return {...state, loading: false, error: null, item: action.payload.item};
        default:
            return state;
    }
}
