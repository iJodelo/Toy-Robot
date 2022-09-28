import React, { useContext } from "react";
import { RobotContext } from "../RobotContext";
import RobotImage from "./RobotImage";

const Board = () => {
  const { robots } = useContext(RobotContext) || {};
  const [robot, setRobot] = robots;
  const { positionX, positionY } = robot;

  const RowBoxes = ({ hasImage }) => {
    return (
      <>
        {[...Array(5)].map((x, i) => (
          <div key={i} className={`column x-${i}`}>
            {hasImage && positionX === i ? <RobotImage /> : null}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="board" data-testid="board-container">
        {[...Array(5)].map((x, i) => (
          <div key={i} className={`row y-${4 - i}`}>
            <RowBoxes hasImage={positionY === 4 - i} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
