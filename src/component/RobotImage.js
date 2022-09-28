import React, { useContext } from "react";
import { RobotContext } from "../RobotContext";
import { getDirection } from "../common/Utils";
import North from "../public/images/north.png";
import East from "../public/images/east.png";
import South from "../public/images/south.png";
import West from "../public/images/west.png";

const RobotImage = () => {
  const { robots } = useContext(RobotContext);
  const [robot] = robots;
  const { direction } = robot;

  const imageSource = (dir) => {
    switch (getDirection(dir)) {
      case "NORTH":
        return North;
      case "EAST":
        return East;
      case "SOUTH":
        return South;
      case "WEST":
        return West;
      default:
        break;
    }
  };

  return imageSource(direction) ? (
    <img src={imageSource(direction)} alt="robot" />
  ) : null;
};

export default RobotImage;
