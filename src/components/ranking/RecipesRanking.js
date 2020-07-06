import React, { Component } from 'react';
import Recipes from '../recipe/Recipes'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import './Rankings.css';

class RecipesRanking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8080/ranking/recipes")
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
            <div className="Book">
                <h2>Most rated recipes:</h2>
                <ListGroup className="Ranking">
                    {this.state.recipes.map((recipe, index) => (
                        <ListGroup.Item  className="RankingItem" key={index}>    
                            <p action onClick={() => this.props.history.push(`/recipe/${recipe.recipeId}`)}>{index+1}. {recipe.name}</p>      
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        )
    }
}

export default withRouter(RecipesRanking);