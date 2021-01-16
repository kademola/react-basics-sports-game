class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: 0,
      score: 0,
    };

    this.shotSound = new Audio("./assets/audio/bball+crowd.wav");
    this.scoreSound = new Audio("./assets/audio/basket.wav");
  }

  shotHandler = () => {
    let score = this.state.score;
    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;
      setTimeout(() => {
        this.scoreSound.play();
      }, 8500);
    }

    this.setState((state, props) => ({
      shots: state.shots + 1,
      score,
    }));
  };

  render() {
    let shotPercentageDiv;

    if (this.state.shots) {
      let shotPercentage = Math.round(
        (this.state.score / this.state.shots) * 100
      );
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: {shotPercentage}</strong>
        </div>
      );
    }

    return (
      <div className="Team">
        <h2>{this.props.name}</h2>

        <div className="identity">
          <img src={this.props.logo} alt={this.props.name} />
        </div>

        <div>
          <strong>Shots:</strong>
          {this.state.shots}
        </div>

        <div>
          <strong>Score:</strong>
          {this.state.score}
        </div>

        {shotPercentageDiv}

        <button onClick={this.shotHandler}>Shoot!</button>
      </div>
    );
  }
}

function ScoreBoard(props) {
  return <div className="ScoreBoard">ScoreBoard</div>;
}

function Game(props) {
  return (
    <div className="Game">
      <h1>Welcome to {props.venue}</h1>
      <div className="stats">
        <Team
          name={props.visitingTeam.name}
          logo={props.visitingTeam.logoSrc}
        />

        <div className="versus">
          <h1>VS</h1>
        </div>

        <Team name={props.homeTeam.name} logo={props.homeTeam.logoSrc} />
      </div>
    </div>
  );
}

function App(props) {
  let warriors = {
    name: "Golden State Warriors",
    logoSrc: "./assets/images/gsw.png",
  };

  let nets = {
    name: "Brooklyn Nets",
    logoSrc: "./assets/images/nets.png",
  };

  let lakers = {
    name: "Los Angeles Lakers",
    logoSrc: "./assets/images/lakers.png",
  };

  let bucks = {
    name: "Milwauke Bucks",
    logoSrc: "./assets/images/bucks.png",
  };
  return (
    <div className="App">
      <Game venue="Chase Center" homeTeam={warriors} visitingTeam={nets} />
      <Game venue="Staples Center" homeTeam={lakers} visitingTeam={bucks} />
    </div>
  );
}

// Render the App
ReactDOM.render(<App />, document.getElementById("root"));
