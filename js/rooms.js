var roomsGenerator = function() {

    //Función que crea el array a modo de mapa con los parámetros iniciales

  function updateMap() {
    var floorMap = DungeonGenerator.generate({
      maxRoomSize: 10,
      minRoomSize: 7,
      padding: 2,
      rooms: 99,
      rows: cols,
      cols: rows
    });

    var arr = [];
    var txt;
    var q;

    //Me genero un array con las letras w para paredes y r para espacios de habitación

    floorMap.forEach(function(e) {
      txt = e
        .map(function(cell) {
          return cell.cellType === "wall" ? "w" : "r";
        })
        .join("");
      q = txt.split("");
      arr.push(q);
    });
    return arr;
  }
  return updateMap();
};
