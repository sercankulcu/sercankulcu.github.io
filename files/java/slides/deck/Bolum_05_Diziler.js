/* Bölüm 3.3: Diziler - Tic Tac Toe demosu (char[3][3] tahtası) */
(function () {
  var EN = String((document.getElementById("ds-deck") || document.documentElement).getAttribute("lang")).toLowerCase().indexOf("en") === 0;
  var tx = function (tr, en) { return EN ? en : tr; };
  var B = tx("tahta", "board");
  document.querySelectorAll('.ds-deck [data-demo="j051-ttt"]').forEach(function (demo) {
    var grid = demo.querySelector(".j051-ttt");
    var status = demo.querySelector(".j051-ttt-st");
    var LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    var board, player, over, buttons = [];
    for (var k = 0; k < 9; k++) {
      (function (k) {
        var b = document.createElement("button");
        b.type = "button";
        b.addEventListener("click", function () { play(k); });
        grid.appendChild(b);
        buttons.push(b);
      })(k);
    }
    function label(k) {
      var r = Math.floor(k / 3), c = k % 3;
      buttons[k].setAttribute("aria-label", tx("satır ", "row ") + (r + 1) + tx(", sütun ", ", column ") + (c + 1) + ": " + (board[k] === " " ? tx("boş", "empty") : board[k]));
    }
    function reset() {
      board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      player = "X";
      over = false;
      buttons.forEach(function (b, k) { b.textContent = ""; b.classList.remove("is-win"); label(k); });
      status.innerHTML = tx("Sıra <b>X</b> oyuncusunda. Bir hücreye tıkla.", "Player <b>X</b> to move. Click a cell.");
    }
    function play(k) {
      if (over) return;
      var r = Math.floor(k / 3), c = k % 3;
      if (board[k] !== " ") {
        status.innerHTML = "<code>" + B + "[" + r + "][" + c + "]</code>" + tx(" dolu: başka bir hücre seç.", " is taken: pick another cell.");
        return;
      }
      board[k] = player;
      buttons[k].textContent = player;
      label(k);
      var msg = "<code>" + B + "[" + r + "][" + c + "] = '" + player + "';</code>";
      var win = LINES.filter(function (L) { return L.every(function (i) { return board[i] === player; }); })[0];
      if (win) {
        win.forEach(function (i) { buttons[i].classList.add("is-win"); });
        status.innerHTML = msg + (EN ? "<br>Congratulations, player " + player + " wins!" : "<br>Tebrikler, " + player + " oyuncusu kazandı!");
        over = true;
        return;
      }
      if (board.indexOf(" ") < 0) {
        status.innerHTML = msg + tx("<br>Oyun berabere bitti.", "<br>The game is a draw.");
        over = true;
        return;
      }
      player = player === "X" ? "O" : "X";
      status.innerHTML = msg + (EN ? "<br>Player <b>" + player + "</b> to move." : "<br>Sıra <b>" + player + "</b> oyuncusunda.");
    }
    demo.querySelector('[data-op="reset"]').addEventListener("click", reset);
    reset();
  });
})();
