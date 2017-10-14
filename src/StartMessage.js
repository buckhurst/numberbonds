import React, { Component } from 'react';

class StartMessage extends Component {
  

  
  render() {
    return (
      <div className="StartScreen">
        <h1 className="Game-title">Welcome to Jonathan's Numberbonds game</h1>
        <p className="Game-intro">
          Press this button to start playing!!!
        </p>
        
        <br />
        
        <button className="StartButton" onClick={this.props.onButtonClick}>
        PLAY
        </button>
        
      
      <div className="Footer">
        <p>(C) Jonathan Buckhurst 2017</p>
      </div>
      
     </div>

    );
  }
}

export default StartMessage;
