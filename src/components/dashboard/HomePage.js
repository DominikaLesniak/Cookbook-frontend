import React, { Component } from 'react';
import StyledExample from '../StyledExample';
import Recipes from '../recipe/Recipes'
import axios from 'axios';
import {withRouter } from 'react-router-dom';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8080/recipe", {
            params: {
                // namePattern: "pancakes",
                jsonRequest: {
                    namePattern: ""
                }
            }
        })
            .then(res => {
                const recipes = res.data.recipes;
                this.setState({
                    recipes: recipes
                })
            })
            .catch(error => {
                console.log("Some Exception happened: ", error.toJSON());
            });
    }


    render() {
        return (
            <div>
                <h1>Our recipes:</h1>
                {this.state.recipes && <Recipes recipes={this.state.recipes} />}
            </div>);
    }
}

export default withRouter(HomePage);