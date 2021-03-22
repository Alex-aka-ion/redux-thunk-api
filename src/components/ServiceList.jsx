import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchServices, removeService, removeServiceOnServer} from "../actions/actionCreators";
import {Alert, ListGroup, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from 'react-router-dom';

export default function ServiceList() {
    const filter = useSelector(state => state.serviceFilter);
    const {items, loading, error} = useSelector(state => state.serviceList);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const handleRemove = id => {
        dispatch(removeServiceOnServer(id, () => dispatch(removeService(id))));
    };

    const handleEdit = id => {
        history.push(`/services/${id}`);
    }

    if (loading)
        return <Spinner animation="border"/>;

    if (error)
        return <Alert variant="danger">Error: {error}</Alert>;

    return (
        <>
            <ListGroup>
                {items.filter(o => o.name.toLowerCase().includes(filter.toLowerCase())).map(o => <ListGroup.Item
                    key={o.id}>
                    {o.name} {o.price}
                    <button className="btn btn-danger float-right" onClick={() => handleRemove(o.id)}><FontAwesomeIcon
                        icon={faTimes}/></button>
                    <button className="btn btn-outline-warning float-right" onClick={() => handleEdit(o.id)}>
                        <FontAwesomeIcon icon={faEdit}/></button>
                </ListGroup.Item>)}
            </ListGroup>
            <ListGroup>
                <button className="btn btn-primary float-right" onClick={() => history.push('/services/new')}>Add
                </button>
            </ListGroup>
        </>
    );
}
