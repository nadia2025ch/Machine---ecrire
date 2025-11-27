# Keyboard mappings (30-key layout)

This project uses explicit 30-key mappings for AZERTY and QWERTY layouts. The mappings below are named `AZERTY_30` and `QWERTY_30` and correspond to indexes 1..30 (useful for the `data-index` values in the DOM).

AZERTY_30 (1..30):

- Row 1 (1–10): A Z E R T Y U I O P
- Row 2 (11–20): Q S D F G H J K L M
- Row 3 (21–30): W X C V B N , ; : ?

QWERTY_30 (1..30):

- Row 1 (1–10): Q W E R T Y U I O P
- Row 2 (11–20): A S D F G H J K L :
- Row 3 (21–30): Z X C V B N M , . /

Delegation and implementation notes

- The code uses a Map (`SYMBOL_MAP`) that delegates the mapping for each numeric index to a 2-element array: `[azertySymbol, qwertySymbol]`.
  - Example: `SYMBOL_MAP.get(1)` returns `['A', 'Q']` so `get(1)[0]` is AZERTY for index 1, and `get(1)[1]` is QWERTY for index 1.
  - The Map is explicitly built from `AZERTY_30` and `QWERTY_30` arrays so keys have fixed, predictable positions (no cycling surprises).
- The UI initialization reads the numeric index from `data-index` (or falls back to `data-value` for legacy cells) and uses the Map to set visible labels. This preserves a stable numeric identifier while allowing the visible symbol to switch between layouts.
- The layout toggle updates a `currentLayout` flag and re-invokes initialization; the Map is the single source of truth for what symbol belongs to each index under each layout.

Why this delegation is useful

- Separation of concerns: numeric indices remain stable (useful for logic, storage, and selection), while the visible representation (AZERTY vs QWERTY) is delegated to the Map.
- Easy to maintain: changing a specific key mapping is a single edit to the corresponding array or Map entry.
- Predictability: explicit arrays avoid subtle off-by-one or wrap-around bugs when the two layout symbol sets have different lengths.

If you want to: trim the DOM to exactly 30 cells, place specific punctuation at explicit indexes, or persist layout selection across reloads, tell me and I will patch the files accordingly.
