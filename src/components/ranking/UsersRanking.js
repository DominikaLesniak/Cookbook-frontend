import React, { Component } from 'react';
import Recipes from '../recipe/Recipes'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import './Rankings.css';

class UsersRanking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8080/ranking/users")
            .then(res => {
                const users = res.data.users;
                this.setState({
                    users: users
                })
            })
            .catch(error => {
                console.log("Some Exception happened: ", error.toJSON());
            });
    }


    render() {
        return (
            <div className="Book">
                <h2>Users with the highest scores:</h2>
                <ListGroup className="Ranking" >
                    {this.state.users.map((user, index) => (
                        <ListGroup.Item className="RankingItem" key={index}>
                            <p action onClick={() => this.props.history.push(`/user/${user.id}`)}>{index + 1}. {user.username}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        )
    }
}

export default withRouter(UsersRanking);