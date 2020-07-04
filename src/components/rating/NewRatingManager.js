import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { userContext } from '../userContext';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import './Rating.css';
import Col from 'react-bootstrap/Col';

export default class NewRatingManager extends Component {
    constructor(props) {
        super(props);
        if (this.props.rating !== undefined) {
            console.log("editing rating");
            console.log(this.props.rating);
            this.state = {
                comment: this.props.rating.comment,
                rate: this.props.rating.rate,
                authorId: this.props.rating.authorId,
                ratingId: this.props.rating.id,
                edit: true
            }
        } else {
            this.state = {
                comment: "",
                rate: 0,
                authorId: 0,
                recipeId: this.props.recipeId,
                edit: false
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.ratingChange = this.ratingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    ratingChange(newRate) {
        this.setState({
            rate: newRate
        })
    }

    handleSubmit(user) {
        return event => {
            event.preventDefault();
            if (user.id !== undefined) {
                console.log("posting rating");

                const data = {
                    comment: this.state.comment,
                    rate: this.state.rate,
                    authorId: user.id,
                    recipeId: this.state.recipeId
                }
                const config = {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("JWT"),
                        "Content-Type": "application/json"
                    }
                }

                if(this.state.edit) {
                    axios.put(`http://localhost:8080/recipe/${this.state.recipeId}/rating/${this.state.ratingId}`, data, config)
                    .then(res => {
                        console.log("rating edited");
                        this.props.editionEnd();
                    })
                    .catch(error => {
                        console.log("Authorizarion Exception", error);
                    });
                } else {
                axios.post(`http://localhost:8080/recipe/${this.state.recipeId}/rating`, data, config)
                    .then(res => {
                        console.log("rating posted");
                    })
                    .catch(error => {
                        console.log("Authorizarion Exception", error);
                    });
                }
            } else {
                console.log("nie");
            }
        }
    }

    render() {
        return (
            <div className="RatingForm">
                <userContext.Consumer>
                    {({ user }) => {
                        return (
                            <div>
                                <Form onSubmit={this.handleSubmit(user)}>
                                    <Form.Group className="Rating" controlId="rate">
                                        <Form.Label>Rate</Form.Label>
                                        <ReactStars
                                            count={5}
                                            onChange={this.ratingChange}
                                            size={24}
                                            half={false}
                                            color2={"#ffd700"}
                                            value={this.state.rate}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Label>Enter your comment</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="comment"
                                            onChange={this.handleChange}
                                            name="comment"
                                            value={this.state.comment}
                                        />
                                    </Form.Group>
                                    <Col md={12}>
                                        <Button variant="light" type="submit">
                                            Post rating
                                    </Button></Col>
                                </Form>
                            </div>)
                    }}
                </userContext.Consumer>
            </div>
        )
    }
}