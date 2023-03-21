function ResetButton({ resetBoard }) {
  return <button onClick={resetBoard}>Reset</button>;
}

// This can be done in a parametric manner but it's not the point of this practice project
function findWinner(board) {
  // find winner in diameters
  let candidate = board[1][1];
  if (
    (candidate === board[0][0] &&
      candidate === board[2][2] &&
      candidate !== "") ||
    (candidate === board[0][2] && candidate === board[2][0] && candidate !== "")
  )
    return candidate;

  for (let i = 0; i < 3; i++) {
    // find winner in rows
    candidate = board[i][0];
    if (
      candidate === board[i][1] &&
      candidate === board[i][2] &&
      candidate !== ""
    )
      return candidate;

    // find winner in columns
    candidate = board[0][i];
    if (
      candidate === board[1][i] &&
      candidate === board[2][i] &&
      candidate !== ""
    )
      return candidate;
  }
  return "-";
}

export { ResetButton, findWinner };
