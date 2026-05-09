import GridCell from './GridCell'

const Board = () => {
    let board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => true))

    // board = board.map()
    console.log(board)
  return (
    <div className="board">
        {board.map((row)=>{
            return row.map((cell)=>{
                return <GridCell state={cell}></GridCell>
            })
        })}
    </div>
    )
}

export default Board