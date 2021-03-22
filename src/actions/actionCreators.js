import {
    ADD_SERVICE_FAILURE, ADD_SERVICE_REQUEST, ADD_SERVICE_SUCCESS, CHANGE_FILTER,
    CHANGE_SERVICE_FIELD,
    EDIT_SERVICE, FETCH_SERVICES_FAILURE, FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS,
    REMOVE_SERVICE, REMOVE_SERVICE_FAILURE, REMOVE_SERVICE_REQUEST, REMOVE_SERVICE_SUCCESS,
    RESET_FIELDS, RESET_FILTER,
} from "./actionTypes";

export function fetchServicesRequest() {
    return {type: FETCH_SERVICES_REQUEST};
}

export function fetchServicesFailure(message) {
    return {type: FETCH_SERVICES_FAILURE, payload: {message}}
}

export function fetchServicesSuccess(items) {
    return {type: FETCH_SERVICES_SUCCESS, payload: {items}}
}

export function addServiceRequest(item) {
    return {type: ADD_SERVICE_REQUEST, payload: {item}};
}

export function addServiceFailure(message) {
    return {type: ADD_SERVICE_FAILURE, payload: {message}}
}

export function addServiceSuccess() {
    return {type: ADD_SERVICE_SUCCESS}
}

export function removeService(id) {
    return {type: REMOVE_SERVICE, payload: {id}};
}

export function changeServiceField(name, value) {
    return {type: CHANGE_SERVICE_FIELD, payload: {name, value}};
}

export function editService(item) {
    return {type: EDIT_SERVICE, payload: {item}};
}

export function changeServiceFilter(value) {
    return {type: CHANGE_FILTER, payload: value};
}

export function resetFilter() {
    return {type: RESET_FILTER};
}

export const fetchServices = () => async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
        dispatch(fetchServicesSuccess(data));
    } catch (e) {
        dispatch(fetchServicesFailure(e.message));
    }
}

export const addService = (item, redirect) => async (dispatch) => {
    console.log(item);
    dispatch(addServiceRequest());
    try {
        console.log(JSON.stringify(item));
        const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        dispatch(addServiceSuccess());
        redirect();
    } catch (e) {
        dispatch(addServiceFailure(e.message));
    }
    fetchServices(dispatch);
}

export const removeServiceOnServer = (id, afterRemove) => async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        afterRemove();
    } catch (e) {
        dispatch(fetchServicesFailure(e.message));
    }
    fetchServices(dispatch);
}

export const fetchItem = (id) => async (dispatch) => {
    dispatch(addServiceRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
        dispatch(editService(data));
    } catch (e) {
        dispatch(addServiceFailure(e.message));
    }
}
