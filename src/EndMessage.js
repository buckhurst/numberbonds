import React, { Component } from 'react';

class EndMessage extends Component {
  

  
  render() {
    return (
      <div className="StartScreen">
        <h1 className="Game-title">Time up!</h1>
        <p className="Game-intro">
          You scored <strong>{this.props.score}</strong> points
        </p>
        
        <br />
        
        <button className="StartButton" onClick={this.props.onButtonClick}>
        PLAY AGAIN
        </button>
        
      
      <div className="Footer">
        <p>(C) Jonathan Buckhurst 2017</p>
      </div>
      
     </div>

    );
  }
}

export default EndMessage;
