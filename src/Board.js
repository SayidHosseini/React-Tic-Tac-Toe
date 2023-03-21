import { useState } from "react";
import { ResetButton, findWinner } from "./Control";

export default function Board() {
  const initialState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [board, setBoard] = useState(initialState);
  const [turn, setTurn] = useState("X");
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState("-");
  const [gameOver, setGameOver] = useState(false);

  function resetBoard() {
    setBoard(initialState);
    setMoves(0);
    setTurn("X");
    setWinner("-");
    setGameOver(false);
  }

  function changeTurn() {
    setMoves(moves + 1);
    if (moves < 8) {
      setTurn(turn === "X" ? "O" : "X");
      return;
    }

    // To handle game over when all tiles are filled and there is no winner
    setGameOver(true);
  }

  function gameOverCheck() {
    // This are actually 5 but reading state right after changing it returns old value
    if (gameOver || moves < 4) return;

    const possibleWinner = findWinner(board);
    if (["X", "O"].includes(possibleWinner)) {
      setWinner(possibleWinner);
      setGameOver(true);
    }
  }

  const play = (rIndex, cIndex) => () => {
    if (gameOver || board[rIndex][cIndex] !== "") return;

    changeTurn();
    let newBoard = board;
    newBoard[rIndex][cIndex] = turn;
    setBoard(newBoard);
    gameOverCheck();
  };

  const boardCells = board.map((row, rIndex) => (
    <tr key={rIndex}>
      {row.map((col, cIndex) => (
        <td key={cIndex} className="texts" onClick={play(rIndex, cIndex)}>
          {col}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="boardFrame">
      <div className="texts" hidden={gameOver}>
        Turn: {turn}
      </div>
      <div className="texts" hidden={!gameOver}>
        Winner: {winner}
      </div>
      <table>
        <tbody>{boardCells}</tbody>
      </table>
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}
