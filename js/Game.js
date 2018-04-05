function Game() {
  this.map = new Map(20, 20);
  this.container = $("#game_board");
  this.actor = new Actor(0, 0, this.container, "hero");
  
  this.obstaclesArray = [];

  this.generateObstacles(100);
};

Game.prototype.generateObstacles = function(numObs) {
  for (i = 0; i < numObs; i++) {
    var alX = Math.floor(Math.random() * this.map.cols);
    var alY = Math.floor(Math.random() * this.map.rows);

    if ((alX != 0 || alY != 0) && this.actor.itsFree(alX, alY, this.obstaclesArray)) {
      this.obstaclesArray.push(new Actor(alX, alY, this.container, "obstacle"));
    }
  }
  console.log(this.obstaclesArray.length)
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

  this.actor.move(direction, this.obstaclesArray);
};
