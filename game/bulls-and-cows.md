---
layout: single
title: "Bulls & Cows"
permalink: /game/bulls-and-cows/
author_profile: true
---

Guess the hidden **4-digit number**.

Each digit is different.

- **Bull** — correct digit in the correct position.
- **Cow** — correct digit in the wrong position.

<div id="bulls-cows-game">

  <div class="bc-stats">
    <span>Attempts: <strong id="bc-attempts">0</strong></span>
    <span>Best: <strong id="bc-best">—</strong></span>
  </div>

  <div class="bc-input-row">
    <input
      id="bc-guess"
      type="text"
      inputmode="numeric"
      maxlength="4"
      autocomplete="off"
      aria-label="Enter a four digit guess"
      placeholder="1234"
    >
    <button id="bc-submit" type="button">Guess</button>
  </div>

  <p id="bc-message" class="bc-message" aria-live="polite">
    Enter four different digits.
  </p>

  <div id="bc-history"></div>

  <button id="bc-new-game" class="bc-secondary" type="button">
    New Game
  </button>

</div>

<style>
#bulls-cows-game {
  max-width: 620px;
  margin: 2rem 0;
}

.bc-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.bc-input-row {
  display: flex;
  gap: .6rem;
  margin-bottom: .8rem;
}

#bc-guess {
  width: 150px;
  padding: .65rem .8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font: inherit;
  font-size: 1.1rem;
  letter-spacing: .15rem;
}

#bc-submit,
#bc-new-game {
  padding: .65rem 1rem;
  border: 1px solid #888;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

#bc-submit:hover,
#bc-new-game:hover {
  background: rgba(127,127,127,.08);
}

#bc-submit:disabled {
  opacity: .5;
  cursor: default;
}

.bc-message {
  min-height: 1.5rem;
  margin: .8rem 0 1.2rem;
}

#bc-history {
  margin: 1rem 0 1.5rem;
}

.bc-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 1rem;
  align-items: center;
  padding: .55rem 0;
  border-bottom: 1px solid rgba(127,127,127,.2);
}

.bc-number {
  font-family: monospace;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: .12rem;
}

.bc-result {
  font-size: .95rem;
}

.bc-bull {
  font-weight: 700;
}

.bc-secondary {
  margin-top: .25rem;
}

@media (max-width: 480px) {
  .bc-input-row {
    align-items: stretch;
  }

  #bc-guess {
    min-width: 0;
    width: 50%;
  }

  #bc-submit {
    flex: 1;
  }
}
</style>

<script>
(() => {
  const guessInput = document.getElementById("bc-guess");
  const submitButton = document.getElementById("bc-submit");
  const newGameButton = document.getElementById("bc-new-game");
  const history = document.getElementById("bc-history");
  const message = document.getElementById("bc-message");
  const attemptsElement = document.getElementById("bc-attempts");
  const bestElement = document.getElementById("bc-best");

  let secret = "";
  let attempts = 0;
  let finished = false;

  function createSecret() {
    const digits = ["0","1","2","3","4","5","6","7","8","9"];

    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }

    if (digits[0] === "0") {
      const swapIndex = 1 + Math.floor(Math.random() * 9);
      [digits[0], digits[swapIndex]] =
        [digits[swapIndex], digits[0]];
    }

    return digits.slice(0, 4).join("");
  }

  function getBest() {
    const value = Number(localStorage.getItem("bullsCowsBest"));
    return value > 0 ? value : null;
  }

  function updateBestDisplay() {
    const best = getBest();
    bestElement.textContent = best ?? "—";
  }

  function saveBest() {
    const best = getBest();

    if (!best || attempts < best) {
      localStorage.setItem("bullsCowsBest", String(attempts));
    }

    updateBestDisplay();
  }

  function startGame() {
    secret = createSecret();
    attempts = 0;
    finished = false;

    attemptsElement.textContent = "0";
    history.innerHTML = "";
    message.textContent = "Enter four different digits.";

    guessInput.value = "";
    guessInput.disabled = false;
    submitButton.disabled = false;

    updateBestDisplay();
    guessInput.focus();
  }

  function validateGuess(value) {
    if (!/^\d{4}$/.test(value)) {
      return "Enter exactly four digits.";
    }

    if (new Set(value).size !== 4) {
      return "Each digit must be different.";
    }

    return "";
  }

  function scoreGuess(guess) {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < 4; i++) {
      if (guess[i] === secret[i]) {
        bulls++;
      } else if (secret.includes(guess[i])) {
        cows++;
      }
    }

    return { bulls, cows };
  }

  function addHistory(guess, bulls, cows) {
    const row = document.createElement("div");
    row.className = "bc-row";

    const number = document.createElement("span");
    number.className = "bc-number";
    number.textContent = guess;

    const result = document.createElement("span");
    result.className = "bc-result";

    const bullText = bulls === 1 ? "Bull" : "Bulls";
    const cowText = cows === 1 ? "Cow" : "Cows";

    result.innerHTML =
      `<span class="bc-bull">${bulls} ${bullText}</span> · ${cows} ${cowText}`;

    row.appendChild(number);
    row.appendChild(result);

    history.prepend(row);
  }

  function makeGuess() {
    if (finished) return;

    const guess = guessInput.value.trim();
    const validationError = validateGuess(guess);

    if (validationError) {
      message.textContent = validationError;
      guessInput.focus();
      return;
    }

    attempts++;
    attemptsElement.textContent = String(attempts);

    const { bulls, cows } = scoreGuess(guess);

    addHistory(guess, bulls, cows);

    if (bulls === 4) {
      finished = true;

      message.textContent =
        `Correct. You found ${secret} in ${attempts} ` +
        `${attempts === 1 ? "attempt" : "attempts"}.`;

      guessInput.disabled = true;
      submitButton.disabled = true;

      saveBest();
      return;
    }

    if (bulls === 0 && cows === 0) {
      message.textContent = "None of those digits are in the number.";
    } else {
      message.textContent = "Keep going.";
    }

    guessInput.value = "";
    guessInput.focus();
  }

  guessInput.addEventListener("input", () => {
    guessInput.value = guessInput.value
      .replace(/\D/g, "")
      .slice(0, 4);
  });

  guessInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      makeGuess();
    }
  });

  submitButton.addEventListener("click", makeGuess);
  newGameButton.addEventListener("click", startGame);

  startGame();
})();
</script>