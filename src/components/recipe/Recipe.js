import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import Image from 'react-bootstrap/Image';
import axios from 'axios';

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
            authorId: ""
        }

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
                    authorId: recipe.authorId
                });
                console.log(recipe);
            })
            .catch(error => {
                console.log("Some Exception happened: ", error.toJSON());
            });
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
            </div>);
    }
}

export default withRouter(Recipe);