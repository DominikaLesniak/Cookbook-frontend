import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import Ratings from '../rating/Ratings';
import Button from 'react-bootstrap/Button';
import RatingSection from '../rating/RatingSection';

class Recipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            name: "",
            text: "",
            imageUrl: "",
            ingredients: [
                {
                    name: "",
                    amount: ""
                }
            ],
            averageRating: 0,
            authorId: "",
            ratingsNumber: "",
            ratingsVisible: false
        }
        this.showRatings = this.showRatings.bind(this);
    }
    componentDidMount() {
        console.log("id: " + this.state.id);
        axios.get("http://localhost:8080/recipe/" + this.state.id)
            .then(res => {
                const recipe = res.data;
                this.setState({
                    name: recipe.name,
                    text: recipe.text,
                    imageUrl: recipe.imageUrl,
                    ingredients: recipe.ingredients,
                    averageRating: recipe.averageRating,
                    authorId: recipe.authorId,
                    ratingsNumber: recipe.ratingsNumber
                });
                console.log(recipe);
            })
            .catch(error => {
                console.log("Some Exception happened: ", error.toJSON());
            });
    }

    showRatings() {
        this.setState(prevState => ({
            ratingsVisible: !prevState.ratingsVisible
        }));
    }

    render() {
        return (
            <div>
                <h2>{this.state.name}</h2>
                {this.state.averageRating && <h6>{this.state.averageRating}/5</h6>}
                <h4>Ingriedients:</h4>
                <ul>
                    {this.state.ingredients.map(ingredient =>
                        <li>{ingredient.name + ": "+ ingredient.amount}</li>)}
                </ul>
                <h4>Preparation:</h4>
                {this.state.text.split("\\t").map(step =>
                    <p>{step}</p>)}
                {this.state.imageUrl && <Image src={this.state.imageUrl} thumbnail />}
                <Button variant="light" onClick={this.showRatings}>Show ratings</Button>
                {this.state.ratingsVisible && <RatingSection recipeId={this.state.id} />}
            </div>);
    }
}

export default withRouter(Recipe);