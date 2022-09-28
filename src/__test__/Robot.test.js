import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RobotContext } from "../RobotContext";
import Robot from "../component/Robot";
import { useState } from "react";

const MockRobot = () => {
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
      <Robot />
    </RobotContext.Provider>
  );
};

const createCommands = (commands) => {
  const inputText = screen.getByPlaceholderText(/Please enter your command/);
  const button = screen.getByRole("button");
  commands.forEach((command) => {
    fireEvent.change(inputText, { target: { value: command } });
    fireEvent.click(button);
  });
};

describe("Robot Toy Challeng having valid commands", () => {
  it("Running valid Commands", () => {
    render(<MockRobot />);
    createCommands(["PLACE 0,0,NORTH", "MOVE", "REPORT"]);
    const consoleElements = screen.getAllByTestId("post-container");
    expect(consoleElements[0]).toHaveTextContent("PLACE 0,0,NORTH");
    expect(consoleElements[1]).toHaveTextContent("MOVE");
    expect(consoleElements[2]).toHaveTextContent("REPORT");
    expect(consoleElements[3]).toHaveTextContent("Output: 0,1,NORTH");
  });
});

describe("Robot Toy Challeng having valid commands but out of bounds will display error message", () => {
  it("Running valid Commands", () => {
    render(<MockRobot />);
    createCommands(["PLACE 0,0,NORTH", "LEFT", "MOVE"]);
    const consoleElements = screen.getAllByTestId("post-container");
    expect(consoleElements[0]).toHaveTextContent("PLACE 0,0,NORTH");
    expect(consoleElements[1]).toHaveTextContent("LEFT");
    const errorMessage = screen.getByTestId("error-message-container");
    expect(errorMessage).toHaveTextContent("Position is out of bounds");
  });
});

describe("Robot Toy Challenge having invalid inputs", () => {
  test("Running invalid Commands", () => {
    render(<MockRobot />);
    createCommands(["CHANGE LOCATION"]);
    const errorMessage = screen.getByTestId("error-message-container");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Please enter valid command!");
  });

  test("Running commands without placing the coordinates", () => {
    render(<MockRobot />);
    createCommands(["MOVE"]);
    const errorMessage = screen.getByTestId("error-message-container");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Position is not yet set");
  });

  test("Running commands place without coordinates]", () => {
    render(<MockRobot />);
    createCommands(["PLACE"]);
    const errorMessage = screen.getByTestId("error-message-container");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      "Coordinates and direction cannot be empty"
    );
  });

  test("Running commands place with invalid coordinates]", () => {
    render(<MockRobot />);
    createCommands(["PLACE -1,2,NORTH"]);
    const errorMessage = screen.getByTestId("error-message-container");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Invalid coordinates!");
  });

  test("Running commands place with invalid direction]", () => {
    render(<MockRobot />);
    createCommands(["PLACE 0,0,NEWS"]);
    const errorMessage = screen.getByTestId("error-message-container");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      "Invalid direction! it should be NORTH, EAST, WEST, SOUTH"
    );
  });
});
