const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

export const invalidCoordinates = (num) =>
  !(Number.isInteger(num) && num > -1) || num > 4;

export const invalidDirection = (direction) => !directions.includes(direction);

export const whichDirection = (direction) => directions.indexOf(direction);

export const getDirection = (direction) => directions[direction];

export const isOutOfBounds = (num) => num < 0 || num > 4;
