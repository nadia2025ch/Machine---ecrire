// symbols.mjs
// Two implementations provided for classroom comparison:
//  - Array-based (simple, idiomatic for contiguous numeric indexes)
//  - Map-based   (teaches Map API: set/get/has/delete/iteration)

// Exported symbols are intentionally small and explicit so students
// can read and compare both approaches.

export const AZERTY_30 = [
  // row 1 (1-10)
  "A",
  "Z",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  // row 2 (11-20)
  "Q",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  // row 3 (21-30)
  "W",
  "X",
  "C",
  "V",
  "B",
  "N",
  ",",
  ";",
  ":",
  "?",
];

export const QWERTY_30 = [
  // row 1 (1-10)
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  // row 2 (11-20)
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  ":",
  // row 3 (21-30) - M immediately after N
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  ",",
  ".",
  "/",
];

// Map-based implementation only (simple, explicit for classroom use)
export function buildSymbolMap(count = 30) {
  const map = new Map();
  for (let i = 1; i <= count; i++) {
    const az = AZERTY_30[i - 1] ?? "";
    const qw = QWERTY_30[i - 1] ?? "";
    map.set(i, { az, qw });
  }
  return map;
}

// Single exported SYMBOL_MAP and lookup function for students to use.
export const SYMBOL_MAP = buildSymbolMap(30);

export function numberToSymbol(layout, n) {
  const entry = SYMBOL_MAP.get(n);
  if (!entry) return "";
  return layout === "AZERTY" ? entry.az : entry.qw;
}
