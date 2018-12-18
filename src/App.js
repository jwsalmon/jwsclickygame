import React, { Component } from "react";
import Card from "./components/Card";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import cars from "./cards.json";
import "./App.css";

function shuffleCars(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // Set this.state
  state = {
    cars,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: "Great Click!"
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "You win!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "Sorry Start Over! ",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledCars = shuffleCars(cars);
    this.setState({ cars: shuffledCars });
  };

  render() {
    return (
      <div>
      <Wrapper>
        <Nav
          title="Cars Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong}
        />

        <Title>
          Try to click on each car, but don't hit any duplicates!
        </Title>

        <Container>
          <Row>
            {this.state.cars.map(cars => (
              <Column size="md-3 sm-6">
                <Card
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={cars.id}
                  image={cars.image}
                  key={cars.id}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
      <footer>
       <p>Designed and built by Jesse Salmon. You can find the code<a href="https://github.com/jwsalmon/jwsclickygame.git" target="_blank" rel="noopener noreferrer"> here</a>.</p>
      </footer>
    </div>
    );
  }
}

export default App;