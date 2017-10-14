import React, { Component } from 'react';

class Numberbond extends Component {
  render() {
    return (
      <div className="Numberbond">
        <div className="Number">
          <span>{this.props.numberbond}</span>
        </div>
        
        <div className="Answers">
          <div className="AnswerButton" onClick={this.props.handlerA} >{this.props.answerA}</div>
          <div className="AnswerButton" onClick={this.props.handlerB} >{this.props.answerB}</div>
          <div className="AnswerButton" onClick={this.props.handlerC} >{this.props.answerC}</div>
        </div>
        
     </div>
    );
  }
}

export default Numberbond;
