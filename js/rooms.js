var roomsGenerator = function() {

        var el = document.getElementById('view');
      
        function append(el, text) {
          var p = document.createElement('p');
          var t = document.createTextNode(text); 
        }
        
        function updateMap(el) {
          
          var floorMap = DungeonGenerator.generate({
            maxRoomSize: 7,
            minRoomSize: 7,
            padding: 2,
            rooms: 25,
            rows: 99,
            cols: 99
          });
          
          var arr = [];
          
          floorMap.forEach(function(e){
            var txt = e.map(function(cell){
              return cell.cellType === 'wall' ? 'w' : 'r'})
              .join('');
              append(el,txt);
              var q = txt.split('');
              arr.push(q);
            }
          )
          return arr
        };
      
        return updateMap(el);
        console.log(updateMap(el).length)
        console.log(updateMap(el)[09])
        console.log(updateMap(el)[10])
        console.log(updateMap(el)[11])
        
      
};
