import React, { Component } from 'react';
import { userContext } from '../userContext';
import AccountActions from './AccountActions';
import axios from 'axios';
import Recipes from '../recipe/Recipes'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // recipes: []
        }
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

    handleSignInClick() {
        this.setState(prevState => ({
            signInClicked: !prevState.signInClicked,
            signUpClicked: false
        }));
    }

    render() {
        return (
            <div>
                <userContext.Consumer>
                    {({ user, loginUser }) => {
                        return (
                            <div>
                                <h2>User:</h2>
                                <p>Nick: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <p>Points: {user.points}</p>
                                <p>Owned recipes: {user.ownedRecipeNumber}</p>
                                <p>Ratings posted: {user.ratingsNumber}</p>
                                <AccountActions />
                                {this.state.recipes &&
                                    <div>
                                        <h2>Book recipes:</h2>
                                        <Recipes recipes={this.state.recipes} />
                                    </div>}
                            </div>)
                    }}
                </userContext.Consumer>
            </div>);
    }
}