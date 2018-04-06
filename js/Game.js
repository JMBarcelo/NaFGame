function Game(cols, rows) {
  this.cols = cols;
  this.rows = rows;
  this.map = new Map(this.cols, this.rows);
  this.container = $("#game_board");
  this.actor = new Actor(0, 0, this.container, "hero");
  this.obstaclesArray = [];

  this.allKindObstacles(6, 240);
}

Game.prototype.allKindObstacles = function(dif, numObs) {
  var kind;
  for (j = 0; j < dif; j++) {
    switch (j) {
      case 0:
        kind = "blue";
        break;
      case 1:
        kind = "red";
        break;
      case 2:
        kind = "green";
        break;
      case 3:
        kind = "yellow";
        break;
      case 4:
        kind = "purple";
        break;
      case 5:
        kind = "black";
        break;
    }
    this.generateObstacles(kind, numObs / dif);
  }
};

Game.prototype.generateObstacles = function(kind, n) {
  for (k = 0; k < n; k++) {
    do {
      var aux;
      aux++;
      var alX = Math.floor(Math.random() * this.map.cols);
      var alY = Math.floor(Math.random() * this.map.rows);
    } while (
      (alX === 0 && alY === 0) ||
      this.actor.itsFree(alX, alY, this.obstaclesArray) == false
    );

    this.obstaclesArray.push(new Actor(alX, alY, this.container, kind));
  }
};

Game.prototype.move = function(event) {
  var direction;

  switch (event.which) {
    case 87:
      direction = "up";
      break;
    case 83:
      direction = "down";
      break;
    case 65:
      direction = "left";
      break;
    case 68:
      direction = "right";
      break;
  }

  if(this.actor.move(
    this.actor,
    direction,
    this.obstaclesArray,
    this.cols,
    this.rows
  ) == 2) {
    this.generateObstacles(kind, 2);
  }
};
