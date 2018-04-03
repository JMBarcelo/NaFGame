var roomsGenerator = function() {

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
        
        floorMap.forEach(function(e){
        txt = e.map(function(cell){
            return cell.cellType === 'wall' ? 'w' : 'r'}).join('');
            q = txt.split('');
            arr.push(q);
        })
        return arr
    };
    return updateMap();
};
