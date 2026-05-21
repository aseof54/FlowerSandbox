import React, { useState, useEffect } from 'react'
import GridCell from './GridCell'

const Board = () => {
  const [board, setBoard] = useState(() => {
    return Array.from({ length: 10 }, (_, rowIndex) =>
      Array.from({ length: 10 }, (_, cellIndex) => {
        return rowIndex === 5 && cellIndex === 5 ? true : false
      })
    )
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setBoard((currentBoard) => {
        const nextBoard = currentBoard.map((row) => [...row])
        let hasChanges = false

        for (let r = 0; r < 10; r++) {
          for (let c = 0; c < 10; c++) {
            if (currentBoard[r][c] === true) {
              for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                  if (dr === 0 && dc === 0) continue

                  const neighborRow = r + dr
                  const neighborCell = c + dc

                  if (
                    neighborRow >= 0 && neighborRow < 10 &&
                    neighborCell >= 0 && neighborCell < 10
                  ) {
                    if (currentBoard[neighborRow][neighborCell] === false) {
                      nextBoard[neighborRow][neighborCell] = true
                      hasChanges = true
                    }
                  }
                }
              }
            }
          }
        }
        return hasChanges ? nextBoard : currentBoard
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const handleCellClick = (clickedRow, clickedCell) => {
    setBoard((currentBoard) => {
      const nextBoard = currentBoard.map((row) => [...row]);
      nextBoard[clickedRow][clickedCell] = !nextBoard[clickedRow][clickedCell];
      return nextBoard;
    });
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          return (
            <GridCell 
              key={`${rowIndex}-${cellIndex}`} 
              state={cell}
              onClick={() => handleCellClick(rowIndex, cellIndex)} 
            />
          )
        })
      })}
    </div>
  )
}

export default Board