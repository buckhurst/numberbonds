import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Countdown from './Countdown.js';
import Score from './Score.js';
import Timer from './Timer.js';
import Numberbond from './Numberbond.js';
import StartMessage from './StartMessage.js';
import EndMessage from './EndMessage.js';

const GameLength = 60 //s

class App extends Component {

  constructor(props) {
    super(props);
    
    window.app = this

    // This binding is necessary to make `this` work in the callback
    this.renderQuiz = this.renderQuiz.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.countDown = this.countDown.bind(this);
    this.updateNumbers = this.updateNumbers.bind(this);
    this.flashRed = this.flashRed.bind(this);
    this.flashGreen = this.flashGreen.bind(this);
    
    this.state = { display: 'Start', score: 0, remaining: GameLength, numbers: this.generateNumbers()};
    
  }

  randomInt(max) {
    return Math.floor(Math.random()*max)+1
  }
  
  // Nabbed from stack overflow
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  randomIntButNotInArray(max, number) {
    var numbers = [number]
    while (numbers.length < 3) {
      var candidate = this.randomInt(max)
      if (!numbers.includes(candidate) ) {
        numbers.push( candidate )
      }
    }
    return numbers
  }
  
  generateNumbers() {
    var number = this.randomInt(19)
    var answer = 20 - number
    var answers = this.randomIntButNotInArray(19, answer)
    var data = [ {"option": answers[0], "handler": this.handleSuccess },
                 {"option": answers[1], "handler": this.handleFailure },
                 {"option": answers[2], "handler": this.handleFailure } ]
    return { "number": number, "answer": answer, "options": this.shuffleArray(data)  } 
  }
  
  updateNumbers() {
    this.setState(
      { numbers: this.generateNumbers() }
    )
  }

  
  handleSuccess() {
    this.flashGreen()
    this.incrementScore(1)
    this.updateNumbers()
  }
  
  handleFailure() {
    this.flashRed()
    this.incrementScore(-1)
  }
  
  incrementScore(inc) {
    this.setState({
      score: this.state.score + inc
    })
  }
  
  flashGreen() {
    document.body.style.backgroundColor = "darkgreen";
    this.incrementScore(1);
    setTimeout(function(){ document.body.style.backgroundColor = "black"; }, 200 )
  }
  
  flashRed() {
    document.body.style.backgroundColor = "red";
    setTimeout(function(){ document.body.style.backgroundColor = "black"; }, 200 )
  }
  
  renderQuiz() {
    
    var data = this.state.numbers
    
    return (
      <div>
      <Timer remaining={this.state.remaining} />
      <Score score={this.state.score} />
      <Numberbond numberbond={data["number"]}
          answerA={data["options"][0]["option"]} handlerA={data["options"][0]["handler"]}
          answerB={data["options"][1]["option"]} handlerB={data["options"][1]["handler"]}
          answerC={data["options"][2]["option"]} handlerC={data["options"][2]["handler"]} />
      </div>
    )
  }
  
  startQuiz() {
    this.setState({ display: 'Quiz', score: 0, remaining: GameLength, numbers: this.generateNumbers() }, this.countDown )
  }
  
  countDown() {
    this.setState( {remaining: this.state.remaining - 1} )
    if (this.state.remaining >= 0) {
      setTimeout( function() {
        this.countDown()
      }.bind(this), 1000 )
    } else {
      this.setState( { display: 'End'}  )
    }
  }
  
  renderStartMessage() {
    return (
      <StartMessage onButtonClick={this.startQuiz} />
    )
  }
  
  renderEnd() {
    setTimeout( function() {
        this.setState( { display: 'PlayAgain' } )
      }.bind(this), 2000 )
    return (
      <EndMessage score={this.state.score} disabled={true}/>
    )
  }
  
  renderPlayAgain() {
    return (
      <EndMessage score={this.state.score} disabled={false} onButtonClick={this.startQuiz}/>
    )
  }
  
  render() {
    return (
      <div className="App">
        { this.state.display === 'Start' ? this.renderStartMessage()  : '' }
        { this.state.display === 'Quiz' ? this.renderQuiz()  : '' }
        { this.state.display === 'End' ? this.renderEnd() : ''}
        { this.state.display === 'PlayAgain' ? this.renderPlayAgain() : ''}
     </div>
    );
  }
}

export default App;
