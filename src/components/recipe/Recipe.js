import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { userContext } from '../userContext';
import Button from 'react-bootstrap/Button';
import RatingSection from '../rating/RatingSection';
import NewRecipeManager from './NewRecipeManager';
import DeleteRecipeManager from './DeleteRecipeManager';
import './Recipe.css';
import Col from 'react-bootstrap/Col';

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
            authorName: "",
            ratingsNumber: "",
            ratingsVisible: false,
            edit: false,
            delete: false
        }
        this.showRatings = this.showRatings.bind(this);
        this.handleEditRecipe = this.handleEditRecipe.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
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
                    averageRating: recipe.averageRating,
                    authorId: recipe.authorId,
                    authorName: recipe.authorName,
                    ratingsNumber: recipe.ratingsNumber
                });
                if(recipe.ingredients !== undefined) {
                    this.setState({
                        ingredients: recipe.ingredients
                    })
                }
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

    handleEditRecipe() {
        this.setState(prevState => ({
            edit: !prevState.edit
        }));
    }


    handleDeleteRecipe() {
        this.setState(prevState => ({
            delete: !prevState.delete
        }));
    }

    render() {
        if (this.state.edit) {
            const recipe = {
                recipeId: this.state.id,
                name: this.state.name,
                text: this.state.text,
                imageUrl: this.state.imageUrl,
                ingredients: this.state.ingredients,
                authorId: this.state.authorId
            }
            return (
                <div>
                    <NewRecipeManager recipe={recipe} handleEditRecipe={this.handleEditRecipe} />
                </div>
            )
        }
        else
            return (
                <div>
                    <userContext.Consumer>
                        {({ user }) => {
                            return (
                                <div className="Recipe">
                                    <h2>{this.state.name}</h2>
                                    <p>by {this.state.authorName}</p>
                                    {(user.id === this.state.authorId) &&
                                        <Button variant="warning" size="sm" onClick={this.handleEditRecipe}>Edit</Button>}
                                    {(user.id === this.state.authorId) &&
                                        <Button variant="danger" size="sm" onClick={this.handleDeleteRecipe}>Delete</Button>
                                    }
                                    {this.state.delete &&
                                        <DeleteRecipeManager recipeId={this.state.id} cancelDelete={this.handleDeleteRecipe} />
                                    }
                                    {this.state.averageRating && <h6>{this.state.averageRating}/5</h6>}
                                    <h4>Ingredients:</h4>
                                    <ul>
                                        {this.state.ingredients.map(ingredient =>
                                            <li>{ingredient.name + ": " + ingredient.amount}</li>)}
                                    </ul>
                                    <h4>Preparation:</h4>
                                    {this.state.text.split("\\t").map(step =>
                                        <p>{step}</p>)}
                                    {this.state.imageUrl && <Image src={this.state.imageUrl} thumbnail />}
                                    <Col md={12}><Button variant="warning" onClick={this.showRatings}>Show ratings</Button></Col>
                                    {this.state.ratingsVisible && <RatingSection recipeId={this.state.id} />}
                                </div>
                            )
                        }}
                    </userContext.Consumer>
                </div>);
    }
}

export default withRouter(Recipe);