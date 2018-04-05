function Map(cols, rows) {
  this.cols = cols;
  this.rows = rows;
  this.createMap();
}

Map.prototype.createMap = function() {
  this.html = "";

  for (i = 0; i < this.rows; i++) {
    this.html += "<div>";
    for (j = 0; j < this.cols; j++) {
      this.html += '<div class="empty_tile">&nbsp</div>';
    }
    this.html += "</div>";
  }

  $("body").css("min-width", 82 + this.cols * 100);
  $("body").css("max-width", 82 + this.cols * 100);

  $("#game_board").html(this.html);
};
