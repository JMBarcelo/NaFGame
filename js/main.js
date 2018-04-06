$(document).ready(function() {
  var game = new Game(30, 30);

  $(document).on("keydown", function(event) {
    game.move(event);
  });
});
