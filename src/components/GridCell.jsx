import { useState } from "react";
import FlowerTile from "../assets/flowertile.svg?react";
import Empty from '../assets/empty.png'
const GridCell = ({state = true}) => {
    const [flower, isflower] = useState(state);
    const handleClick = (event) => {
        event.preventDefault();
        isflower((prevflower) => !prevflower);
    };
  return (
        <button className='gridcell' onClick={handleClick}>
            {/* <img src={flower ? FlowerTile : Empty} alt="" /> */}
            {<FlowerTile></FlowerTile>}
        </button>
  )
}

export default GridCell