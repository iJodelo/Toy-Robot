import React, { useContext, useState } from "react";
import { RobotContext } from "../RobotContext";
import {
  invalidCoordinates,
  invalidDirection,
  whichDirection,
  getDirection,
  isOutOfBounds,
} from "../common/Utils";
import ErrorMessage from "./ErrorMessage";

const Commands = () => {
  const [command, setCommand] = useState("");
  const [isPlaced, setIsPlaced] = useState(false);
  const [error, setError] = useState();
  const { posts, robots } = useContext(RobotContext);
  const [post, setPost] = posts;
  const [robot, setRobot] = robots;
  const { direction, positionX, positionY } = robot;

  const placePosition = (initialPosition) => {
    if (initialPosition === undefined) {
      setError("Coordinates and direction cannot be empty");
      return;
    }

    const position = initialPosition.split(","),
      x = Number(position[0]),
      y = Number(position[1]),
      dir = position[2];

    if (invalidCoordinates(x) || invalidCoordinates(y)) {
      setError("Invalid coordinates!");
      return;
    } else if (invalidDirection(dir)) {
      setError("Invalid direction! it should be NORTH, EAST, WEST, SOUTH");
      return;
    } else {
      setRobot({
        positionX: x,
        positionY: y,
        direction: whichDirection(dir),
      });
      setIsPlaced(true);
      report(command);
      setCommand("");
      setError("");
    }
  };

  const getPlaceOutput = () => {
    return `Output: ${positionX},${positionY},${getDirection(direction)}`;
  };

  const report = (text) => {
    text
      ? setPost([...post, { text: text.toString().toUpperCase() }])
      : setPost([...post, { text: "REPORT" }, { text: getPlaceOutput() }]);
    setCommand("");
    setError("");
  };

  const move = () => {
    if (direction % 2 === 1) {
      if (direction === 1) {
        setRobot({ ...robot, positionX: positionX + 1 });
      } else {
        setRobot({ ...robot, positionX: positionX - 1 });
      }
    } else {
      if (direction === 0) {
        setRobot({ ...robot, positionY: positionY + 1 });
      } else {
        setRobot({ ...robot, positionY: positionY - 1 });
      }
    }
    report(command);
    setError("");
  };

  const rotate = (dir) => {
    setRobot({
      ...robot,
      direction: (direction + (dir === "LEFT" ? 3 : 1)) % 4,
    });
    report(command);
    setCommand("");
    setError("");
  };

  const isValidMove = () => {
    switch (getDirection(direction)) {
      case "NORTH":
        return !isOutOfBounds(positionY + 1);
      case "EAST":
        return !isOutOfBounds(positionX + 1);
      case "SOUTH":
        return !isOutOfBounds(positionY - 1);
      case "WEST":
        return !isOutOfBounds(positionX - 1);
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const splitCommand = command.toString().toUpperCase().split(" ");

    switch (splitCommand[0]) {
      case "PLACE":
        placePosition(splitCommand[1]);
        break;
      case "MOVE":
        isPlaced
          ? isValidMove()
            ? move()
            : setError("Position is out of bounds")
          : setError("Position is not yet set");
        break;
      case "LEFT":
      case "RIGHT":
        isPlaced
          ? rotate(splitCommand[0])
          : setError("Position is not yet set");
        break;
      case "REPORT":
        isPlaced ? report() : setError("Position is not yet set");
        break;
      default:
        setError("Please enter valid command!");
        break;
    }
  };

  return (
    <div data-testid="command-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="command"
          placeholder="Please enter your command"
          required
          value={command}
          onChange={(e) => {
            setCommand(e.target.value);
          }}
        />
        <button>Run</button>
      </form>
      <ErrorMessage text={error} />
    </div>
  );
};

export default Commands;
