// Valores iniciales de filas y columnas y función para padificar un número con 0's por delante en caso necesario y convertirlo en string

var cols = 100; //Máximo 100
var rows = 100; //Máximo 100

function pad(n) {
  if (n < 10) {
    n = "0" + n;
  } else {
    n = "" + n;
  }
  return n;
}

// ----- Inicio de las funciones al cargarse el DOM -------

$(document).ready(function() {
  // Creación de los arrays de losetas

  var html = "";

  var indexv = [];
  var indexh = [];

  for (var i = 0; i < cols; i++) {
    indexv.push(pad(i));
  }

  for (var j = 0; j < rows; j++) {
    indexh.push(pad(j));
  }

  //Creación de las losetas por filas y columnas

  indexh.forEach(function(el) {
    html += '<div id="row_' + el + '">';
    indexv.forEach(function(e) {
      html += '<div class="empty_tile" id="' + e + el + '">';
      html += e + el; //Para identificar la loseta durante la creación, luego debería quitarse.
      html += "</div>";
    });
    html += "</div>";
  });

  //Variación del ancho del body para poder superar el overflow del tablero

  $("body,html").css("min-width", 82 + cols * 80);

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

  //Función para obtener las posiciones X e Y de un elemento en función de su id (coordenadas en el tablero)

  var posX;
  var posY;

  function XYcalculator(className, next) {
    //"next" nos permite elegir las siguientes posiciones en el eje X (útil para posicionar al héroe)
    coords = document.getElementsByClassName(className)[0].id.split("");
    posX = pad(parseInt("" + coords[0] + coords[1]) + next);
    posY = "" + coords[2] + coords[3];
  }

  //Generación de los teletransportes (escaleras) de entrada

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

  //Generación de los teletransportes (escaleras) de salida

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

  //Función que revela (quita ".invis") a una habitación

  function revealRoom(room_pos) {
    for (i = 0; i < allRoomsArray[room_pos].length; i++) {
      for (j = 0; j < allRoomsArray[room_pos][i].length; j++) {
        document
          .getElementById(allRoomsArray[room_pos][i][j])
          .classList.remove("invis");
      }
    }
  }

  //Función que selecciona la loseta central de la habitación

  var centralX;
  var centralY;
  var central_tile;

  function centralTile(room_pos) {
    centralY = Math.round(allRoomsArray[room_pos].length / 2);
    centralX = Math.round(allRoomsArray[room_pos][centralY].length / 2);
    central_tile = document.getElementById(
      allRoomsArray[room_pos][centralY][centralX]
    );
  }

  //Función que sitúa la cámara en el centro de la habitación

  function scroll(n) {
    centralTile(n);
    var elementRect = central_tile.getBoundingClientRect();
    var absoluteElementTop = elementRect.top + window.pageYOffset;
    var absoluteElementLeft = elementRect.left + window.pageXOffset;
    var middleY = absoluteElementTop - window.innerHeight / 2 - 40;
    var middleX = absoluteElementLeft - window.innerWidth / 2;
    window.scrollTo(middleX, middleY);
  }

  //Generador de números random

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  //Generador de enemigos random

  function monsterGenerator(room_pos) {
    var random_row;
    var random_tile;
    for (
      i = 0;
      i < randomNumber(0, Math.trunc(allRoomsArray[room_pos].length / 2));
      i++
    ) {
      random_row = Math.round(
        randomNumber(3, allRoomsArray[room_pos].length - 1)
      );
      random_tile = Math.round(
        randomNumber(0, allRoomsArray[room_pos][0].length - 2)
      );
      document
        .getElementById(allRoomsArray[room_pos][random_row][random_tile])
        .classList.add("monster_tile");
      document
        .getElementById(allRoomsArray[room_pos][random_row][random_tile])
        .classList.remove("empty_tile");
    }
  }

  //Comportamiento al entrar en una habitación

  function enterNewRoom(n) {
    revealRoom(n);
    scroll(n);
  }

  //Comportamiento al salir de una habitación

  function exitRoom(room_pos) {
    room_pos--;
    for (i = 0; i < allRoomsArray[room_pos].length; i++) {
      for (j = 0; j < allRoomsArray[room_pos][i].length; j++) {
        document
          .getElementById(allRoomsArray[room_pos][i][j])
          .classList.add("veiled");
      }
    }
  }

  //Situamos al personaje en la casilla siguiente a las escaleras de entrada

  var coords =
    parseInt(document.getElementsByClassName("tt_in_00")[0].id) + 100;
  if (coords < 1000) {
    coords = "0" + coords;
  } else {
    coords = "" + coords;
  }

  warrior = document.getElementById(pad(coords));

  function setWarrior(w) {
    w.classList.add("warrior_tile");
    w.classList.remove("empty_tile");
  }

  function cleanWarrior(w) {
    w.classList.add("empty_tile");
    w.classList.remove("warrior_tile");
  }

  setWarrior(warrior);
  enterNewRoom(0);

  //Función de cambio de casilla

  function newTile() {
    cleanWarrior(warrior);
    warrior = document.getElementById(posX + posY);
    setWarrior(warrior);
  }

  //Función de fin de turno

  var clicker = true;

  function endTurn() {
    clicker = false;
  }

  //Función de turno enemigo

  function enemiesTurn() {}

  //Función de turno siguiente

  function nextTurn() {
    clicker = true;
    //Restaurar puntos de movimiento
  }

  //Detectamos pulsaciones al mover al guerrero y pasar turno

  XYcalculator("warrior_tile", 0);

  tt = 1;

  $(document).on("keydown", function(event) {
    if (clicker) {
      //Tecla A
      if (event.which == 65 && parseInt(posX) - 1 >= 0) {
        posX = pad(parseInt(posX) - 1);
        if (
          document.getElementById(posX + posY).classList.contains("empty_tile")
        ) {
          newTile();
        } else {
          posX = pad(parseInt(posX) + 1);
        }
        //Tecla W
      } else if (event.which == 87 && parseInt(posY) - 1 >= 0) {
        posY = pad(parseInt(posY) - 1);
        if (
          document.getElementById(posX + posY).classList.contains("empty_tile")
        ) {
          newTile();
        } else {
          posY = pad(parseInt(posY) + 1);
        }
        //Tecla D
      } else if (event.which == 68 && parseInt(posX) + 1 < cols) {
        posX = pad(parseInt(posX) + 1);
        if (
          document.getElementById(posX + posY).classList.contains("empty_tile")
        ) {
          newTile();
          //Entrada por la izquierda en una escalera de salida
        } else if (
          document.getElementById(posX + posY).classList.contains("tt_out_tile")
        ) {
          exitRoom(tt);
          XYcalculator("tt_in_" + pad(tt), 1);
          newTile();
          enterNewRoom(tt);
          monsterGenerator(tt);
          tt++;
        } else {
          posX = pad(parseInt(posX) - 1);
        }
        //Tecla S
      } else if (event.which == 83 && parseInt(posY) + 1 < rows) {
        posY = pad(parseInt(posY) + 1);
        if (
          document.getElementById(posX + posY).classList.contains("empty_tile")
        ) {
          newTile();
          //Entrada por la arriba en una escalera de salida
        } else if (
          document.getElementById(posX + posY).classList.contains("tt_out_tile")
        ) {
          exitRoom(tt);
          XYcalculator("tt_in_" + pad(tt), 1);
          newTile();
          enterNewRoom(tt);
          monsterGenerator(tt);
          tt++;
        } else {
          posY = pad(parseInt(posY) - 1);
        }
        //Tecla N --> Cambio de turno
      } else if (event.which == 78) {
        endTurn();
        enemiesTurn();
        nextTurn();
      }
    }
  });
});
