import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import Ratings from './Ratings';
import NewRatingManager from './NewRatingManager';

class RatingsSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.recipeId && <NewRatingManager recipeId={this.props.recipeId} />}
                {this.props.recipeId && <Ratings recipeId={this.props.recipeId} />}
            </div>);
    }
}

export default withRouter(RatingsSection);