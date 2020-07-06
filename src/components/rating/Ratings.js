import React, { useState, useEffect, useRef } from 'react';
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
import DeleteRatingManager from './DeleteRatingManager';

const Ratings = props => {
    const arr = [];
    const [ratings, setRatings] = useState(arr);
    const [editId, setEditId] = useState(arr);
    const [deleteId, setDeleteId] = useState(arr);
    const [refresh, setRefresh] = useState(true);
    const [authors, setAuthors] = useState(arr);
    const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

    function refreshRatings() {
        if (refresh === true) {
            axios.get("http://localhost:8080/recipe/" + props.recipeId + "/rating")
                .then(res => {
                    const r = res.data.ratings;
                    setRatings(r);
                    setEditId([]);
                    setRefresh(false);
                    scrollToBottom();
                })
                .catch(error => {
                    console.log("Some Exception happened: ", error);
                });
        }
    }
    useEffect(() => {
        refreshRatings();
        if (ratings !== undefined) {
            const authors = ratings.map((rating) => {
                return rating.authorId;
            })
            setAuthors(authors);
        } else {
            setAuthors([]);
        }
    }, [refresh])
    return (
        <div>
            <userContext.Consumer>
                {({ user }) => {
                    return (
                        <div ref={messagesEndRef}>
                            {(user === undefined || !authors.includes(user.id)) && <NewRatingManager recipeId={props.recipeId} editionEnd={() => setEditId([])} refreshActive={() => setRefresh(true)} />}
                            {ratings && <ListGroup >
                                {ratings.map(rating => {
                                    if (editId.includes(rating.id)) {
                                        return (
                                            <NewRatingManager rating={rating} editionEnd={() => setEditId([])} refreshActive={() => setRefresh(true)} />)
                                    } else if (deleteId.includes(rating.id)) {
                                        return (
                                            <DeleteRatingManager recipeId={props.recipeId} rating={rating}
                                                deleteEnd={() => setDeleteId([])} refreshActive={() => setRefresh(true)} />
                                        )
                                    }
                                    else {
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
                                                        {(user.id === rating.authorId) &&
                                                            <Button variant="danger" size="sm" onClick={() => setDeleteId(currentArray => [...currentArray, rating.id])}>
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