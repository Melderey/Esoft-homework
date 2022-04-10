import { CROSS, CIRCLE, GAME_RESET } from "./constants.js";

/*
0 | 1 | 2
--+---+--
3 | 4 | 5
--+---+--
6 | 7 | 8
*/
class TicTacToe {
  static winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  field = [null, null, null, null, null, null, null, null, null];
  players = [];
  winPosition = [];
  countMovies = 0;
  isGameWin = false;

  constructor(playerOneInfo, playerTwoInfo) {
    this.players = [
      { info: playerOneInfo, symbol: "X" },
      { info: playerTwoInfo, symbol: "O" },
    ];
  }

  checkIsWin(playerIdx) {
    for (const winPosition of TicTacToe.winPositions) {
      let isWin = true;

      for (const cell of winPosition) {
        isWin = isWin && this.field[cell] === this.players[playerIdx].symbol;
      }

      if (isWin) {
        this.setWinPosition(winPosition);
        this.isGameWin = true;
        return true;
      }
    }

    const countMovies = this.addCountMovies();
    if (countMovies >= 9) {
      divCongratulation.innerHTML = `<span class="game-over-color">Game over!</span>`;

      for (let i = 0; i < 9; i += 1) {
        const gameOverField = document.getElementById(`${i}`);
        gameOverField.className = "game-field_cell game-over-bg";
      }
    }

    return false;
  }

  makeMove(playerIdx, position) {
    if (!this.isPossibleMove(position)) {
      throw new Error("Illegal move");
    }

    this.field[position] = this.players[playerIdx].symbol;
  }

  isPossibleMove(position) {
    return !this.field[position];
  }

  getPlayer(playerIdx) {
    return this.players[playerIdx];
  }

  addCountMovies() {
    return (this.countMovies += 1);
  }

  setWinPosition(winPosition) {
    this.winPosition = winPosition;
  }
}

let isPlayerOneFirst = true;
const playerOne = { name: "Ёжик" };
const playerTwo = { name: "Крош" };

let game = isPlayerOneFirst
  ? new TicTacToe(playerOne, playerTwo)
  : new TicTacToe(playerTwo, playerOne);

const gameField = document.getElementsByClassName("game-field");
const btnReset = document.getElementsByClassName("reset-button");
const divCongratulation = document.getElementById("congratulation");

const makeBgColor = (arr) => {
  arr.forEach((element) => {
    const winField = document.getElementById(`${element}`);
    winField.className = "game-field_cell game-field_cell_win";
  });
};

try {
  Array.from(gameField, (element) => {
    element.addEventListener("click", function handleClick(e) {
      if (game.isGameWin) {
        return;
      }

      if (e.target.childNodes.length === 0) {
        const position = Number(e.target.id);
        const playerIdx = isPlayerOneFirst ? 0 : 1;

        game.makeMove(playerIdx, position);

        const div = document.createElement("div");
        div.innerHTML = isPlayerOneFirst ? CROSS : CIRCLE;
        e.target.append(div);

        if (game.checkIsWin(playerIdx)) {
          const winner =
            game.getPlayer(playerIdx).info === playerOne
              ? playerOne.name
              : playerTwo.name;

          makeBgColor(game.winPosition);

          divCongratulation.innerHTML = `<span>Player ${winner} win!</span>`;
        }

        isPlayerOneFirst = !isPlayerOneFirst;
      }
    });
  });
} catch (exc) {
  if (exc instanceof Error) {
    console.log(exc.message);
  } else {
    console.log(exc);
  }
}

try {
  Array.from(btnReset, (element) => {
    element.addEventListener("click", () => {
      game = isPlayerOneFirst
        ? new TicTacToe(playerOne, playerTwo)
        : new TicTacToe(playerTwo, playerOne);

      Array.from(gameField, (element) => {
        element.innerHTML = GAME_RESET;
      });

      divCongratulation.innerHTML = "";
    });
  });
} catch (exc) {
  throw Error(exc);
}
