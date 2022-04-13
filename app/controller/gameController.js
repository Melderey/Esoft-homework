const fs = require("fs");
const fileName = "./app/files/gamesResult.txt";

exports.finishGame = function finishGame(req, res) {
  const body = req.body;
  const gameResultFile = fs.readFileSync(fileName).toString();
  let gameNumber;
  if (gameResultFile.length - 1 < 0) {
    gameNumber = 1;
  } else {
    gameNumber = gameResultFile.split("\n").length;
  }
  fs.appendFile(
    fileName,
    JSON.stringify({
      id: gameNumber,
      winnerId: body.winnerId,
      loserId: body.loserId,
    }) + "\n",
    (err) => {
      if (err) throw err;
      console.log(`Game № ${gameNumber} saved!`);
      res.send({
        id: gameNumber,
      });
    }
  );
};

exports.gamesResult = function (req, res) {
  const resultFileArray = fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .filter((el) => el !== "");
  res.send(
    resultFileArray.map((row) => {
      if (row !== "") {
        return JSON.parse(row);
      }
    })
  );
};

// добавил POST запрос с ID игрока {"userId": 1}
// в ответ конфигурирется объект с его игровой статистикой
// {
//   "userId": 1,
//   "gamesLost": 5,
//   "gamesWon": 2,
//   "gamesTotal": 7
// }

exports.getGameStatistics = function (req, res) {
  const { userId } = req.body;
  const userStatistics = { userId, gamesLost: 0, gamesWon: 0, gamesTotal: 0 };

  const resultFileArray = fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .map((row) => {
      if (row !== "") {
        return JSON.parse(row);
      }
    });

  const getUserStatistics = (userId) => {
    resultFileArray.map(({ winnerId, loserId }) => {
      if (winnerId === userId) {
        userStatistics.gamesWon += 1;
      }

      if (loserId === userId) {
        userStatistics.gamesLost += 1;
      }
    });
    userStatistics.gamesTotal =
      userStatistics.gamesLost + userStatistics.gamesWon;
  };

  getUserStatistics(userId);

  res.send(userStatistics);
};
