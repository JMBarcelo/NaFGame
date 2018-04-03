// Valores iniciales de filas y columnas y posición X e Y inicial del personaje en el centro del tablero

var cols = 100;
var rows = 100;

function pad(n) {
  if (n < 10) {
    n = "0" + n;
  } else {
    n = "" + n;
  }
  return n;
}

// Creación de los arrays de losetas

var indexv = [];
var indexh = [];

for (var i = 0; i < cols; i++) {
  if (i < 10) {
    indexv.push("0" + i);
  } else {
    indexv.push("" + i);
  }
}

for (var j = 0; j < rows; j++) {
  if (j < 10) {
    indexh.push("0" + j);
  } else {
    indexh.push("" + j);
  }
}

// Inicio de las funciones al cargarse el DOM

$(document).ready(function() {
  var html = "";

  //Creación de las losetas por filas y columnas

  indexh.forEach(function(el) {
    html += '<div id="row_' + el + '">';
    indexv.forEach(function(e) {
      html += '<div class="empty_tile" id="' + e + el + '">';
      //html += ' name="' + e + el + '">';
      html += e + el;
      html += "</div>";
    });
    html += "</div>";
  });

  //Variación del ancho del body para poder superar el overflow del tablero

  $("body,html").css("min-width", 82 + cols * 100);

  //implementación del tablero en el DOM

  document.getElementById("game_board").innerHTML = html;

  //Generación de la mazmorra

  var array = roomsGenerator();

  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      if (array[i][j] == "w") {
        document.getElementById(pad(j) + pad(i)).classList.add("wall_tile");
        document.getElementById(pad(j) + pad(i)).classList.remove("empty_tile");
      } else if (array[i][j] == "r") {
        document.getElementById(pad(j) + pad(i)).classList.add("invis");
      }
    }
  }

  var posX;
  var posY;

  function XYcalculator(className, inc) {
    coords = document.getElementsByClassName(className)[0].id.split("");
    posX = pad(parseInt("" + coords[0] + coords[1]) + inc);
    posY = "" + coords[2] + coords[3];
  }

  //Generación de los teletransportes

  var tt_in = 0;
  var tt_out = 0;

  for (i = 2; i < rows - 2; i++) {
    for (j = 2; j < cols - 2; j++) {
      if (
        document
          .getElementById(pad(j + 1) + pad(i))
          .classList.contains("empty_tile") &&
        document
          .getElementById(pad(j) + pad(i + 1))
          .classList.contains("empty_tile") &&
        document
          .getElementById(pad(j - 1) + pad(i))
          .classList.contains("wall_tile") &&
        document
          .getElementById(pad(j) + pad(i - 1))
          .classList.contains("wall_tile")
      ) {
        document.getElementById(pad(j) + pad(i)).classList.add("tt_in_tile");
        document
          .getElementById(pad(j) + pad(i))
          .classList.add(pad("tt_in_" + pad(tt_in)));
        document.getElementById(pad(j) + pad(i)).classList.remove("empty_tile");
        tt_in++;
      }
    }
  }

  for (i = 2; i < rows - 2; i++) {
    for (j = 2; j < cols - 2; j++) {
      if (
        document
          .getElementById(pad(j - 1) + pad(i))
          .classList.contains("empty_tile") &&
        document
          .getElementById(pad(j) + pad(i - 1))
          .classList.contains("empty_tile") &&
        document
          .getElementById(pad(j + 1) + pad(i))
          .classList.contains("wall_tile") &&
        document
          .getElementById(pad(j) + pad(i + 1))
          .classList.contains("wall_tile")
      ) {
        document.getElementById(pad(j) + pad(i)).classList.add("tt_out_tile");
        document
          .getElementById(pad(j) + pad(i))
          .classList.add(pad("tt_out_" + pad(tt_out)));
        document.getElementById(pad(j) + pad(i)).classList.remove("empty_tile");
        tt_out++;
      }
    }
  }

  //Generamos el array de habitaciones

  var tt = 0;
  var allRoomsArray = [];
  var roomArray = [];
  var rowArray = [];
  var tile_id;

  for (i = 0; i < tt_in; i++) {
    XYcalculator("tt_in_" + pad(i), 0);
    roomArray = [];
    for (
      j = parseInt(posY);
      document.getElementById(posX + pad(j)).className != "wall_tile";

    ) {
      rowArray = [];
      for (
        var k = parseInt(posX);
        document.getElementById(pad(k) + pad(j)).className != "wall_tile";
        k++
      ) {
        tile_id = document.getElementById(pad(k) + pad(j)).id;
        rowArray.push(tile_id);
      }
      j++;
      roomArray.push(rowArray);
    }
    allRoomsArray.push(roomArray);
  }

  //Revelamos la habitación

  function revealRoom(moor) {
    for (i = 0; i < allRoomsArray[moor].length; i++) {
      for (j = 0; j < allRoomsArray[moor][i].length; j++) {
        document
          .getElementById(allRoomsArray[moor][i][j])
          .classList.remove("invis");
      }
    }
  }

  //Situamos la cámara en el guerrero

  function scroll() {
    window.scrollTo(
      warrior.getBoundingClientRect().right - window.innerWidth / 2,
      warrior.getBoundingClientRect().bottom - window.innerHeight / 2
    );
  }

  //Comportamiento al entrar en una casilla

  function enterNewTile(n) {
    revealRoom(n);
    scroll();
  }

  //Situamos al personaje al lado de la entrada

  var coords =
    parseInt(document.getElementsByClassName("tt_in_00")[0].id) + 100;
  if (coords < 1000) {
    coords = "0" + coords;
  } else {
    coords = "" + coords;
  }
  var warrior = document.getElementById(pad(coords));

  function setWarrior(w) {
    w.classList.add("warrior_tile");
    w.classList.remove("empty_tile");
  }

  function cleanWarrior(w) {
    w.classList.add("empty_tile");
    w.classList.remove("warrior_tile");
  }

  setWarrior(warrior);
  enterNewTile(0);

  //Movemos al guerrero

  XYcalculator("warrior_tile", 0);

  tt = 1;

  $(document).on("keydown", function(event) {
    if (event.which == 65 && parseInt(posX) - 1 >= 0) {
      posX = pad(parseInt(posX) - 1);
      if (
        document.getElementById(posX + posY).classList.contains("empty_tile")
      ) {
        cleanWarrior(warrior);
        warrior = document.getElementById(posX + posY);
        setWarrior(warrior);
      } else {
        posX = pad(parseInt(posX) + 1);
      }
    } else if (event.which == 87 && parseInt(posY) - 1 >= 0) {
      posY = pad(parseInt(posY) - 1);
      if (
        document.getElementById(posX + posY).classList.contains("empty_tile")
      ) {
        cleanWarrior(warrior);
        warrior = document.getElementById(posX + posY);
        setWarrior(warrior);
      } else {
        posY = pad(parseInt(posY) + 1);
      }
    } else if (event.which == 68 && parseInt(posX) + 1 < cols) {
      posX = pad(parseInt(posX) + 1);
      if (
        document.getElementById(posX + posY).classList.contains("empty_tile")
      ) {
        cleanWarrior(warrior);
        warrior = document.getElementById(posX + posY);
        setWarrior(warrior);
      } else if (
        document.getElementById(posX + posY).classList.contains("tt_out_tile")
      ) {
        cleanWarrior(warrior);
        XYcalculator("tt_in_" + pad(tt), 1);
        warrior = document.getElementById(posX + posY);
        setWarrior(warrior);
        enterNewTile(tt);
        tt++;
      } else {
        posX = pad(parseInt(posX) - 1);
      }
    } else if (event.which == 83 && parseInt(posY) + 1 < rows) {
      posY = pad(parseInt(posY) + 1);
      if (
        document.getElementById(posX + posY).classList.contains("empty_tile")
      ) {
        cleanWarrior(warrior);
        warrior = document.getElementById(posX + posY);
        setWarrior(warrior);
      } else if (
        document.getElementById(posX + posY).classList.contains("tt_out_tile")
      ) {
        cleanWarrior(warrior);
        XYcalculator("tt_in_" + pad(tt), 1);
        warrior = document.getElementById(posX + posY);
        setWarrior(warrior);
        enterNewTile(tt);
        tt++;
      } else {
        posY = pad(parseInt(posY) - 1);
      }
    }
  });
});
