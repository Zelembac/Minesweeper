import React, { useState } from "react";
function Game() {
  const [board, setBoard] = useState(defaultBoard);

  const handleClick = (event, i, j) => {
    if (event.target.innerText === "10") {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (document.getElementById(`${i},${j}`).textContent === "10") {
            document.getElementById(`${i},${j}`).classList.add("active");
          }
        }
      }

      alert("You Lost");
    }

    event.currentTarget.classList.add("active");

    // function provera3(i, j) {
    //   if (i - 1 >= 0) {
    //     provera1(i - 1, j);
    //   }
    //   if (j - 1 >= 0) {
    //     provera1(i, j - 1);
    //   }
    //   if (j + 1 <= 8) {
    //     provera1(i, j + 1);
    //   }

    //   if (i + 1 <= 8) {
    //     provera1(i + 1, j);
    //   }
    // }
    function fillBlank(i, j) {
      if (i - 1 >= 0) {
        if (j - 1 >= 0) {
          clickBlank(i - 1, j - 1);
        }

        clickBlank(i - 1, j);
        if (j + 1 <= 8) {
          clickBlank(i - 1, j + 1);
        }
      }
      if (j - 1 >= 0) {
        clickBlank(i, j - 1);
      }
      if (j + 1 <= 8) {
        clickBlank(i, j + 1);
      }

      if (i + 1 <= 8) {
        if (j + 1 <= 8) {
          clickBlank(i + 1, j + 1);
        }

        clickBlank(i + 1, j);
        if (j - 1 >= 0) {
          clickBlank(i + 1, j - 1);
        }
      }
    }
    function clickBlank(i, j) {
      if (board[i][j][0] === null) {
        if (document.getElementById(`${i},${j}`).classList[1] !== "active") {
          document.getElementById(`${i},${j}`).classList.add("active");
          fillBlank(i, j);
        }
      }
      document.getElementById(`${i},${j}`).classList.add("active");
    }
    if (board[i][j][0] === null) {
      fillBlank(i, j);
    }
    let br = 0;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (document.getElementById(`${i},${j}`).classList[1] !== "active") {
          br++;
        }
      }
    }
    if (br === 10) {
      alert("You won");
    }
  };
  const restart = () => {
    let newBoard = [
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
    ];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        document.getElementById(`${i},${j}`).classList.remove("active");
      }
    }

    setBoard(newBoard);
  };

  const start = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        document.getElementById(`${i},${j}`).classList.remove("active");
      }
    }
    let newBoard = [
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
      [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
    ];

    function provera(x, y) {
      if (newBoard[x][y] !== 10) {
        if (newBoard[x][y] >= 1) {
          newBoard[x][y] += 1;
        } else {
          newBoard[x][y] = 1;
        }
      }
    }
    for (let i = 0; i < 10; i++) {
      let xRandom = Math.floor(Math.random() * 8);
      let yRandom = Math.floor(Math.random() * 8);

      if (newBoard[xRandom][yRandom][0] === null) {
        newBoard[xRandom][yRandom] = 10;
      } else {
        i--;
      }
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (newBoard[i][j] === 10) {
          if (i - 1 >= 0) {
            if (j - 1 >= 0) {
              provera(i - 1, j - 1);
            }

            provera(i - 1, j);

            provera(i - 1, j + 1);
          }

          provera(i, j - 1);

          provera(i, j + 1);
          if (i + 1 <= 8) {
            if (j + 1 <= 8) {
              provera(i + 1, j + 1);
            }

            provera(i + 1, j);

            provera(i + 1, j - 1);
          }
        }
      }
    }

    setBoard(newBoard);
  };

  return (
    <div id="body">
      <header>
        <h1>Minesweeper</h1>
      </header>
      <div id="board">
        {board.map((column, i) => {
          return (
            <div key={i} className="boardRow">
              {column.map((element, j) => {
                return (
                  <div
                    key={i + "," + j}
                    className="fieldElement"
                    id={i + "," + j}
                    onClick={(event) => handleClick(event, i, j)}
                  >
                    {element}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="buttonBox">
        <button onClick={start}>Start</button>
        <button onClick={restart}>Restart</button>
      </div>
      <footer>by Lazar Djurkovic</footer>
    </div>
  );
}

export default Game;
const defaultBoard = [
  [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
  [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
  [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
  [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
  [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
  [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
  [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
  [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
  [[null], [null], [null], [null], [null], [null], [null], [null], [null]],
];
