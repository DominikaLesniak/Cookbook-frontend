import React, { Component } from 'react';
import Recipes from '../recipe/Recipes'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../recipe/Recipe.css';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            user: {},
            recipes: []
        }
    }
    componentDidMount() {
        console.log(this.state.id);
        axios.get(`http://localhost:8080/user/${this.state.id}`)
            .then(res => {
                const user = res.data;
                this.setState({
                    user: user
                })
                axios.get(`http://localhost:8080/${this.state.id}/book`)
                    .then(res => {
                        this.setState({
                            recipes: res.data.recipes,
                        })
                    })
                    .catch(error => {
                        console.log("Some Exception", error);
                    });
            })
            .catch(error => {
                console.log("Some Exception happened: ", error.toJSON());
            });
    }


    render() {
        return (
            <div>
                <h2>User: {this.state.user.username}</h2>
                <p>Points: {this.state.user.points}</p>
                <p>Owned recipes: {this.state.user.ownedRecipeNumber || 0}</p>
                <p>Ratings posted: {this.state.user.ratingsNumber}</p>
                {this.state.recipes &&
                    <div >
                        <h2>Book recipes:</h2>
                        <Recipes recipes={this.state.recipes} />
                    </div>}
            </div>
        )
    }
}

export default withRouter(User);