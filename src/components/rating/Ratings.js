import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { withRouter, useHistory } from 'react-router-dom';
import { userContext } from '../userContext';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import './Rating.css';
import NewRatingManager from './NewRatingManager';

const Ratings = props => {
    const arr = [];
    const [ratings, setRatings] = useState(arr);
    const [editId, setEditId] = useState(arr);

    useEffect(() => {
        console.log("RATINGS for " + props.recipeId);
        axios.get("http://localhost:8080/recipe/" + props.recipeId + "/rating")
            .then(res => {
                const r = res.data.ratings;
                console.log(r);
                setRatings(r);
                // console.log("RATINGS for " + props.recipeId);
            })
            .catch(error => {
                console.log("Some Exception happened: ", error);
            });
    }, [])
    return (
        <div>
            <userContext.Consumer>
                {({ user }) => {
                    return (
                        <div>
                            {ratings && <ListGroup >
                                {ratings.map(rating => {
                                    if (editId.includes(rating.id)) {
                                        return(
                                        <NewRatingManager rating={rating} editionEnd={() => setEditId([])} />)
                                    } else {
                                        return (
                                            <ListGroup.Item className="Rating" key={rating.authorId} variant="light">
                                                <Row>
                                                    <Col md={8}>
                                                        <p className="Par">Author: {rating.authorName}</p>
                                                    </Col>
                                                    <Col md={2}>
                                                        {(user.id === rating.authorId) &&
                                                            <Button variant="warning" size="sm" onClick={() => setEditId(currentArray => [...currentArray, rating.id])}>
                                                                <text className="ButtonText">Edit</text>
                                                            </Button>}
                                                    </Col>
                                                    <Col md={1}>
                                                        {(user.id === rating.authorId) && <Button variant="danger" size="sm">
                                                            <text className="ButtonText">Delete</text>
                                                        </Button>}
                                                    </Col>
                                                </Row>
                                                <ReactStars
                                                    count={5}
                                                    edit={false}
                                                    size={24}
                                                    half={false}
                                                    color2={"#ffd700"}
                                                    value={rating.rate}
                                                />
                                                {rating.comment && <p>Comment: {rating.comment}</p>}
                                            </ListGroup.Item>
                                        )
                                    }
                                })}
                            </ListGroup>}
                        </div>
                    )
                }}
            </userContext.Consumer>
        </div>)
}

export default withRouter(Ratings);

function edit(rating) {
    return (
        <NewRatingManager rating={rating} />
    )
}