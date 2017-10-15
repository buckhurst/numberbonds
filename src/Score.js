import React, { Component } from 'react';

class Score extends Component {
  render() {
    return (
      <div className="Score">
        <span className="Description">SCORE</span>
        <br />
        <span className="Numeric">{this.props.score}</span>
     </div>
    );
  }
}

export default Score;
