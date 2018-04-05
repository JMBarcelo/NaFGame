$(document).ready(function() {
  var game = new Game();

  $(document).on("keydown", function(event) {
    game.move(event);
  });
});
