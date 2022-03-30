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
        return true;
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
    return position < this.field.length && !this.field[position];
  }

  getPlayer(playerIdx) {
    return this.players[playerIdx];
  }
}

const isPlayerOneFirst = true;
const playerOne = { name: "Alex" };
const playerTwo = { name: "Also Alex" };
/*
Тернарный оператор работает как if...else.
Сначала идёт условие, потом через "?" результат, если условие истинно и через  ":" результат если ложно
*/
const game = isPlayerOneFirst
  ? new TicTacToe(playerOne, playerTwo)
  : new TicTacToe(playerTwo, playerOne);
const gameTurns = [2, 1, 4, 0, 6];

try {
  for (let i = 0; i < gameTurns.length; i++) {
    game.makeMove(i % 2, gameTurns[i]);

    if (game.checkIsWin(i % 2)) {
      const winner = game.getPlayer(i % 2).info === playerOne ? "one" : "two";

      /*
           Шаблонная строка.
           Позволяет не делать постоянную конкатенацию строк, 
            если нужно добавить в строку значение переменной
           Делается с помощью ``-кавычек, в ${} записывается имя переменной, 
            значение которой нужно подставить
           */
      console.log(`Player ${winner} win`);

      break;
    }
  }
} catch (exc) {
  if (exc instanceof Error) {
    console.log(exc.message);
  } else {
    console.log(exc);
  }
}
