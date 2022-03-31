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
        return true;
      }
    }

    const countMovies = this.addCountMovies();
    if (countMovies >= 9) {
      alert("Game over!");
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
const playerOne = { name: "Alex" };
const playerTwo = { name: "Also Alex" };
/*
Тернарный оператор работает как if...else.
Сначала идёт условие, потом через "?" результат, если условие истинно и через  ":" результат если ложно
*/
let game = isPlayerOneFirst
  ? new TicTacToe(playerOne, playerTwo)
  : new TicTacToe(playerTwo, playerOne);

const cross = document.getElementById("cross");
const circle = document.getElementById("circle");
const gameField = document.getElementsByClassName("game-field");
const btnReset = document.getElementsByClassName("reset-button");

const makeBgColor = (arr) => {
  arr.forEach((element) => {
    const winField = document.getElementById(`${element}`);
    winField.className = "game-field_cell game-field_cell_win";
  });
};

try {
  Array.from(gameField, (element) => {
    element.addEventListener("click", (e) => {
      if (e.target.childNodes.length === 0) {
        const position = Number(e.target.id);
        const playerIdx = isPlayerOneFirst ? 0 : 1;

        game.makeMove(playerIdx, position);

        const div = document.createElement("div");
        div.innerHTML = isPlayerOneFirst ? "X" : " O";
        e.target.append(div);

        if (game.checkIsWin(playerIdx)) {
          const winner =
            game.getPlayer(playerIdx).info === playerOne
              ? playerOne.name
              : playerTwo.name;

          makeBgColor(game.winPosition);

          /*
               Шаблонная строка.
               Позволяет не делать постоянную конкатенацию строк, 
                если нужно добавить в строку значение переменной
               Делается с помощью ``-кавычек, в ${} записывается имя переменной, 
                значение которой нужно подставить
               */

          const divCongratulation = document.getElementById("congratulation");
          divCongratulation.innerHTML = `<span>Player ${winner} win!</span>`;
          // alert(`Player ${winner} win!`);
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
    element.addEventListener("click", (e) => {
      game = isPlayerOneFirst
        ? new TicTacToe(playerOne, playerTwo)
        : new TicTacToe(playerTwo, playerOne);

      Array.from(gameField, (element) => {
        element.innerHTML = `<div class="game-field_cell" id="0"></div>
        <div class="game-field_cell" id="1"></div>
        <div class="game-field_cell" id="2"></div>
        <div class="game-field_cell" id="3"></div>
        <div class="game-field_cell" id="4"></div>
        <div class="game-field_cell" id="5"></div>
        <div class="game-field_cell" id="6"></div>
        <div class="game-field_cell" id="7"></div>
        <div class="game-field_cell" id="8"></div>`;
      });

      const divCongratulation = document.getElementById("congratulation");
      divCongratulation.innerHTML = "";
    });
  });
} catch (exc) {
  throw Error(exc);
}
