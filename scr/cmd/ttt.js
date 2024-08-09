module.exports = {
  config: {
    name: "ttt",
    description: "Play Tic-Tac-Toe with AI",
    usage: "[random/x/o]",
    cooldown: 5,
    accessableby: 0,
    category: "game-sp",
    prefix: false,
    author: "heru",
  },
  start: async function({ api, event, text, reply }) {
    let AIMove;

    function startBoard({ isX, data }) {
      data.board = Array(3).fill(null).map(() => Array(3).fill(0));
      data.isX = isX;
      data.gameOn = true;
      data.gameOver = false;
      return data;
    }

    function displayBoard(data) {
      let msg = "\n";
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let temp = data.board[i][j].toString();
          if (temp == "0") msg += "[  ]  ";
          else if (temp == "1") msg += (data.isX ? "[X]  " : "[O]  ");
          else msg += (data.isX ? "[O]  " : "[X]  ");
        }
        msg += "\n";
      }
      return msg;
    }

    function checkAIWon(data) {
      const b = data.board;
      const winPatterns = [
        [b[0][0], b[1][1], b[2][2]],
        [b[0][2], b[1][1], b[2][0]],
        [b[0][0], b[0][1], b[0][2]],
        [b[1][0], b[1][1], b[1][2]],
        [b[2][0], b[2][1], b[2][2]],
        [b[0][0], b[1][0], b[2][0]],
        [b[0][1], b[1][1], b[2][1]],
        [b[0][2], b[1][2], b[2][2]],
      ];
      return winPatterns.some(pattern => pattern.every(cell => cell === 1));
    }

    function checkPlayerWon(data) {
      const b = data.board;
      const winPatterns = [
        [b[0][0], b[1][1], b[2][2]],
        [b[0][2], b[1][1], b[2][0]],
        [b[0][0], b[0][1], b[0][2]],
        [b[1][0], b[1][1], b[1][2]],
        [b[2][0], b[2][1], b[2][2]],
        [b[0][0], b[1][0], b[2][0]],
        [b[0][1], b[1][1], b[2][1]],
        [b[0][2], b[1][2], b[2][2]],
      ];
      return winPatterns.some(pattern => pattern.every(cell => cell === 2));
    }

    function solveAIMove({ depth, turn, data }) {
      if (checkAIWon(data)) return 1;
      if (checkPlayerWon(data)) return -1;
      let availableMoves = getAvailable(data);
      if (availableMoves.length === 0) return 0;

      let bestScore = turn === 1 ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

      for (let point of availableMoves) {
        placeMove({ point, player: turn, data });
        let score = solveAIMove({ depth: depth + 1, turn: 3 - turn, data });
        data.board[point[0]][point[1]] = 0;

        if (turn === 1) {
          if (score > bestScore) {
            bestScore = score;
            if (depth === 0) AIMove = point;
          }
        } else {
          if (score < bestScore) bestScore = score;
        }
      }

      return bestScore;
    }

    function placeMove({ point, player, data }) {
      data.board[point[0]][point[1]] = player;
    }

    function getAvailable(data) {
      let availableMoves = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (data.board[i][j] === 0) availableMoves.push([i, j]);
        }
      }
      return availableMoves;
    }

    function move(x, y, data) {
      if (checkGameOver(data)) return "game over";
      let availableMoves = getAvailable(data);
      let playerMove = [x, y];
      if (availableMoves.some(move => move.toString() === playerMove.toString())) {
        placeMove({ point: playerMove, player: 2, data });
      } else return "Spot not available";

      if (checkGameOver(data)) return "game over!";
      solveAIMove({ depth: 0, turn: 1, data });
      placeMove({ point: AIMove, player: 1, data });
    }

    function checkGameOver(data) {
      return getAvailable(data).length === 0 || checkAIWon(data) || checkPlayerWon(data);
    }

    function AIStart(data) {
      let point = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
      placeMove({ point, player: 1, data });
    }

    if (!global.moduleData.tictactoe) global.moduleData.tictactoe = new Map();
    let { threadID, messageID, senderID } = event;
    let data = global.moduleData.tictactoe.get(threadID);
    if (!data || !data.gameOn) return;

    if (text === "show") return reply(displayBoard(data));

    if (data.player !== senderID) return;

    if (text.length > 0 && /^[0-2]{2}$/.test(text)) {
      let row = parseInt(text[0]);
      let col = parseInt(text[1]);
      let result = move(row, col, data);
      reply(result || displayBoard(data));

      if (checkGameOver(data)) {
        if (checkAIWon(data)) reply("AI has won!");
        else if (checkPlayerWon(data)) reply("Player has won!");
        else reply("It's a draw!");
        global.moduleData.tictactoe.delete(threadID);
      }
    }
  },
  run: async function({ api, event, args }) {
    if (!global.moduleData.tictactoe) global.moduleData.tictactoe = new Map();
    let { threadID, messageID, senderID } = event;
    let data = global.moduleData.tictactoe.get(threadID) || { gameOn: false, player: "" };
    let newData;

    if (!data.gameOn) {
      switch (args[0]) {
        case "random":
          if (Math.random() > 0.5) {
            newData = startBoard({ isX: true, data });
            data.player = senderID;
            global.moduleData.tictactoe.set(threadID, newData);
            api.sendMessage("You go first, X", threadID, messageID);
            api.sendMessage(displayBoard(newData), threadID, messageID);
          } else {
            newData = startBoard({ isX: false, data });
            data.player = senderID;
            AIStart(newData);
            global.moduleData.tictactoe.set(threadID, newData);
            api.sendMessage("AI goes first, O", threadID, messageID);
            api.sendMessage(displayBoard(newData), threadID, messageID);
          }
          break;
        case "x":
          newData = startBoard({ isX: true, data });
          data.player = senderID;
          global.moduleData.tictactoe.set(threadID, newData);
          api.sendMessage("You go first, X", threadID, messageID);
          api.sendMessage(displayBoard(newData), threadID, messageID);
          break;
        case "o":
          newData = startBoard({ isX: false, data });
          data.player = senderID;
          AIStart(newData);
          global.moduleData.tictactoe.set(threadID, newData);
          api.sendMessage("AI goes first, O", threadID, messageID);
          api.sendMessage(displayBoard(newData), threadID, messageID);
          break;
        default:
          api.sendMessage("Invalid command. Use 'random', 'x', or 'o' to start.", threadID, messageID);
          break;
      }
    } else {
      api.sendMessage("Game is already in progress. Finish the current game first.", threadID, messageID);
    }
  }
};
      
