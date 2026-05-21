import FlowerTile from "../assets/flowertile.svg?react";
import Empty from '../assets/empty.png';

const GridCell = ({ state, onClick }) => {
  return (
    <button className='gridcell' onClick={onClick}>
      {state ? (
        <FlowerTile />
      ) : (
        <img src={Empty} alt="Empty tile" />
      )}
    </button>
  );
};

export default GridCell;