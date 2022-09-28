import React, { createContext, useState } from "react";

export const RobotContext = createContext();

export const RobotProvider = (props) => {
  const [post, setPost] = useState([]);
  const [robot, setRobot] = useState({
    positionX: "",
    positionY: "",
    direction: "",
  });
  return (
    <RobotContext.Provider
      value={{
        posts: [post, setPost],
        robots: [robot, setRobot],
      }}
    >
      {props.children}
    </RobotContext.Provider>
  );
};
