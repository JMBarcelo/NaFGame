function Actor(x, y, container, kindOf) {
  this.x = x;
  this.y = y;
  this.container = container;
  this.kindOf = kindOf;
  switch (kindOf) {
    case "hero":
      this.element = $("<div>").addClass("actor");
      break;
    case "obstacle":
      this.element = $("<div>").addClass("obstacle");
      break;
  }

  this.container.append(this.element);
  this.updateActor();
}

Actor.prototype.updateActor = function() {
  this.element.css({
    top: 41 + this.y * 100,
    left: 41 + this.x * 100
  });
};

Actor.prototype.itsFree = function(posX, posY, actorsArray) {
  for (i = 0; i < actorsArray.length; i++) {
    if (posX == actorsArray[i].x && posY == actorsArray[i].y) {
      return false;
    }
  }
  return true;
};

Actor.prototype.move = function(direction, obsArray) {
  var nextX = this.x;
  var nextY = this.y;
  switch (direction) {
    case "up":
      nextY--;
      break;

    case "down":
      nextY++;
      break;

    case "left":
      nextX--;
      break;

    case "right":
      nextX++;
      break;
  }

  if (nextY >= 0 && nextY <= 19 && nextX >= 0 && nextX <= 19) {
    if (this.itsFree(nextX, nextY, obsArray)) {
      this.x = nextX;
      this.y = nextY;
      this.updateActor();
    }
  }
  return false;
};
