var DungeonGenerator = (function() {
  var MAXSIZE,
    MINSIZE,
    ROWS,
    COLS,
    BORDER,
    ATTEMPTS,
    WALL = "W",
    EMPTY = "E",
    ROOMS;

  function isNotOverlapping(floorMap, room) {
    //Compruebo que no se superpongan las habitaciones
    var status = true;
    for (var i = room.row - 1; i < room.row + room.h + 1; i++) {
      for (var j = room.col - 1; j < room.col + room.w + 1; j++) {
        if (floorMap[i][j] !== WALL) {
          status = false;
          break;
        }
      }
    }
    return status;
  }

  //Función que devuelve un número aleatorio

  function randomEvenOdd(min, max) {
    if (max === min) return max;
    return (
      min + Math.floor(Math.random() * Math.floor((max - min) / 2 + 1)) * 2
    );
  }

  //Función que añade una habitación

  function addRoom(floorMap) {
    var out = undefined;
    var h = randomEvenOdd(MINSIZE, MAXSIZE);
    var w = randomEvenOdd(MINSIZE, MAXSIZE);
    var room = {
      h: h,
      w: w,
      row: randomEvenOdd(0, ROWS - h - 2 * BORDER) + BORDER,
      col: randomEvenOdd(0, COLS - w - 2 * BORDER) + BORDER
    };

    if (isNotOverlapping(floorMap, room)) {
      for (var i = room.row; i < room.row + room.h; i++) {
        for (var j = room.col; j < room.col + room.w; j++) {
          floorMap[i][j] = EMPTY;
        }
      }
      out = room;
    }
    return out;
  }

  //Función autoejecutable que me genera el valor de cada casilla

  var DungeonGenerator = {
    generate: function(config) {
      var cfg = config ? config : {};

      ROWS = cfg.rows || 99;
      COLS = cfg.cols || 99;
      MAXSIZE = cfg.maxRoomSize || 20;
      MINSIZE = cfg.minRoomSize || 7;
      BORDER = cfg.padding || 2;
      ATTEMPTS = cfg.maxAttempts || 500;
      ROOMS = cfg.rooms || 99;

      var floorMap = [];
      for (var i = 0; i < ROWS; i++) {
        var r = [];
        for (j = 0; j < COLS; j++) {
          r.push(WALL);
        }
        floorMap.push(r);
      }

      var roomsToLink = [];
      var roomsLinked = [];
      var i = 0;
      var r = 0;
      while (i < ATTEMPTS && r < ROOMS) {
        var newRooom = addRoom(floorMap);
        if (newRooom) {
          roomsToLink.push(newRooom);
          r++;
        }
        i++;
      }

      function distance(a, b) {
        var d2 = (b.row - a.row) ^ (2 + (b.col - a.col)) ^ 2;
        return Math.sqrt(d2);
      }

      return floorMap.map(function(row, i) {
        return row.map(function(cell, j) {
          return { cellType: cell === WALL ? "wall" : "empty" };
        });
      });
    }
  };
  return DungeonGenerator;
})();
