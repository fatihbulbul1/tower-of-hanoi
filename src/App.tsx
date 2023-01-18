import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedTower, setSelectedTower] = useState<number | undefined>();
  const blocks = [
    { blockNo: 0, blockWidth: 20, color: "#e01b25" },
    { blockNo: 1, blockWidth: 40, color: "#c79c25" },
    { blockNo: 2, blockWidth: 60, color: "#7cfae6" },
    { blockNo: 3, blockWidth: 80, color: "#00cf00" },
    { blockNo: 4, blockWidth: 100, color: "#8d3b9d" },
  ];
  const [towers, setTowers] = useState([
    [blocks[4], blocks[3], blocks[2], blocks[1], blocks[0]],
    [],
    [],
  ]);
  const checkGameOver = () => {
    if (towers[2].length === 5) setGameOver(true);
  };
  const handleTowerClick = (towerId: number) => {
    if (gameOver) return;
    if (selectedTower !== undefined) {
      if (towers[selectedTower!].length == 0) {
        setSelectedTower(undefined);
        return;
      }
      const newTowers = [...towers];
      if (
        newTowers[towerId].length == 0 ||
        newTowers[selectedTower][newTowers[selectedTower].length - 1]
          .blockWidth <
          newTowers[towerId][newTowers[towerId].length - 1].blockWidth
      ) {
        const popped = newTowers[selectedTower].pop()!;
        newTowers[towerId].push(popped);
        setScore(score + 1);
        setTowers(newTowers);
      }
      setSelectedTower(undefined);
      checkGameOver();
    } else {
      setSelectedTower(towerId);
    }
  };
  return (
    <div className="App">
      {gameOver ? (
        <p className="game-over">GAME OVER! Score: {score}</p>
      ) : (
        <p style={{ fontSize: "2em" }}>Score: {score}</p>
      )}
      <div className="towers">
        {towers.map((tower, towerId) => {
          return (
            <div onClick={() => handleTowerClick(towerId)} className="tower">
              <div
                className={
                  towerId === selectedTower
                    ? "tower-container selected"
                    : "tower-container"
                }
              >
                {tower.map((disc) => {
                  return (
                    <div
                      style={{
                        width: disc.blockWidth + "px",
                        backgroundColor: disc.color,
                      }}
                      className="disc"
                    ></div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
