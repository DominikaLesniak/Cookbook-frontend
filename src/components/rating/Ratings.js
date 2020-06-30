import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter, useHistory } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import './Rating.css';

const Ratings = props => {
    const arr = [];
    const [ratings, setRatings] = useState(arr);

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
            {ratings && <ListGroup className="RatingsList">
                {ratings.map(rating => {
                    return (
                        <ListGroup.Item className="Rating" key={rating.authorId} variant="light">
                            <p className="Par">Author: {rating.authorName}</p>
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
                })}
            </ListGroup>}
        </div>)
}

function getRatings(recipeId) {
    axios.get("http://localhost:8080/recipe/" + recipeId + "/rating")
        .then(res => {
            const ratings = res.data;
            // setRatings(ratings);
            console.log("RATINGS for " + recipeId);
        })
        .catch(error => {
            console.log("Some Exception happened: ", error);
        });
}

export default withRouter(Ratings);