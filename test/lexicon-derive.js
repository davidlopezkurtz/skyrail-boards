"use strict";

// The ONE derivation behind test/lexicon.test.js — the boards' name surface,
// read mechanically, so the declared ledger (test/lexicon-ledger.js) can be
// diffed against it. Not itself a test: `node --test "test/*.test.js"` runs
// only files ending in .test.js, and this one does not.
//
// Why this exists (docs/name-collisions-audit-2026-09-01.md, 2026-09-01): twelve
// boards, tested alone, share most of their exported names, and the same name
// means different things across the desk/city seam — `provisions` is food on
// dawnspur-line and marks on dice-at-the-places; `commitSend("dawnspur-halt")`
// validates its argument on the desk and DISCARDS it in the city; `wait()`
// is inert on every board but dawnspur-heat, where it settles the board after
// WARM has already ended the sitting. None of that is visible to a suite that
// loads one board per file. The audit's own instrument said "exactly three
// shared names"; every membership measured since put the floor higher, and
// the seam test prints the live count under the declared membership.
//
// Rules this module keeps:
//   * READ-ONLY. Every board is loaded exactly as test/<board>.test.js loads
//     it — `require("../sit/<board>/sim.js")` then `createBoard({ fresh: true })`
//     — and the derivation calls only getters and the read-only enumerators
//     (places(), buildings(), cards()). Every getter in every sim under sit/
//     reads state or calls a pure helper; that was verified by reading all
//     twelve files, and the invariant this module relies on is "a derivation
//     never commits". Driven paths live in the test, never here. Each sim
//     assigns one global on require (globalThis.<Board>); the derivation
//     never reads them.
//   * ONE instrument. The export surface is the OWN ENUMERABLE STRING KEYS of
//     the object createBoard() returns, getters included, module-level
//     createBoard/buildInfo excluded — the instrument the counts reviewer
//     used. `deriveExports()` checks that the object inherits from nothing
//     but Object.prototype, that own-names equals own-keys and that no
//     symbol keys exist, and REFUSES the board if not — `inventory()` records
//     the refusal as `{ error }` with an empty surface and the guard's first
//     test prints it, one named red per board — because an instrument that
//     silently under-counts is how "exactly three" got believed.
//   * Prefer null to a plausible number. A surface a board does not have is
//     `null`, never `[]`. A walk() body the parser cannot fully read throws,
//     naming the file, rather than returning a partial legend; so does a file
//     with letter branches and no column-0 walk(), and a letter declared twice.
//   * TWO ASSUMPTIONS THIS MODULE CANNOT CHECK, stated rather than implied.
//     (1) Every getter is pure. `deriveExports` CALLS every getter on every
//     board, so a getter with a side effect would mutate the board mid-
//     derivation and nothing here would notice; the claim that they are pure
//     is a reading of the twelve files, not a measurement. (2) A board that
//     fails to load reports something printable — a throw carrying no usable
//     message is rendered by `inventory()` rather than trusted.
//   * Nothing here reads a clock or a die. The boards' own createBoard()
//     default their roll to the runtime's random source; the derivation never
//     calls a function that rolls, and the test injects a fixed roll wherever
//     it drives one.

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const SIT = path.join(ROOT, "sit");
const PUBLIC = path.join(ROOT, "public");
const TEST_DIR = __dirname;

function dirsOf(root) {
  return fs.readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

/** Every board directory under sit/ — the derivation's universe. */
function boardDirs() {
  return dirsOf(SIT);
}

/** Directories under public/ with no sit/ twin — live boards this guard cannot load. */
function publicOnlyDirs() {
  const sit = new Set(boardDirs());
  return dirsOf(PUBLIC).filter((d) => !sit.has(d));
}

function simPath(board) {
  return path.join(SIT, board, "sim.js");
}

function load(board) {
  return require(simPath(board));
}

/**
 * The opening, loaded the way the board's own test loads it. `extra` lets a
 * driven test inject a fixed `roll`; the derivation passes nothing extra.
 * heat and scale honour `fresh`; every other board reads only marks / roll
 * and ignores it — the derived key set is state-independent either way.
 */
function fresh(board, extra) {
  return load(board).createBoard(Object.assign({ fresh: true }, extra || {}));
}

/** Raw sim source, LF-normalised. */
function simSource(board) {
  return fs.readFileSync(simPath(board), "utf8").replace(/\r\n/g, "\n");
}

/**
 * ONE scanner, not a chain of regexes, because a chain cannot know which
 * delimiter opened first. It walks the source once and removes comments,
 * and — when `blankLiterals` is set — the CONTENTS of every string, template
 * and regex literal, keeping the delimiters and every newline so the shape
 * and the line numbering survive.
 *
 * The chain it replaces stripped "…" and '…' and missed the template
 * literal, so a pinned line parked in one satisfied its pin: critic 2's n01
 * made scale's carry pay double under a green guard, and three sims already
 * contain backticks.
 *
 * A regex literal is recognised by the classic heuristic — a "/" opens one
 * unless the previous significant character could end a value — and that is
 * the one place this scanner can be fooled (`a / b / c` reads as a regex).
 * It matters only for the walk-DSL check, where test files carry regexes
 * containing quotes, which is why the naive chain could not be used there.
 */
function scan(src, blankLiterals) {
  const isValueEnd = (c) => c !== "" && /[A-Za-z0-9_$)\]]/.test(c);
  let out = "";
  let prev = "";
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    const d = src[i + 1];
    if (c === "/" && d === "/") {
      while (i < src.length && src[i] !== "\n") i += 1;
      continue;
    }
    if (c === "/" && d === "*") {
      i += 2;
      while (i < src.length && !(src[i] === "*" && src[i + 1] === "/")) {
        if (src[i] === "\n") out += "\n";
        i += 1;
      }
      i += 2;
      continue;
    }
    const opensLiteral = c === '"' || c === "'" || c === "\u0060" || (c === "/" && !isValueEnd(prev));
    if (opensLiteral) {
      const close = c;
      let inClass = false;
      let body = "";
      i += 1;
      while (i < src.length) {
        const ch = src[i];
        if (ch === "\\") { body += src.slice(i, i + 2); i += 2; continue; }
        if (close === "/" && ch === "[") inClass = true;
        else if (close === "/" && ch === "]") inClass = false;
        else if (ch === close && !inClass) { i += 1; break; }
        else if (ch === "\n" && close !== "\u0060") break;
        body += ch;
        i += 1;
      }
      out += c + (blankLiterals ? body.replace(/[^\n]/g, "") : body) + close;
      prev = close;
      continue;
    }
    out += c;
    if (!/\s/.test(c)) prev = c;
    i += 1;
  }
  return out;
}

/** Comments removed; the contents of strings, templates and regexes kept. */
function stripComments(src) {
  return scan(src, false);
}

/**
 * Comments removed AND every literal emptied — the subject for source pins,
 * so a comment quoting a defect by name, or a string or template carrying
 * the old line, cannot satisfy a pin on the code.
 */
function stripForPins(src) {
  return scan(src, true);
}

function simCode(board) {
  return stripForPins(simSource(board));
}

function isPrimitive(v) {
  return v === null || typeof v === "string" || typeof v === "number" || typeof v === "boolean";
}

/**
 * The export surface of one board at the opening.
 *
 *   { <name>: { kind: "getter", opening: <primitive> }          — primitive getter
 *   { <name>: { kind: "getter", keys: [...] } }                  — object getter (own keys, sorted)
 *   { <name>: { kind: "getter", array: <length> } }              — array getter
 *   { <name>: { kind: "method", arity: <Function.length> } }
 *   { <name>: { kind: "value", opening: <primitive|undefined> } }
 */
function deriveExports(board, b) {
  // OWN keys only. An object whose members live on a prototype would derive
  // as an empty surface with no error (the critic's m12: every export moved
  // to a prototype, four tests red with the wrong diagnosis). Refuse it.
  const proto = Object.getPrototypeOf(b);
  if (proto !== Object.prototype && proto !== null) {
    throw new Error(
      `lexicon-derive: ${board}'s board object inherits from a prototype with keys ` +
        `[${Object.getOwnPropertyNames(proto).join(",")}] — the instrument reads OWN keys only; ` +
        `widen it before trusting any count.`,
    );
  }
  const keys = Object.keys(b);
  const names = Object.getOwnPropertyNames(b);
  const symbols = Object.getOwnPropertySymbols(b);
  if (names.length !== keys.length || symbols.length !== 0) {
    throw new Error(
      `lexicon-derive: ${board} has ${names.length} own names / ${keys.length} enumerable keys / ` +
        `${symbols.length} symbol keys — the instrument (own enumerable string keys) no longer ` +
        `sees the whole surface. Widen the instrument before trusting any count.`,
    );
  }
  const out = {};
  for (const name of keys) {
    const d = Object.getOwnPropertyDescriptor(b, name);
    if (typeof d.get === "function") {
      const v = d.get.call(b);
      if (isPrimitive(v)) out[name] = { kind: "getter", opening: v };
      else if (Array.isArray(v)) out[name] = { kind: "getter", array: v.length };
      else if (typeof v === "object") out[name] = { kind: "getter", keys: Object.keys(v).sort() };
      else out[name] = { kind: "getter", opening: undefined };
    } else if (typeof d.value === "function") {
      out[name] = { kind: "method", arity: d.value.length };
    } else {
      out[name] = { kind: "value", opening: isPrimitive(d.value) ? d.value : undefined };
    }
  }
  return out;
}

/** Per card from cards(): the numbers a spec author reads, and whether `stake` is a key. */
function deriveCards(b) {
  if (typeof b.cards !== "function") return null;
  return b.cards().map((c) => ({
    id: c.id,
    sendable: c.sendable,
    pays: c.pays,
    provisions: c.provisions,
    toll: c.toll,
    hasStake: Object.prototype.hasOwnProperty.call(c, "stake"),
    keys: Object.keys(c).sort(),
  }));
}

/**
 * One board's whole derived surface. `exports` is the instrument; the rest
 * are the nested places the audit found meaning hiding one level down.
 */
function deriveBoard(board) {
  const b = fresh(board);
  const has = (name) => Object.prototype.hasOwnProperty.call(b, name);
  return {
    board,
    exports: deriveExports(board, b),
    placeIds: typeof b.places === "function" ? b.places() : null,
    buildingIds: typeof b.buildings === "function" ? b.buildings() : null,
    consistAt: has("consistAt") ? b.consistAt : null,
    cards: deriveCards(b),
  };
}

/**
 * Every board's derived surface, keyed by directory name. A board that cannot
 * be derived — its sim throws at require, or the instrument refuses it — is
 * recorded as `{ board, error }` with an EMPTY surface rather than thrown, so
 * the guard reports ONE named red (its first test lists every error) and the
 * rest of the file still runs. Before this, a throwing board took the whole
 * file down as `tests 1 / fail 1` and moved the suite's published total
 * (the critic's m08 / m11).
 */
function inventory() {
  const out = {};
  for (const board of boardDirs()) {
    try {
      out[board] = deriveBoard(board);
    } catch (e) {
      // `e.message` is undefined for `throw "…"` and "" for `new Error("")`.
      // Both are falsy, so the board dropped straight out of the very test
      // written to name it and the only red left was a FALSE sentence from
      // the wait row — M5's failure mode reintroduced by M5's fix (critic 2's
      // n03 / n03b). The detail below is therefore never empty.
      const detail = e && typeof e.message === "string" && e.message !== ""
        ? (e.name || "Error") + ": " + e.message
        : "threw a value with no usable message: " + Object.prototype.toString.call(e) + " " + String(e);
      out[board] = { board, error: detail, exports: {}, placeIds: null, buildingIds: null, consistAt: null, cards: null };
    }
  }
  return out;
}

/** name -> sorted list of boards exporting it. */
function nameIndex(inv) {
  const index = {};
  for (const board of Object.keys(inv)) {
    for (const name of Object.keys(inv[board].exports)) {
      (index[name] = index[name] || []).push(board);
    }
  }
  for (const name of Object.keys(index)) index[name].sort();
  return index;
}

/**
 * The seam under a DECLARED membership. Returns
 *   { cross: [names on >=1 desk AND >=1 city board],
 *     within: { desk: [names on >=2 desk boards and no city board],
 *               city: [names on >=2 city boards and no desk board] },
 *     unplaced: [boards in the inventory that are in neither list] }
 * Membership is never inferred here — three sweeps inferred three different
 * memberships from the headers and the seam count moved 5 / 22 / 31 with it.
 */
function seam(inv, desk, city) {
  const lineage = {};
  for (const b of desk) lineage[b] = "desk";
  for (const b of city) lineage[b] = "city";
  const unplaced = Object.keys(inv).filter((b) => !lineage[b]);
  const index = nameIndex(inv);
  const cross = [];
  const within = { desk: [], city: [] };
  for (const name of Object.keys(index).sort()) {
    const boards = index[name];
    const sides = new Set(boards.map((b) => lineage[b]).filter(Boolean));
    if (sides.has("desk") && sides.has("city")) cross.push(name);
    else if (boards.length >= 2 && sides.size === 1) within[[...sides][0]].push(name);
  }
  return { cross, within, unplaced, index };
}

/** A compact one-line signature for failure messages: `getter=3`, `method/1`, `getter{keys}`. */
function signature(entry) {
  if (!entry) return "(absent)";
  if (entry.kind === "method") return `method/${entry.arity}`;
  if (entry.kind === "getter") {
    if ("opening" in entry) return `getter=${JSON.stringify(entry.opening)}`;
    if ("keys" in entry) return `getter{${entry.keys.join(",")}}`;
    if ("array" in entry) return `getter[${entry.array}]`;
  }
  return `${entry.kind}=${JSON.stringify(entry.opening)}`;
}

// ---------------------------------------------------------------------------
// The DOM surface — sit/<board>/index.html, the same bytes public/ ships
// (test/boards-index.test.js asserts the identity). Three token sets:
//   ids        — every `id="..."`
//   toggles    — the first argument of every classList.toggle("...")
//   classNames — every string literal on the right of a `.className = ...;`
//                that is a VALUE, not a comparison operand: `"home"` in
//                `board.landed ? "home" : "gone"` is in; `"mosswake"` in
//                `board.consistAt === "mosswake" ? ...` is not. Trimmed,
//                empties dropped.
// That is the whole instrument. A class set any other way (classList.add,
// a template string, a static class="" attribute) is NOT seen here, and a
// row that needs one of those is a row this derivation cannot grade.
// ---------------------------------------------------------------------------

function classNameLiterals(expr) {
  const out = [];
  const lit = /"([^"]*)"/g;
  let m;
  while ((m = lit.exec(expr))) {
    const before = expr.slice(0, m.index).replace(/\s+$/, "");
    if (/[!=]==$/.test(before)) continue; // a comparison operand, not a class
    const value = m[1].trim();
    if (value !== "") out.push(value);
  }
  return out;
}

function deriveDom(board) {
  const file = path.join(SIT, board, "index.html");
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, "utf8");
  const uniq = (arr) => [...new Set(arr)].sort();
  const ids = uniq([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  const toggles = uniq([...html.matchAll(/classList\.toggle\("([^"]+)"/g)].map((m) => m[1]));
  const classNames = uniq(
    [...html.matchAll(/\.className\s*=\s*([^;]+);/g)].flatMap((m) => classNameLiterals(m[1])),
  );
  return { ids, toggles, classNames };
}

function domInventory() {
  const out = {};
  for (const board of boardDirs()) out[board] = deriveDom(board);
  return out;
}

// ---------------------------------------------------------------------------
// The walk() DSL in test/*.test.js — one letter per commit, a different
// legend per file. `S` is commitSite on two files and commitSend on three;
// `C` is commitCarry, commitCast or commitCollect depending on the file. The
// bodies are one regular shape, and the parser REFUSES anything else: it
// counts `ch === "` branches in the body and throws if it parsed fewer.
// ---------------------------------------------------------------------------

function testFiles() {
  return fs.readdirSync(TEST_DIR).filter((f) => f.endsWith(".test.js")).sort();
}

/**
 * The legend of one test file's walk(), or null if the file has none.
 *   { "S": "commitSend()", "+": "commitMeet() [roll 0]", ".": "wait() === false", ... }
 */
function deriveWalk(file) {
  const raw = fs.readFileSync(path.join(TEST_DIR, file), "utf8").replace(/\r\n/g, "\n");
  // A comment can neither declare nor retire a branch, so the shape is judged
  // with comments gone; and a file with NO walk is judged on its code alone,
  // so prose quoting the DSL inside a string is not a hard throw. Both fired
  // at the wrong author with a wrong diagnosis before (critic 2's n07 / n08).
  const src = stripComments(raw);
  const fn = /\nfunction walk\([^)]*\)\s*\{([\s\S]*?)\n\}/.exec(src);
  if (!fn) {
    // Letter branches with no column-0 `function walk(` is a walk of a shape
    // this parser does not read (the critic's m14: an arrow-function walk).
    // Silence here would be an under-count; refuse instead.
    if (/\bch === "/.test(stripForPins(raw))) {
      throw new Error(
        `lexicon-derive: test/${file} has letter branches (ch === "...") but no column-0 function walk( — ` +
          `a walk of a shape the derivation does not read; teach it the shape or rename the DSL.`,
      );
    }
    return null;
  }
  const body = fn[1];
  const branch =
    /if \(ch === "(.)"\)\s*(?:\{\s*h\.ctl\.next = (\d+);\s*)?ok = (?:h\.b|b)\.(\w+)\(([^)]*)\)( === false)?;/g;
  const legend = {};
  let parsed = 0;
  for (const m of body.matchAll(branch)) {
    parsed += 1;
    if (legend[m[1]] !== undefined) {
      // The running walk takes the FIRST matching branch; a legend that kept
      // the last would certify the wrong verb (the critic's m06).
      throw new Error(
        `lexicon-derive: test/${file} walk() declares "${m[1]}" twice — the walk runs the FIRST branch; ` +
          `refusing to derive an ambiguous legend.`,
      );
    }
    legend[m[1]] = m[3] + "(" + m[4] + ")" + (m[2] !== undefined ? " [roll " + m[2] + "]" : "") + (m[5] ? " === false" : "");
  }
  const branches = (body.match(/ch === "/g) || []).length;
  if (branches !== parsed) {
    throw new Error(
      `lexicon-derive: test/${file} walk() has ${branches} letter branches and the parser read ${parsed}. ` +
        `This walk has a shape the derivation does not understand — do not declare a legend for it ` +
        `until the parser is taught the shape; a guessed legend is worse than none.`,
    );
  }
  return legend;
}

function walkInventory() {
  const out = {};
  for (const file of testFiles()) {
    const legend = deriveWalk(file);
    if (legend) out[file] = legend;
  }
  return out;
}

module.exports = {
  ROOT,
  SIT,
  PUBLIC,
  boardDirs,
  publicOnlyDirs,
  load,
  fresh,
  simSource,
  stripComments,
  stripForPins,
  simCode,
  deriveExports,
  deriveCards,
  deriveBoard,
  inventory,
  nameIndex,
  seam,
  signature,
  deriveDom,
  domInventory,
  testFiles,
  deriveWalk,
  walkInventory,
};
