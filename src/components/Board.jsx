

import React, { useState, useEffect } from 'react'
import GridCell from './GridCell'

const colors = ["white","red","darkorange","yellow","lightgreen","green","cyan","blue","indigo","magenta"]

const Board = () => {

  const [board, setBoard] = useState(() => {
    return Array.from({ length: 10 }, (_, rowIndex) =>
      Array.from({ length: 10 }, (_, cellIndex) => {

        if (rowIndex === 5 && cellIndex === 5) {
          return { isActive: true, color: "white" } 
        }
        return { isActive: false, color: null }
      })
    )
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setBoard((currentBoard) => {

        const nextBoard = currentBoard.map((row) => row.map(cell => ({ ...cell })))
        let hasChanges = false

        for (let r = 0; r < 10; r++) {
          for (let c = 0; c < 10; c++) {

            if (currentBoard[r][c].isActive === true) {
              for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                  if (dr === 0 && dc === 0) continue

                  const neighborRow = r + dr
                  const neighborCell = c + dc

                  if (
                    neighborRow >= 0 && neighborRow < 10 &&
                    neighborCell >= 0 && neighborCell < 10
                  ) {

                    if (nextBoard[neighborRow][neighborCell].isActive === false) {
                      
                      const parentColor = currentBoard[r][c].color
                      

                      const mutationChance = 0.15 
                      const willMutate = Math.random() < mutationChance
                      
                      const newColor = willMutate 
                        ? colors[Math.floor(Math.random() * colors.length)] 
                        : parentColor

                      nextBoard[neighborRow][neighborCell] = {
                        isActive: true,
                        color: newColor
                      }
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
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleCellClick = (clickedRow, clickedCell) => {
    setBoard((currentBoard) => {
      const nextBoard = currentBoard.map((row) => row.map(cell => ({ ...cell })));
      const cell = nextBoard[clickedRow][clickedCell];
      
      if (cell.isActive) {
        cell.isActive = false;
        cell.color = null;
      } else {
        cell.isActive = true;
        cell.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
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
              state={cell.isActive}         
              tileColor={cell.color}        
              onClick={() => handleCellClick(rowIndex, cellIndex)} 
            />
          )
        })
      })}
    </div>
  )
}

export default Board