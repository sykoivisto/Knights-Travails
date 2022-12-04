const PointNode = (point, path) => {
  point = point;
  path = path;
  return { point, path };
};

// working on our knight moves♪
const knightMoves = (startPoint, endPoint) => {
  if (
    endPoint[0] > 7 ||
    endPoint[1] > 7 ||
    endPoint[0] < 0 ||
    endPoint[1] < 0 ||
    startPoint[0] > 7 ||
    startPoint[1] > 7 ||
    startPoint[0] < 0 ||
    startPoint[1] < 0
  )
    return null;
  // accepts a starting point e.g. [0,0] and returns an array containing all the possible moves e.g. [[1,2],[2,1]...]
  const findNextMove = (startPoint) => {
    // 8x8 grid from 0,0 to 7,7
    // assuming you dont go out of bounds, a knight can make 8 moves. calculate them all, clockwise, starting at the top
    const allPossibleMoves = [
      [startPoint[0] + 1, startPoint[1] + 2],
      [startPoint[0] + 2, startPoint[1] + 1],
      [startPoint[0] - 1, startPoint[1] + 2],
      [startPoint[0] - 2, startPoint[1] + 1],
      [startPoint[0] - 2, startPoint[1] - 1],
      [startPoint[0] - 1, startPoint[1] - 2],
      [startPoint[0] - 2, startPoint[1] + 1],
      [startPoint[0] - 1, startPoint[1] + 2],
    ];
    // also make sure we don't go out of bounds
    const inBoundsMoves = allPossibleMoves
      .map((move) => {
        if (move[0] < 8 && move[1] < 8) return move;
      })
      .filter((move) => {
        return move !== undefined;
      });

    // return an array with all possibe moves
    return inBoundsMoves;
  };

  let queue = [PointNode(startPoint, [startPoint])];
  let currentPoint = queue.shift();

  while (
    currentPoint.point[0] !== endPoint[0] ||
    currentPoint.point[1] !== endPoint[1]
  ) {
    const nextMoves = findNextMove(currentPoint.point);
    nextMoves.forEach((move) => {
      let node = PointNode(move, currentPoint.path.concat([move]));
      queue.push(node);
    });
    currentPoint = queue.shift();
  }

  console.log(
    `You've made it in ${currentPoint.path.length - 1} moves! Here's your path:`
  );
  currentPoint.path.forEach((point) => {
    console.log(point);
  });
};

console.log(knightMoves([0,0], [2,6]));
