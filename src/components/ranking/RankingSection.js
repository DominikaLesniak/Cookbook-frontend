import React, { Component } from 'react';
import UsersRanking from './UsersRanking';
import Recipes from '../recipe/Recipes'
import axios from 'axios';
import {withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import RecipesRanking from './RecipesRanking';

class RankingSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: false,
            users: true
        }
        this.handleRecipesClick = this.handleRecipesClick.bind(this);
        this.handleUsersClick = this.handleUsersClick.bind(this);
    }

    handleUsersClick() {
        this.setState({
            recipes: false,
            users: true
        });
    }

    handleRecipesClick() {
        this.setState({
            recipes: true,
            users: false
        });
    }

    render() {
        return (
            <div>
                <h1>Ranking</h1>
                <Row>
                    <Col> 
                        <Button variant="warning" onClick={this.handleUsersClick} active={this.state.recipes}>Users</Button>
                        <Button variant="warning" onClick={this.handleRecipesClick} active={this.state.users}> Recipes</Button>
                        
                    </Col>
                </Row>
                {this.state.users && <UsersRanking />}
                {this.state.recipes && <RecipesRanking />}
            </div>);
    }
}

export default withRouter(RankingSection);