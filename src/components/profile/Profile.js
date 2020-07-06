import React, { Component } from 'react';
import { userContext } from '../userContext';
import AccountActions from './AccountActions';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Recipes from '../recipe/Recipes';
import Button from 'react-bootstrap/Button';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.handleNewRecipeButtonClick = this.handleNewRecipeButtonClick.bind(this);
    }
    componentDidMount() {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("JWT")
            }
        }
        axios.get("http://localhost:8080/book", config)
            .then(res => {
                this.setState({
                    recipes: res.data.recipes,
                })
            })
            .catch(error => {
                console.log("Some Exception", error);
            });
    }

    handleNewRecipeButtonClick() {
        this.props.history.push("/newRecipe");
    }

    render() {
        return (
            <div>
                <userContext.Consumer>
                    {({ user, loginUser }) => {
                        return (
                            <div>
                                <h2>User profile</h2>
                                <AccountActions />
                                <p>Nick: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <p>Points: {user.points}</p>
                                <p>Owned recipes: {user.ownedRecipeNumber || 0}</p>
                                <p>Ratings posted: {user.ratingsNumber}</p>
                                <Button variant="warning"  onClick={this.handleNewRecipeButtonClick}>Add new recipe</Button>
                                {this.state.recipes &&
                                    <div className="Book">
                                        <h2>Book recipes:</h2>
                                        <Recipes recipes={this.state.recipes} />
                                    </div>}
                            </div>)
                    }}
                </userContext.Consumer>
            </div>);
    }
}

export default withRouter(Profile);