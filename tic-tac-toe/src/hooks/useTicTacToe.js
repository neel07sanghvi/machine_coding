import { useState } from "react"

const initialBoard = (boardSize) => Array(boardSize * boardSize).fill(null);

export function useTicTacToe(boardSize) {
  const [board, setBoard] = useState(initialBoard(boardSize))
  const [isXTurn, setIsXTurn] = useState(true)

  const generateWinningPatterns = () => {
    const patterns = []

    for (let i = 0; i < boardSize; i++) {
      const horizontalPatterns = []
      const verticalPatterns = []

      for (let j = 0; j < boardSize; j++) {
        horizontalPatterns.push(i * boardSize + j);
        verticalPatterns.push(j * boardSize + i);
      }

      patterns.push(horizontalPatterns, verticalPatterns);
    }

    const diagonalPattern1 = [];
    const diagonalPattern2 = [];

    for (let i = 0; i < boardSize; i++) {
      diagonalPattern1.push(i * (boardSize + 1));
      diagonalPattern2.push((i + 1) * (boardSize - 1))
    }

    patterns.push(diagonalPattern1, diagonalPattern2);

    return patterns;
  }

  const WINNING_PATTERNS = generateWinningPatterns();

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const pattern = WINNING_PATTERNS[i];
      let xCount = 0;
      let oCount = 0;

      for (let j = 0; j < pattern.length; j++) {
        const idx = pattern[j];
        if (currentBoard[idx] === 'X') {
          xCount++;
        } else if (currentBoard[idx] === 'O') {
          oCount++;
        }
      }

      if (xCount === boardSize) {
        return 'X';
      } else if (oCount === boardSize) {
        return 'O';
      }
    }

    return null;
  };


  const resetGame = () => {
    setBoard(initialBoard(boardSize))
    setIsXTurn(true)
  }

  const onClickCell = (index) => {
    const newBoard = [...board];

    if (newBoard[index] || calculateWinner(board)) {
      return;
    }

    newBoard[index] = isXTurn ? 'X' : 'O';

    setBoard(newBoard)
    setIsXTurn(!isXTurn)
  }

  const getStatus = () => {
    const winner = calculateWinner(board);

    if (winner) {
      return `Player ${winner} wins!`
    }

    if (!board.includes(null)) {
      return 'It\'s a draw!'
    }

    return `Player ${isXTurn ? 'X' : 'O'}'s turn`
  }

  return {
    board,
    resetGame,
    onClickCell,
    getStatus
  }
}