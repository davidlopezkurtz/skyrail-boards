"use strict";

const ROWS = 5;
const COLS = 4;
const SLOTS = ROWS * COLS;
const GUN_CD = 280;
const GUN_ACROSS = 1.28;
const MORTAR_CD = 760;
const MORTAR_ACROSS = 0.72;
const HUNT_SPEED = 0.00038;
const FAR_SLOW = 0.78;
const SPIKE_SLOW = 0.15;
const GUN_FLIGHT = 88;
const MORTAR_FLIGHT = 520;
const HOLD_AFTER = 220;

const WAVE_SPAWNS = [
  [[500, 1, "c"], [1600, 2, "c"], [2700, 1, "c"], [3800, 2, "c"]],
  [[350, 1, "c"], [480, 3, "l"], [1200, 2, "c"], [1700, 3, "l"], [2100, 1, "c"], [3000, 2, "c"]],
  [[220, 1, "c"], [320, 3, "l"], [700, 2, "c"], [1200, 3, "l"], [1400, 1, "c"], [1900, 2, "c"], [2300, 3, "l"], [2600, 1, "c"], [3100, 2, "c"], [3600, 3, "l"], [3900, 1, "c"]]
];

// Geometry: equal fourths of dirt x=0.12..0.78
const DIRT_L = 0.12;
const DIRT_R = 0.78;
const CELL_W = (DIRT_R - DIRT_L) / COLS; // 0.165
const SPAWN_X = 0.06; // hot ~9% left of dirt
const CAR_X = 0.845;  // line to the right of dirt

// 5 equal rows; h large enough that gun reaches adjacent, mortar does not
const CELL_H = 0.184;
function carY(r) { return (r + 0.5) / 5; } // 0.1, 0.3, 0.5, 0.7, 0.9  Δ=0.2

function slotXY(i) {
  const r = Math.floor(i / COLS);
  const c = i % COLS;
  return {
    x: DIRT_L + (c + 0.5) * CELL_W,
    y: carY(r),
    w: CELL_W,
    h: CELL_H
  };
}

function colLeft(row, c) {
  const p = slotXY(row * COLS + c);
  return p.x - p.w * 0.5;
}

function spawnX() { return SPAWN_X; }

function hunterCol(h) {
  const row0 = h.row * COLS;
  const first = slotXY(row0);
  const last = slotXY(row0 + COLS - 1);
  const left0 = first.x - first.w * 0.5;
  const right4 = last.x + last.w * 0.5;
  if (h.x < left0) return 0;
  if (h.x >= right4) return 5;
  for (let c = 0; c < COLS; c++) {
    const p = slotXY(row0 + c);
    const L = p.x - p.w * 0.5;
    const R = p.x + p.w * 0.5;
    if (h.x >= L && h.x < R) return c + 1;
  }
  return 5;
}

function inSpike(h, slots) {
  for (let i = 0; i < SLOTS; i++) {
    const sl = slots[i];
    if (sl.kind !== "spike") continue;
    if (sl.r !== h.row) continue;
    const p = slotXY(i);
    if (h.x >= p.x - p.w * 0.5 && h.x < p.x + p.w * 0.5) return true;
  }
  return false;
}

function sameLane(h, g) {
  return Math.abs(h.y - g.y) <= GUN_ACROSS * g.h;
}

function gunTick(dt, slots, hunters, pulses) {
  for (let i = 0; i < SLOTS; i++) {
    const sl = slots[i];
    if (sl.kind !== "gun") continue;
    sl.cd = Math.max(0, sl.cd - dt);
    if (sl.cd > 0) continue;
    const g = slotXY(i);
    let best = null, bestD = 99;
    hunters.forEach((h) => {
      if (!h.live || h.peeling || h.linger) return;
      if (!sameLane(h, g)) return;
      const col = hunterCol(h);
      if (col < 3 || col > 4) return;
      const d = Math.abs(h.y - g.y) + Math.abs(g.x - h.x) * 0.25;
      if (d < bestD) { bestD = d; best = h; }
    });
    if (best) {
      sl.cd = GUN_CD;
      const stop = colLeft(sl.r, 2);
      const tx = Math.max(best.x, stop);
      pulses.push({ x: g.x, y: g.y, sx: g.x, sy: g.y, tx: tx, ty: best.y, t: 0, h: best });
    }
  }
}

function mortarTick(dt, slots, hunters, arcs) {
  for (let i = 0; i < SLOTS; i++) {
    const sl = slots[i];
    if (sl.kind !== "mortar") continue;
    sl.cd = Math.max(0, sl.cd - dt);
    if (sl.cd > 0) continue;
    const g = slotXY(i);
    let best = null, bestD = 99;
    hunters.forEach((h) => {
      if (!h.live || h.peeling) return;
      if (Math.abs(h.y - g.y) > MORTAR_ACROSS * g.h) return;
      const col = hunterCol(h);
      if (col < 1 || col > 3) return;
      const far = col <= 2 ? 0 : 2.2;
      const d = far + Math.abs(h.y - g.y);
      if (d < bestD) { bestD = d; best = h; }
    });
    if (best) {
      sl.cd = MORTAR_CD;
      arcs.push({ x: g.x, y: g.y - 0.10, sx: g.x, sy: g.y - 0.10, tx: best.x, ty: best.y, t: 0, h: best });
    }
  }
}

function simulateWave(wave, placements, dt) {
  const slots = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      slots.push({ kind: null, cd: 0, r, c });
    }
  }
  for (const p of placements) {
    const i = p.r * COLS + p.c;
    slots[i].kind = p.kind;
  }

  const cars = [0, 1, 2, 3, 4].map(() => ({ live: true, smoke: 0, leaked: false }));
  let hunters = [];
  let pulses = [];
  let arcs = [];
  let spawned = 0;
  let anyPeel = false;
  let wrecked = false;
  const plan = WAVE_SPAWNS[wave];
  const lastT = plan[plan.length - 1][0];
  let t = 0;

  function wreck(i) {
    const c = cars[i];
    if (!c.live) return;
    c.live = false;
    c.smoke = 1;
    wrecked = true;
  }

  while (t < lastT + HOLD_AFTER + 2000) {
    const elapsed = t;
    if (spawned < plan.length && elapsed >= plan[spawned][0]) {
      const row = plan[spawned][1];
      const kind = plan[spawned][2] || "c";
      hunters.push({
        row,
        x: spawnX(),
        y: carY(row),
        live: true,
        peeling: false,
        peelT: 0,
        target: row,
        linger: kind === "l"
      });
      spawned += 1;
    }

    hunters.forEach((h) => {
      if (!h.live) return;
      if (h.peeling) {
        h.peelT += dt;
        const tgt = h.target;
        if (tgt >= 0) {
          const tx = CAR_X;
          const ty = carY(tgt);
          h.x += (tx - h.x) * Math.min(1, dt * 0.014);
          h.y += (ty - h.y) * Math.min(1, dt * 0.014);
        }
        if (h.peelT > 260) {
          if (h.target >= 0 && cars[h.target].live) wreck(h.target);
          h.live = false;
        }
        return;
      }

      const col = hunterCol(h);
      let slow = 1;
      if (h.linger) {
        if (col <= 2) slow *= FAR_SLOW;
        if (inSpike(h, slots)) slow *= SPIKE_SLOW;
        h.x += dt * HUNT_SPEED * 1.05 * slow;
        h.y = carY(h.row);
        if (col >= 3 || h.x >= colLeft(h.row, 2) - 0.002) {
          h.peeling = true;
          anyPeel = true;
          if (h.row >= 0 && cars[h.row]) cars[h.row].leaked = true;
          h.target = h.row;
          h.peelT = 0;
        }
      } else {
        if (inSpike(h, slots)) slow *= SPIKE_SLOW;
        h.x += dt * HUNT_SPEED * 1.18 * slow;
        h.y = carY(h.row);
        if (h.x >= CAR_X - 0.02) {
          h.peeling = true;
          anyPeel = true;
          if (h.row >= 0 && cars[h.row]) cars[h.row].leaked = true;
          h.target = h.row;
          h.peelT = 0;
        }
      }
      if (h.x > 0.98) h.live = false;
    });

    gunTick(dt, slots, hunters, pulses);
    mortarTick(dt, slots, hunters, arcs);

    pulses.forEach((pu) => {
      pu.t += dt;
      const k = Math.min(1, pu.t / GUN_FLIGHT);
      pu.x = pu.sx + (pu.tx - pu.sx) * k;
      pu.y = pu.sy + (pu.ty - pu.sy) * k;
      if (k >= 1 && pu.h && pu.h.live && !pu.h.peeling) pu.h.live = false;
    });
    pulses = pulses.filter((pu) => pu.t < GUN_FLIGHT + 30);

    arcs.forEach((a) => {
      a.t += dt;
      const k = Math.min(1, a.t / MORTAR_FLIGHT);
      a.x = a.sx + (a.tx - a.sx) * k;
      a.y = a.sy + (a.ty - a.sy) * k - 0.34 * Math.sin(Math.PI * k);
      if (k >= 1 && a.h && a.h.live) a.h.live = false;
    });
    arcs = arcs.filter((a) => a.t < MORTAR_FLIGHT + 40);

    if (wrecked) break;
    const allOut = spawned >= plan.length && hunters.every((h) => !h.live);
    if (elapsed > lastT + HOLD_AFTER || allOut) break;

    t += dt;
  }

  const carsLive = cars.every((c) => c.live);
  return { anyPeel, wrecked, carsLive, t, spawned };
}

function legalPlacements(wave) {
  const hasM = wave >= 1;
  const guns = [];
  const mortars = [];
  const spikes = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (c >= 2) guns.push({ r, c, kind: "gun" });
      if (c <= 2) mortars.push({ r, c, kind: "mortar" });
      spikes.push({ r, c, kind: "spike" });
    }
  }
  const out = [];
  for (const g of guns) {
    for (const s of spikes) {
      if (s.r === g.r && s.c === g.c) continue;
      if (!hasM) {
        out.push([g, s]);
      } else {
        for (const m of mortars) {
          if ((m.r === g.r && m.c === g.c) || (m.r === s.r && m.c === s.c)) continue;
          out.push([g, s, m]);
        }
      }
    }
  }
  return out;
}

function fmt(ps) {
  return ps.map((p) => `w? r${p.r} c${p.c} ${p.kind}`).join(" | ");
}

const DT = 16;

console.log("geom: CELL_W", CELL_W, "colLeft2", colLeft(1, 2), "gun adj", GUN_ACROSS * CELL_H, "mortar", MORTAR_ACROSS * CELL_H);

// Wave 0
const w0ok = [];
for (const pl of legalPlacements(0)) {
  const res = simulateWave(0, pl, DT);
  if (!res.anyPeel && res.carsLive && !res.wrecked) w0ok.push(pl);
}
console.log("wave0 clean layouts:", w0ok.length, "/", legalPlacements(0).length);

// Wave 1
const w1ok = [];
for (const pl of legalPlacements(1)) {
  const res = simulateWave(1, pl, DT);
  if (!res.anyPeel && res.carsLive && !res.wrecked) w1ok.push(pl);
}
console.log("wave1 clean layouts:", w1ok.length, "/", legalPlacements(1).length);

// Wave 2
const w2ok = [];
for (const pl of legalPlacements(2)) {
  const res = simulateWave(2, pl, DT);
  if (!res.anyPeel && res.carsLive && !res.wrecked) w2ok.push(pl);
}
console.log("wave2 clean layouts:", w2ok.length, "/", legalPlacements(2).length);

function show(label, arr, n = 8) {
  console.log(label);
  for (let i = 0; i < Math.min(n, arr.length); i++) {
    console.log(" ", arr[i].map((p) => `(${p.kind} r${p.r} c${p.c})`).join(" "));
  }
}
show("w0 samples", w0ok);
show("w1 samples", w1ok);
show("w2 samples", w2ok);

if (w0ok.length && w1ok.length && w2ok.length) {
  console.log("\n=== CLEAN RUN ===");
  console.log("WAVE 1 (index 0):");
  w0ok[0].forEach((p) => console.log(`  wave 1, row ${p.r}, col ${p.c}, ${p.kind}`));
  console.log("WAVE 2:");
  w1ok[0].forEach((p) => console.log(`  wave 2, row ${p.r}, col ${p.c}, ${p.kind}`));
  console.log("WAVE 3:");
  w2ok[0].forEach((p) => console.log(`  wave 3, row ${p.r}, col ${p.c}, ${p.kind}`));
} else {
  console.log("\nNo full clean path. w0", w0ok.length, "w1", w1ok.length, "w2", w2ok.length);
}

// debug a few failures for w2
if (!w2ok.length) {
  let samples = 0;
  for (const pl of legalPlacements(2)) {
    const res = simulateWave(2, pl, DT);
    if (samples < 5) {
      console.log("fail ex", pl.map((p) => `${p.kind}@${p.r},${p.c}`).join(" "), res);
      samples++;
    }
  }
  // try heuristic: gun r1 c3, mortar r3 c0, spike r1 c0
  const heur = [
    { r: 1, c: 3, kind: "gun" },
    { r: 3, c: 0, kind: "mortar" },
    { r: 1, c: 0, kind: "spike" },
  ];
  console.log("heur", simulateWave(2, heur, DT));
  console.log("heur w1", simulateWave(1, heur, DT));
  console.log("heur-g2", simulateWave(0, [{ r: 1, c: 3, kind: "gun" }, { r: 1, c: 0, kind: "spike" }], DT));
}
