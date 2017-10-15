import React, { Component } from 'react';

class Timer extends Component {
  render() {
    return (
      <div className="Timer">
        <span className="Description">TIME</span>
        <br />
        <span className="Numeric">{this.props.remaining}</span>
     </div>
    );
  }
}

export default Timer;
