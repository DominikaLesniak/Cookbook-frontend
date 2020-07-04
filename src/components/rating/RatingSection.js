import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import Ratings from './Ratings';
import NewRatingManager from './NewRatingManager';
import './Rating.css'

class RatingsSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="RatingsList">
                {this.props.recipeId && <NewRatingManager recipeId={this.props.recipeId} />}
                {this.props.recipeId && <Ratings recipeId={this.props.recipeId} />}
            </div>);
    }
}

export default withRouter(RatingsSection);