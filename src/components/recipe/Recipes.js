import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { withRouter, useHistory } from 'react-router-dom';
import { userContext } from '../userContext';
import NewRecipeManager from "./NewRecipeManager";
import './Recipe.css'

const Recipes = props => {
    const history = useHistory();
    const arr = [];
    const [indexes, setIndexes] = useState(arr);
    function recipeEditor(props) {
        console.log(props);
        return (
            <div>
                <NewRecipeManager recipe={props} />
            </div>
        );
    }
    return (
        <div>
            <userContext.Consumer>
                {({ user }) => {
                    return (
                        <ListGroup className="RecipeList">
                            {props.recipes.map(recipe => {
                                const link = "/recipe/" + recipe.recipeId;
                                return (
                                    <div>
                                        <ListGroup.Item key={recipe.recipeId} action onClick={() => history.push(link)} variant="light">
                                            <h2>{recipe.name}</h2>
                                            {recipe.imageUrl && <Image src={recipe.imageUrl} thumbnail />}
                                        </ListGroup.Item>
                                    </div>
                                )
                            })}
                        </ListGroup>
                    )
                }}
            </userContext.Consumer>
        </div>)
}

export default withRouter(Recipes);