import { useState } from 'react'
import './App.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState(null)
  const [moveHistory, setMoveHistory] = useState([])

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] }
      }
    }
    return null
  }

  const handleClick = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    
    const result = calculateWinner(newBoard)
    if (result) {
      setWinner(result.winner)
    }
    
    setMoveHistory([...moveHistory, { player: isXNext ? 'X' : 'O', position: index }])
    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setMoveHistory([])
  }

  const isBoardFull = board.every(square => square !== null)
  const currentPlayer = isXNext ? 'X' : 'O'
  const winnerInfo = calculateWinner(board)
  const isGameOver = !!winnerInfo || isBoardFull

  return (
    <div className="container">
      <h1>⭕ Tic Tac Toe</h1>

      <div className="game-status">
        {winnerInfo ? (
          <p className="winner-text">🎉 Player {winnerInfo.winner} Wins! 🎉</p>
        ) : isBoardFull ? (
          <p className="draw-text">🤝 It's a Draw!</p>
        ) : (
          <p className="current-player">Current Player: <span>{currentPlayer}</span></p>
        )}
      </div>

      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`square ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''} ${
              winnerInfo && winnerInfo.line.includes(index) ? 'winner' : ''
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      <button onClick={resetGame} className="reset-btn">
        {isGameOver ? 'Play Again' : 'Reset Game'}
      </button>

      {moveHistory.length > 0 && (
        <div className="move-history">
          <h3>Move History</h3>
          <div className="moves">
            {moveHistory.map((move, index) => (
              <span key={index} className={`move ${move.player === 'X' ? 'move-x' : 'move-o'}`}>
                Move {index + 1}: {move.player} at {move.position + 1}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="instructions">
        <h3>How to Play</h3>
        <ul>
          <li>Players take turns marking spaces on the 3×3 grid</li>
          <li>The player who succeeds in placing three marks in a row (horizontally, vertically, or diagonally) wins</li>
          <li>If all 9 squares are filled with no winner, the game is a draw</li>
        </ul>
      </div>
    </div>
  )
}

export default App
