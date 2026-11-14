/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
  /* Tic Tac Toe demosu: char[3][3] tahtası */
(function () {
  var EN = (function(){ var d = document.getElementById("ds-deck"); return !!d && String(d.getAttribute("lang")).toLowerCase().indexOf("en") === 0; })();
  function tx(tr, en) { return EN ? en : tr; }
  var BOARD = tx("tahta", "board");
  document.querySelectorAll('.ds-deck [data-demo="b02-ttt"]').forEach(function (demo) {
    var grid = demo.querySelector(".b02-ttt");
    var status = demo.querySelector(".ds-deck__status");
    var LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
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
      board = [" "," "," "," "," "," "," "," "," "]; player = "X"; over = false;
      buttons.forEach(function (b, k) { b.textContent = ""; b.classList.remove("is-win"); label(k); });
      status.innerHTML = tx("Sıra <b>X</b> oyuncusunda. Bir hücreye tıkla.", "<b>X</b> to move. Click a cell.");
    }
    function play(k) {
      if (over) return;
      var r = Math.floor(k / 3), c = k % 3;
      if (board[k] !== " ") { status.innerHTML = BOARD + "[" + r + "][" + c + "]" + tx(" dolu, başka hücre seç.", " is taken; pick another cell."); return; }
      board[k] = player; buttons[k].textContent = player; label(k);
      var msg = "<b>" + BOARD + "[" + r + "][" + c + "] = '" + player + "'</b>";
      var win = LINES.filter(function (L) { return L.every(function (i) { return board[i] === player; }); })[0];
      if (win) {
        win.forEach(function (i) { buttons[i].classList.add("is-win"); });
        status.innerHTML = msg + " → " + player + tx(" kazandı!", " wins!"); over = true; return;
      }
      if (board.indexOf(" ") < 0) { status.innerHTML = msg + tx(" → berabere.", " → draw."); over = true; return; }
      player = player === "X" ? "O" : "X";
      status.innerHTML = msg + tx(" · sıra ", " · next: ") + player;
    }
    demo.querySelector('[data-op="reset"]').addEventListener("click", reset);
    reset();
  });
})();
