import React, { useState } from 'react'
import { useTicTacToe } from '../hooks/useTicTacToe'

export const TicTacToe = ({ boardSize = 3 }) => {

  const {
    board,
    resetGame,
    onClickCell,
    getStatus
  } = useTicTacToe(boardSize);

  return (
    <div className='game' style={{ "--board-size": boardSize }}>
      <div className='status'>
        <p>{getStatus()}</p>
        <button onClick={resetGame}> Reset Game </button>
      </div>
      <div className="board">
        {board.map((b, index) => {
          return (
            <button className="cell" key={index} onClick={() => onClickCell(index)} disabled={!!b}>
              {b}
            </button>
          )
        })}
      </div>
    </div>
  )
}
