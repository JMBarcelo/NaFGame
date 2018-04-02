// Valores iniciales de filas y columnas y posición X e Y inicial del personaje en el centro del tablero

var cols = 100;

var posX = parseInt(cols/2);

function pad(n) {
  if(n < 10) {
    n = '0' + n;
  } else {
    n = '' + n;
  }
  return n;
}

posX = pad(posX);

var rows = 100;

var posY = parseInt(rows/2);

posY = pad(posY);

// Creación de los arrays de losetas

var indexv = [];
var indexh = [];

for (var i = 0; i < cols; i++) {
  if(i < 10) {
    indexv.push('0' + i)
  } else {
    indexv.push('' + i);
  }
}

for (var j = 0; j < rows; j++) {
  if(j < 10) {
    indexh.push('0' + j)
  } else {
    indexh.push('' + j);
  }
}

// Inicio de las funciones al cargarse el DOM

$(document).ready(function() {

  console.log(roomsGenerator());
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

  $('body,html').css('min-width', 82 + cols*100);

  //implementación del tablero en el DOM

  document.getElementById("game_board").innerHTML = html;

  //Generación de la mazmorra

  var array = roomsGenerator();

  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      if(array[i][j] == 'w') {
        document.getElementById(pad(j) + pad(i)).classList.add('wall_tile');
        document.getElementById(pad(j) + pad(i)).classList.add('empty_tile');
      }
    }
  }

  //Situamos al personaje en el punto central
  
  var warrior = document.getElementById(posX + posY)

  function setWarrior(w) {
    w.classList.add('warrior_tile');
    w.classList.remove('empty_tile');
  }

  function cleanWarrior(w) {
    w.classList.add('empty_tile');
    w.classList.remove('warrior_tile');
  }

  setWarrior(warrior);

  //Situamos la cámara en el punto central
  
  window.scrollTo(warrior.getBoundingClientRect().left - window.innerWidth / 2 + 50, warrior.getBoundingClientRect().top - window.innerHeight / 2 + 50);
  
  //Movemos al guerrero

  $(document).on('keydown', function(event) {
    if ( event.which == 65 && parseInt(posX) - 1 >= 0) {
      cleanWarrior(warrior);
      posX = pad(parseInt(posX) - 1);
      warrior = document.getElementById(posX + posY)
      setWarrior(warrior);
    } else if (event.which == 87 && parseInt(posY) - 1 >= 0) {
      cleanWarrior(warrior);
      posY = pad(parseInt(posY) - 1);
      warrior = document.getElementById(posX + posY)
      setWarrior(warrior);
    } else if (event.which == 68 && parseInt(posX) + 1 < cols) {
      cleanWarrior(warrior);
      posX = pad(parseInt(posX) + 1);
      warrior = document.getElementById(posX + posY)
      setWarrior(warrior);
    } else if (event.which == 83 && parseInt(posY) + 1 < rows) {  
      cleanWarrior(warrior);
      posY = pad(parseInt(posY) + 1);
      warrior = document.getElementById(posX + posY)
      setWarrior(warrior);
    } 
  })
})