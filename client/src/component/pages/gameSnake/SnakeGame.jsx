// import Snake from 'react-simple-snake'
import { useState } from "react";
import { SnakeGame } from "react-game-snake";
import { useHistory } from "react-router-dom";

export default function Game({ setIsCanBuy }) {
  const [gameStatues, setGameStatues] = useState(true);
  const history = useHistory();

  async function playGame() {
    setGameStatues(false);

    console.log("gameOver");
  }

  const upDateScore = (scrollUpDate) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "content-length": "355",
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        scrollUpDate: scrollUpDate,
      }),
    };

    fetch("http://localhost:8080/upDateScore", requestOptions)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const afterGame = async (context) => {
    fetch("http://localhost:8080/getScore")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.at(0).gameSnakeScore < context.game.points) {
          playGame();
          alert(
            `You broke record points with  ${context.game.points} you could purchase a location on the map.`
          );
          setIsCanBuy(true);
          upDateScore(context.game.points);
          history.push("/");
        } else if (result.at(0).gameSnakeScore >= context.game.points) {
          alert(
            ` Your score is ${context.game.points} and you need ${
              result.at(0).gameSnakeScore
            } points to break a record and buy a location on the map`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <button
        style={{
          backgroundColor: "red",
          color: "white",
          borderStyle: "inset",
          float: "right",
          width: "12%",
          fontSize: "large",
          marginTop: "-2%",
        }}
        onClick={() => {
          playGame().then(() => {
            history.push("/");
          });
        }}
      >
        Go to Map
      </button>
      <p
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "large",
          fontStyle: "oblique",
        }}
      >
        P will pause the game and will start the game.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SnakeGame
          colors={{
            field: "#ebe9ed",
            food: "red",
            snake: "#3498db",
          }}
          countOfHorizontalFields={23}
          countOfVerticalFields={23}
          fieldSize={26}
          loopTime={70}
          pauseAllowed={gameStatues}
          restartAllowed={false}
          onLoose={(context) => afterGame(context)}
          onPause={() => alert("paused")}
          onRestart={() => alert("restarted")}
          onResume={() => alert("start")}
          onWin={(context) => afterGame(context)}
        />
      </div>
    </>
  );
}
