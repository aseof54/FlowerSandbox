import FlowerTile from "../assets/flowertile.svg?react";
import Empty from '../assets/empty.png';

const GridCell = ({ state, onClick, tileColor }) => {
  return (
    <button className='gridcell' onClick={onClick}>
      {state ? (
        <FlowerTile fill={tileColor} stroke={tileColor}/>
      ) : (
        <img src={Empty} alt="Empty tile" />
      )}
    </button>
  );
};

export default GridCell;