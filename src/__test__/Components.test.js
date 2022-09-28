import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RobotContext } from "../RobotContext";
import Robot from "../component/Robot";
import Board from "../component/Board";
import Commands from "../component/Commands";
import Console from "../component/Console";
import RobotImage from "../component/RobotImage";
import ErrorMessage from "../component/ErrorMessage";

const emptyValueProvider = {
  posts: [],
  robots: [
    [
      {
        positionX: "",
        positionY: "",
        direction: "",
      },
    ],
  ],
};

const valueProvider = {
  posts: [[{ text: "PLACE 0,0,NORTH" }]],
  robots: [
    {
      positionX: "0",
      positionY: "0",
      direction: "0",
    },
  ],
};

const components = [
  {
    name: "Robot",
    component: <Robot />,
    testId: "robot-container",
  },
  {
    name: "Board",
    component: <Board />,
    testId: "board-container",
  },
  {
    name: "Commands",
    component: <Commands />,
    testId: "command-container",
  },
  {
    name: "Console",
    component: <Console />,
    testId: "console-container",
  },
];

export function renderComponent(children, hasvalue) {
  return render(
    <RobotContext.Provider
      value={hasvalue ? valueProvider : emptyValueProvider}
    >
      {children}
    </RobotContext.Provider>
  );
}

components.forEach((i) => {
  test(`Render component ${i.name} in context provider without crashing`, () => {
    renderComponent(i.component);
    const itemComponent = screen.getByTestId(i.testId);
    expect(itemComponent).toBeInTheDocument();
  });
});

test("renders robot component should have a heading text", () => {
  renderComponent(<Robot />);
  expect(screen.getByRole("heading")).toHaveTextContent("Toy Robot Challenge");
});

test("Commands components contain components", () => {
  renderComponent(<Commands />);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent(/Run/);
});

test("Should be able to render the robotImage component", () => {
  renderComponent(<RobotImage />, true);
  const imageComponent = screen.getByRole("img");
  expect(imageComponent).toBeInTheDocument();
  expect(imageComponent).toHaveAttribute("src", "north.png");
  expect(imageComponent).toHaveAttribute("alt", "robot");
});

test("Error message component is present when command is invalid", () => {
  render(<ErrorMessage text={`Some Error`} />);
  const errorMessage = screen.queryByText("Some Error");
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveClass("error-message");
});

test("Error message component is not present when command is valid", () => {
  render(<ErrorMessage text={""} />);
  const errorMessage = screen.queryByText("Some Error");
  expect(errorMessage).not.toBeInTheDocument();
});

test("Console should print the commands", () => {
  renderComponent(<Console />, true);
  const consoleComponent = screen.getByTestId("console-container");
  expect(consoleComponent).toHaveTextContent("PLACE 0,0,NORTH");
});
