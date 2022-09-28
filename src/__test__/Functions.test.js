import {
  invalidCoordinates,
  invalidDirection,
  whichDirection,
  getDirection,
  isOutOfBounds,
} from "../common/Utils";

test("Invalid Coordinates function is working", () => {
  expect(invalidCoordinates(0)).toBe(false);
  expect(invalidCoordinates(4)).toBe(false);
  expect(invalidCoordinates(-1)).toBe(true);
  expect(invalidCoordinates(5)).toBe(true);
  expect(invalidCoordinates("n")).toBe(true);
});

test("Invalid Direction function", () => {
  expect(invalidDirection("NORTH")).toBe(false);
  expect(invalidDirection("NEWS")).toBe(true);
});

test("Which Direction function", () => {
  expect(whichDirection("NORTH")).toBe(0);
  expect(whichDirection("EAST")).toBe(1);
  expect(whichDirection("SOUTH")).toBe(2);
  expect(whichDirection("WEST")).toBe(3);
  expect(whichDirection("NEWS")).toBe(-1);
});

test("Get Direction function", () => {
  expect(getDirection(0)).toBe("NORTH");
  expect(getDirection(1)).toBe("EAST");
  expect(getDirection(2)).toBe("SOUTH");
  expect(getDirection(3)).toBe("WEST");
  expect(getDirection(4)).not.toBe("NORTH");
});

test("is out of Bounds function", () => {
  expect(isOutOfBounds(-1)).toBe(true);
  expect(isOutOfBounds(5)).toBe(true);
  expect(isOutOfBounds(0)).toBe(false);
  expect(isOutOfBounds(4)).toBe(false);
});
