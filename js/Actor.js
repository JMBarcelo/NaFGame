function Actor(x, y, container, kindOf) {
  this.x = x;
  this.y = y;
  this.container = container;
  this.kindOf = kindOf;
  this.element = $("<div>").addClass(kindOf);

  this.container.append(this.element);
  this.updateActor(this.x, this.y);
}

Actor.prototype.updateActor = function(x, y) { 
  this.element.css({
    top: 41 + y * 100,
    left: 41 + x * 100
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

Actor.prototype.nextStone = function(posX, posY, nX, nY, actorsArray) {
  for (i = 0; i < actorsArray.length; i++) {
    if (posX == actorsArray[i].x && posY == actorsArray[i].y) {
      this.element = actorsArray[i].element;
      actorsArray[i].x = nX;
      actorsArray[i].y = nY;
      return true;
    }
  }
  return false;
};

Actor.prototype.takeSquares = function(x, y, nx, ny, kind, arr) {
  var squareArray = [];
  var square = 0;
  squareArray.push(arr[i]);
  if (this.itsFree(nx, ny, arr) == false) {
    squareArray.push(arr[i]);
    var kind = kind;
    if (kind == arr[i].kindOf) {
      if (x - nx === 0) {
        if (this.itsFree(x + 1, y, arr) == false) {
          if (kind == arr[i].kindOf) {
            squareArray.push(arr[i]);
            if (this.itsFree(x + 1, y + 1, arr) == false) {
              if (kind == arr[i].kindOf) {
                square++;
                squareArray.push(arr[i]);
              }
            }
            if (this.itsFree(x + 1, y - 1, arr) == false) {
              if (kind == arr[i].kindOf) {
                square++;
                squareArray.push(arr[i]);
              }
            }
          }
        }
        if (this.itsFree(x - 1, y, arr) == false) {
          if (kind == arr[i].kindOf) {
            squareArray.push(arr[i]);
            if (this.itsFree(x - 1, y - 1, arr) == false) {
              if (kind == arr[i].kindOf) {
                square++;
                squareArray.push(arr[i]);
              }
            }
            if (this.itsFree(x - 1, y + 1, arr) == false) {
              if (kind == arr[i].kindOf) {
                square++;
                squareArray.push(arr[i]);
              }
            }
          }
        }
      } else {
        if (this.itsFree(x, y + 1, arr) == false) {
          if (kind == arr[i].kindOf) {
            squareArray.push(arr[i]);
            if (this.itsFree(x + 1, y + 1, arr) == false) {
              if (kind == arr[i].kindOf) {
                square++;
                squareArray.push(arr[i]);
              }
            }
            if (this.itsFree(x - 1, y + 1, arr) == false) {
              if (kind == arr[i].kindOf) {
                square++;
                squareArray.push(arr[i]);
              }
            }
          }
        }
        if (this.itsFree(x, y - 1, arr) == false) {
          if (kind == arr[i].kindOf) {
            squareArray.push(arr[i]);
            if (this.itsFree(x - 1, y - 1, arr) == false) {
              if (kind == arr[i].kindOf) {
                square++;
                squareArray.push(arr[i]);
              }
            }
            if (this.itsFree(x + 1, y - 1, arr) == false) {
              if (kind == arr[i].kindOf) {
                square++;
                squareArray.push(arr[i]);
              }
            }
          }
        }
      }
    }
  }
  if (square > 0) {
    var board;
    for (h = 0; h < squareArray.length; h++) {     
      /*board = $(squareArray[h])[0].container[0];
      console.log($("div[style='top: " + (41 + squareArray[h].y * 100) + "px; left: " + (41 + squareArray[h].x * 100) + "px;]"))*/
      arr.splice($.inArray(squareArray[h], arr), 1);
    }
  }
  console.log(arr);
  return square;
};

Actor.prototype.move = function(hero, direction, obsArray, gridX, gridY) {
  var hero = hero.element;
  var nextX = this.x;
  var nextY = this.y;
  var nextestX = this.x;
  var nextestY = this.y;
  var sqrX = this.x;
  var sqrY = this.y;
  switch (direction) {
    case "up":
      nextY--;
      nextestY -= 2;
      sqrY -= 3;
      break;

    case "down":
      nextY++;
      nextestY += 2;
      sqrY += 3;
      break;

    case "left":
      nextX--;
      nextestX -= 2;
      sqrX -= 3;
      break;

    case "right":
      nextX++;
      nextestX += 2;
      sqrX += 3;
      break;
  }

  if (nextY >= 0 && nextY <= gridY - 1 && nextX >= 0 && nextX <= gridX - 1) {
    if (this.itsFree(nextX, nextY, obsArray)) {
      this.x = nextX;
      this.y = nextY;
      this.updateActor(this.x, this.y);
    } else if (
      nextestY >= 0 &&
      nextestY <= gridY - 1 &&
      nextestX >= 0 &&
      nextestX <= gridX - 1 &&
      this.itsFree(nextestX, nextestY, obsArray)
    ) {
      this.x = nextX;
      this.y = nextY;
      this.updateActor(this.x, this.y);
      this.nextStone(nextX, nextY, nextestX, nextestY, obsArray);
      this.updateActor(nextestX, nextestY);
      this.element = hero;
      return(this.takeSquares(nextestX,
        nextestY,
        sqrX,
        sqrY,
        obsArray[i].kindOf,
        obsArray))
    }
  }
  return false;
};
