import { numberToSymbol } from "./symbols.mjs";

const container = document.querySelector(".container");
const choices = document.querySelector(".choices");

// Explicit 30-key mapping arrays are used below (AZERTY_30 / QWERTY_30).
// Smaller one-off arrays above were removed to keep the file focused.
let currentLayout = "AZERTY";

// Use the single Map-based lookup exported by `symbols.mjs`.

// Build a Map for indexes 1..N mapping to [azertySymbol, qwertySymbol]
// Use explicit 30-key rows to match a real keyboard layout
// Mapping and lookup provided by `symbols.mjs`.

// Populate visible labels from preserved numeric index -> keyboard symbols
const initLetters = () => {
  const cells = container.querySelectorAll(".container > button.key");
  cells.forEach((cell) => {
    // read numeric index from data-index (canonical)
    const num = parseInt(cell.dataset.index, 10);
    if (!Number.isFinite(num)) return;
    const symbol = numberToSymbol(currentLayout, num);
    // preserve numeric index explicitly
    cell.dataset.index = String(num);
    // store visible symbol in data-symbol (do not overwrite numeric id)
    cell.dataset.symbol = symbol;
    // update accessible label and visible text
    cell.textContent = symbol;
    cell.setAttribute("aria-label", symbol || `key-${num}`);
    cell.setAttribute(
      "aria-pressed",
      String(cell.classList.contains("selected"))
    );
  });
};

// Handle key presses and special keys (ESP / DEL)

const handleSelect = function (event) {
  const targetElement = event.target;
  const key = targetElement.closest(".container > button.key");
  if (!key) return;

  // Visual short press: add `pressed` class for 200ms (no persistent color)
  key.classList.add("pressed");
  setTimeout(() => key.classList.remove("pressed"), 800);

  // DEL: remove the last appended character (one chip)
  if (key.classList.contains("del")) {
    const last = choices.lastElementChild;
    if (last) choices.removeChild(last);
    return;
  }

  // SPACE (ESP): append a space chip
  if (key.classList.contains("space")) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "choice";
    // store non-breaking space so it renders visibly but behaves like a space
    chip.textContent = "\u00A0";
    chip.dataset.value = " ";
    chip.disabled = true;
    chip.setAttribute("aria-hidden", "true");
    choices.appendChild(chip);
    return;
  }

  // Regular key: numeric-indexed keys produce their mapped symbol
  const idx = parseInt(key.dataset.index, 10);
  if (!Number.isFinite(idx)) return;
  const symbol = numberToSymbol(currentLayout, idx) || key.dataset.symbol || "";

  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "choice";
  chip.textContent = symbol;
  chip.disabled = true;
  chip.setAttribute("aria-hidden", "true");
  choices.appendChild(chip);
};

// load saved layout from localStorage if present
try {
  const saved = localStorage.getItem("keyboardLayout");
  if (saved === "QWERTY" || saved === "AZERTY") {
    currentLayout = saved;
  }
} catch (e) {
  /* ignore localStorage errors */
}

const setLayout = (layout) => {
  currentLayout = layout === "QWERTY" ? "QWERTY" : "AZERTY";
  initLetters();
  if (container) {
    container.classList.toggle("azerty", currentLayout === "AZERTY");
    container.classList.toggle("qwerty", currentLayout === "QWERTY");
  }
  const btn = document.getElementById("layoutToggle");
  if (btn) {
    btn.textContent =
      currentLayout === "AZERTY" ? "Switch to QWERTY" : "Switch to AZERTY";
    btn.setAttribute("aria-pressed", String(currentLayout === "QWERTY"));
  }
  try {
    localStorage.setItem("keyboardLayout", currentLayout);
  } catch (e) {
    /* ignore */
  }
};

// wire toggle button
const toggleBtn = document.getElementById("layoutToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const next = currentLayout === "AZERTY" ? "QWERTY" : "AZERTY";
    setLayout(next);
  });
}

// initialize layout and UI
setLayout(currentLayout);
container.addEventListener("click", handleSelect, false);
