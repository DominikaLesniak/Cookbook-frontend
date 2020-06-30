import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { userContext } from '../userContext';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import './Rating.css';

export default class NewRatingManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: "",
            rate: 0,
            authorId: 0,
            recipeId: this.props.recipeId
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
                axios.post(`http://localhost:8080/recipe/${this.state.recipeId}/rating`, data, config)
                    .then(res => {
                        console.log("rating posted");
                        this.setState({
                            passwordChange: false
                        })
                    })
                    .catch(error => {
                        console.log("Authorizarion Exception", error);
                    });
            } else {
                console.log("nie");
            }
        }
    }

    render() {
        return (
            <div>
                <userContext.Consumer>
                    {({ user }) => {
                        return (
                            <div>
                                <Form className="Rating" onSubmit={this.handleSubmit(user)}>
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
                                    <Button variant="light" type="submit">
                                        Post rating
                                    </Button>
                                </Form>
                            </div>)
                    }}
                </userContext.Consumer>
            </div>
        )
    }
}