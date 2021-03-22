import {useDispatch, useSelector} from "react-redux";
import {changeServiceFilter, resetFilter} from "../actions/actionCreators";
import React from "react";
import {Form} from "react-bootstrap";

export default function ServiceFilter() {
    const filter = useSelector(state => state.serviceFilter);
    const dispatch = useDispatch();

    const handleChange = e => {
        dispatch(changeServiceFilter(e.target.value));
    }

    const handleClear = e => {
        e.preventDefault();
        dispatch(resetFilter());
    }

    return (
        <Form inline>
            <Form.Label>Фильтр:</Form.Label>
            <Form.Control type="text" name="filter" onChange={handleChange} value={filter}/>
            <button className="btn btn-info" type='submit' onClick={handleClear}>Clear</button>
        </Form>
    )
}
