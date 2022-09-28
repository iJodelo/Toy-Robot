import React from "react";
import ReactDOM from "react-dom/client";
import Robot from "./component/Robot";
import { RobotProvider } from "./RobotContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RobotProvider>
      <Robot />
    </RobotProvider>
  </React.StrictMode>
);
