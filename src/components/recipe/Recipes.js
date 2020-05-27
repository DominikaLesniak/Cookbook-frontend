import  React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import {withRouter, useHistory } from 'react-router-dom';

const Recipes = props => {
    const history = useHistory()
    return(
            <div>
                <ListGroup>
                    {props.recipes.map(recipe => {
                        const link = "/recipe/"+recipe.recipeId;
                        return (
                            <ListGroup.Item key={recipe.recipeId} action onClick={()=> history.push(link)} variant="light">
                                <h2>{recipe.name}</h2>
                                {recipe.imageUrl && <Image src={recipe.imageUrl} thumbnail />}    
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>)
}


export default withRouter(Recipes);