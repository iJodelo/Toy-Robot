import React from "react";
import Board from "./Board";
import Commands from "./Commands";
import Console from "./Console";
import "../public/Robot.css";

function Robot() {
  return (
    <div className="container" data-testid="robot-container">
      <h1>Toy Robot Challenge</h1>
      <Board />
      <Commands />
      <Console />
    </div>
  );
}

export default Robot;
