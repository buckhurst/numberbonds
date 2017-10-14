import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Countdown from './Countdown.js';
import Numberbond from './Numberbond.js';
import StartMessage from './StartMessage.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {screen: "StartMessage"};

    // This binding is necessary to make `this` work in the callback
    this.startGame = this.startGame.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
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
    var number = this.randomInt(20)
    var answer = 20 - number
    var answers = this.randomIntButNotInArray(20, answer)
    var data = [ {"option": answers[0], "handler": this.handleSuccess },
                 {"option": answers[1], "handler": this.handleFailure },
                 {"option": answers[2], "handler": this.handleFailure } ]
    return { "number": number, "answer": answer, "options": this.shuffleArray(data)  } 
  }

  
  handleSuccess() {
    console.log("SUCCESS")
    this.flashGreen()
    this.startGame()
  }
  
  handleFailure() {
    console.log("FAIL")
    this.flashRed()
  }
  
  flashGreen() {
    document.body.style.backgroundColor = "green";
    setTimeout(function(){ document.body.style.backgroundColor = "black"; }, 200 )
  }
  
  flashRed() {
    document.body.style.backgroundColor = "red";
    setTimeout(function(){ document.body.style.backgroundColor = "black"; }, 200 )
  }
  startGame() {
    
    var data = this.generateNumbers()
    
    ReactDOM.render(
      <Numberbond numberbond={data["number"]}
          answerA={data["options"][0]["option"]} handlerA={data["options"][0]["handler"]}
          answerB={data["options"][1]["option"]} handlerB={data["options"][1]["handler"]}
          answerC={data["options"][2]["option"]} handlerC={data["options"][2]["handler"]} />,
      document.getElementById("root")
    )
  }
  
  
  
  
  
  render() {
    return (
      <div className="App">
        <StartMessage onButtonClick={this.startGame} />
     </div>
    );
  }
}

export default App;
