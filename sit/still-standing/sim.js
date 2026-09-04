"use strict";

// SKYRAIL Reclamation — CFD-212, C14 — Still standing.
// Spec: docs/cfd-212-still-standing-beat.md (SIGNED — David, 2026-09-04;
// implementation released). Sibling /still-standing/. Not a recut of
// anything.
// Parent: /two-ways-from-here/ (CFD-210, PASSED 2026-09-02), re-named at
// signature and confirmed still the last board to pass. Its bytes are pinned
// and do not move; this file is the copy that changes.
//
// One NEW system: THE FORK'S BRANCHES DO NOT END THE SITTING. You choose, you
// keep playing, and the branch you did not take is still there on the board
// while you go on without it. The road is still standing. You are the one who
// went the other way.
//
//   BANK      — Collect. at Mosswake. C12's ending, inherited whole: +1 mark,
//               remembered, the lamp and the glasshouse brighter. THE SITTING
//               CONTINUES. The forgone press-on stays on the consist.
//   PRESS ON  — ROLL HER OUT. on the consist. Mosswake's own chance and pay,
//               stakeOf() WAIVED.
//     paid  -> +14, the arm clears, the ending goes out of reach, back in the
//              paying loop. Inherited unchanged, and the one branch that
//              forwent nothing.
//     short -> THE SITTING CONTINUES, and the ending is visibly gone. No +1,
//              no remembering, no brightening. The forgone Collect. stays at
//              Mosswake. NOT endedCold — that is bound to an ending.
//
// The branches stop ending the sitting, so something else has to. Both halves
// of the same system, per David's ruling of 2026-09-03 ("worth not calling
// that a second system when it does [need work]"):
//
//   THE STOP — the SECOND STAKED short run. The larder covers one staked
//   shortfall per sitting; the second closes it. The press-on is UNSTAKED —
//   commitPress writes provisions 0 / toll 0 — so nothing was put up and there
//   is nothing for the larder to cover. Measured: after an opening short send
//   and a lost press-on, marksLost is 2, not 4.
//
//   THE FLOOR — the fork spent, the consist HOME, no run out, and no
//   affordable send. It closes the dead screen the beat measured on the
//   parent: a lost press-on at the opening arm leaves 1 mark against a stake
//   of 2, with nothing lit and the sitting still running. THE TIMING IS
//   LOAD-BEARING; see closeIfSpent().
//
// TWO endings, and they do not share a sentence. David, 2026-09-04: "If they
// share one, the player can't tell whether the sitting ended because the
// wallet emptied or because a rule fired." They share a fiction — the larder
// is empty — and not a cause.
//
// PRESS_COST is REPAIRED, not improved. The parent's words were "The larder
// covered it once. It will not cover it twice." — literally true, and its
// PROMISE was that a lost press-on ends the sitting cold. That referent moved:
// here a lost press-on ends nothing. Leaving the sentence in place would not
// have preserved it, it would have quietly falsified it. David ruled the
// change on 2026-09-04 and ruled that it be recorded as a repair.
//
// New state, and none of it is ever rendered — not as a pip, a dot, a number
// or a tooltip. The larder is remembered by the board and said in words:
//   larderSpent — the latch. Set once, when the larder covers.
//   pressLost   — the press-on came home short. NOT an ending.
//   endedSpent  — the floor fired. The second ending's marker.
// endedCold is inherited and re-bound: it now marks the second staked
// shortfall, whose fiction its words already carried exactly.
//
// No new numbers. 64 / 14 / stake 2 are Mosswake's own, inherited unmoved. No
// new verb, no new tile, no new place: four verbs, four places, the parent's.
//
// Inherited, not replayed: everything the parent inherited, and its one system
// — the corridor forks once, after commitment. A tap at a place can fail. The
// desk deleted. Halt holds, herbs in the larder, Mosswake a neighbor. Rustfall
// dark — Beat 8 dressing. Opening marks 3 — the desk's float. Collect
// increments.
//
// Refused: an always-available stop verb (a second live can-do in every
// post-fork state), arming-and-triggering (a new verb), a raised opening float
// (a new literal), gating the press-on on affordability, the Halt as a send
// (it is home here), Rustfall as a send (CFD-200 owns it by name), a third
// live can-do, two lit at the OPEN, weather, a second new system, a new
// currency, crews, Sera, a Favor meter, a timer or decay on the forgone
// branch, Mara VO, `?`, tutorial mode, any pin moving.
//
// Canon (cite, do not recall as a second bible): Bible §5.8 Contracts. Supply
// — one contract, two ways to run it. Core Loop: earns Favor by helping
// neighbors and keeping promises; both branches are promises, and the card's
// content is that keeping one does not end the day. File:
// Skyrail-Reclamation-The-Core-Loop.md. R1 — marks are the only stock. R6 —
// stakes live in the run, never the secured home: a lost press-on costs this
// sitting's ending and never the home, the lamp, the larder or Favor already
// earned, and here the player keeps playing with that true. R2 / R3 / R4 —
// nothing moves with wall time; the forgone branch never expires, and a timer
// on a road you did not take would be a decay clock wearing a decision's
// clothes. §7.2 — the quick path is banking, kept; the opt-in clause is
// TRADED, and the beat records it as an amendment rather than a cost absorbed.
// §7.3 — the two branches stay in different currencies; no number ranks them.
// §7.5 — the outcomes are pre-registered in the beat. Bible sha 9a305653.
//
// The HUD is one marks line. wait() exists, takes nothing, returns false.

const OPENING_MARKS = 3;
const MUSEUM_MARKS = 1;

// The one instrument, inherited unmoved from CFD-196: every quote and every
// roll comes through chanceFor(). The board never computes a percent.
const BASE = 0.76;
const POINT = 0.012;
const WARDEN_GUARD = 3;
const CLAMP_LO = 0.12;
const CLAMP_HI = 0.96;

// Mosswake Loop — the route's own stakes, inherited. Roster stays 0
// (crews are refused). Provisions and toll as shipped; paid in marks,
// which is the dispatch denomination, not a food-to-marks exchange and
// not terrace CARRY (refused). The press-on rolls THIS route, stake waived.
const MOSSWAKE = Object.freeze({
  short: "Mosswake",
  cargo: "the Mosswake cargo",
  baseRisk: 0.12,
  pays: 14,
  provisions: 2,
  toll: 0,
  agent: "Wet rail through the Mosswake loop.",
});

const RUSTFALL_NOTE = "Raiders hold the yard road.";

// The board's words. Copy, not constants — no number enters the file.
//
// The fork's cost, on the consist tile BEFORE the tap. REPAIRED: see the
// header. The first clause is kept, because the larder did cover it; the
// second states what the tap actually spends, and it is true on BOTH outcomes
// and from the instant she is out — winning takes the ending away, losing
// takes it too, and canCollect() requires her home.
const PRESS_COST = "The larder covered it once. Roll her out and there is nothing left to collect.";
const ARMED_LINE = "The run came home short and the larder covered it.";

// ENDING A — the second STAKED short run. The parent's cold-ending words,
// inherited: their fiction is this cause exactly, and on this board a short
// press-on no longer ends anything, so there is nothing left to confuse them
// with.
const COLD_END = "She came home short again. The larder could not cover it twice.";
const COLD_WHY_MOSS = "The larder could not cover it twice.";
const COLD_WHY_HALT = "The herbs are already up. The larder could not cover it twice.";

// ENDING B — the floor. Its own sentence on every tile, and it says what spent
// the wallet: a player who cannot tell "you ran out" from "the board stopped
// working" will report the second, and that report would be about the ending
// rather than about the road he did not take.
const SPENT_END = "The consist is home. There is nothing left to put up.";
// The run she went out on LAST was the press-on, and a press-on is unstaked —
// commitPress writes provisions 0 / toll 0. So "she went out on the last of it"
// named a cause that did not happen, and the only number on screen (1 mark)
// contradicted it. What actually emptied the purse is the STAKED sends.
const SPENT_WHY = "The runs took the stake. What is left will not cover another.";
const SPENT_WHY_MOSS = "There is nothing left to put up for a run.";
const SPENT_WHY_HALT = "The herbs are already up. There is nothing left to put up for a run.";

// The forgone branch, and the taken one, each on the tile that OFFERED it —
// David, 2026-09-04: "it has to be a tile the player passes in normal play."
// Measured: the shipped walk forces Mosswake (to SEND) and the consist (to
// bring her home) once per run, and never the Halt or Rustfall. A flat fact in
// the past tense, once, with nothing said about the player. A road still
// standing says nothing; it stands.
const FORGONE_PRESS = "She was not rolled out.";
const PRESS_LOST = "She went out again and came back empty.";
const MOSS_SHORT = "Mosswake. She came home short again.";
const MOSS_NOTHING = "Still a neighbor. Nothing to collect.";
const MOSS_NEIGHBOR = "Mosswake. A neighbor again.";
const REMEMBERED_LINE = "People remember who showed up.";

const PLACES = Object.freeze(["halt", "mosswake", "consist", "rustfall"]);

// One map. City geometry. SEND does not write it. Home does not write it.
const MAP = Object.freeze({ left: 42, width: 16 });

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}
function chanceFor(baseRisk, wardens) {
  const crewBonus = Math.min(0.3, wardens * WARDEN_GUARD * POINT);
  return clamp(BASE - baseRisk + crewBonus, CLAMP_LO, CLAMP_HI);
}
function percentOf(chance) {
  return Math.round(chance * 100);
}
function stakeOf() {
  return MOSSWAKE.provisions + MOSSWAKE.toll;
}
function mossChance() {
  return chanceFor(MOSSWAKE.baseRisk, 0);
}
function sendFace() {
  return "SEND. " + percentOf(mossChance()) + ".";
}
function homeFace(chance) {
  return "Home she comes. " + percentOf(chance) + ".";
}
function pressFace() {
  return "ROLL HER OUT. " + percentOf(mossChance()) + ".";
}

function make(state) {
  const s = state;

  function canSend() {
    if (s.stopped) return false;
    if (s.armed) return false;
    if (s.consistAt !== "halt") return false;
    if (s.marks < stakeOf()) return false;
    return true;
  }

  function canHome() {
    if (s.stopped) return false;
    if (s.consistAt !== "mosswake") return false;
    if (s.away === null) return false;
    return true;
  }

  // The fork's gates. Both carry `pressLost` as well as `collected`, so the
  // fork's once-only property is LOCAL to the gate rather than an argument
  // about where the stop lives: banking spends the fork through `collected`, a
  // paid press-on through the arm clear, and a lost one through this marker.
  // The beat asked for the latch itself to gate these, and it cannot — the
  // latch is set in the same instant as the arm, so it is true at the real
  // fork and could not discriminate a later one. The marker is the field that
  // discriminates, and it closes exactly the hole the beat named: a player who
  // pressed on and lost and never banked seeing Collect. light again.
  function canCollect() {
    if (s.stopped) return false;
    if (!s.armed) return false;
    if (s.collected) return false;
    if (s.pressLost) return false;
    if (s.consistAt !== "halt") return false;
    return true;
  }

  // The fork's second branch. It does not consult canSend(): canSend's armed
  // guard is what keeps Mosswake's own SEND dark at the arm, and it stays. No
  // marks test — the stake is waived, so the branch is live at 1 mark, which
  // is exactly the arm a player reaches from the open.
  function canPress() {
    if (s.stopped) return false;
    if (!s.armed) return false;
    if (s.collected) return false;
    if (s.pressLost) return false;
    if (s.consistAt !== "halt") return false;
    if (s.away !== null) return false;
    return true;
  }

  function notice(place) {
    if (place === "halt") {
      if (s.endedCold) {
        return {
          place: "halt",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "The place already took the haul.",
          blocked: COLD_WHY_HALT,
          writing: "The Halt holds. She came home short again.",
        };
      }
      if (s.endedSpent) {
        // R6: the home is never the stake. The Halt reads exactly as it always
        // did; only the reason nothing can go out is new.
        return {
          place: "halt",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "The place already took the haul.",
          blocked: SPENT_WHY_HALT,
          writing: "The Halt holds. Herbs in the larder.",
        };
      }
      if (s.armed && !s.collected) {
        return {
          place: "halt",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "The place already took the haul.",
          blocked: "The herbs are already up. The larder covered the short run.",
          writing: "The Halt holds. The run came home short and the larder covered it.",
        };
      }
      return {
        place: "halt",
        canDo: null,
        verb: null,
        chance: null,
        percent: null,
        inProcess: "The place already took the haul.",
        blocked: "The herbs are already up. Nothing here is yours to take.",
        writing: "The Halt holds. Herbs in the larder.",
      };
    }

    if (place === "mosswake") {
      // Checked first, and it is why the corridor holds through the away leg
      // for free: a run in flight darkens Collect. on its own.
      if (s.consistAt === "mosswake") {
        return {
          place: "mosswake",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "The consist is here.",
          blocked: null,
          writing: "Mosswake. The run is out.",
        };
      }

      // Mosswake's WRITING is its own history, and it does not change when the
      // sitting ends: what was taken stays taken, what was lost stays lost.
      const writing = s.collected ? REMEMBERED_LINE
        : s.pressLost ? MOSS_SHORT
        : MOSS_NEIGHBOR;

      // The notice calls the gate it lights, rather than duplicating its
      // condition — the parent's own correction, kept.
      if (canCollect()) {
        return {
          place: "mosswake",
          canDo: "Collect.",
          verb: "collect",
          chance: null,
          percent: null,
          inProcess: "They kept something back.",
          blocked: null,
          writing: writing,
        };
      }

      // THE PAIRING THE PARENT'S BRANCH ORDER FORBIDS, and the single most
      // important thing in this file. On the parent the `endedCold` and
      // `collected` branches sit ABOVE canSend() and return canDo: null,
      // because on the parent no state exists in which the fork is spent and
      // the sitting continues. Keeping those branches and dropping the stop
      // ships a permanently dead board with a live canSend() behind it —
      // measured, on a scratch copy, before this file was written. So the
      // memory-or-lost sentence goes in writing/blocked and sendFace() goes in
      // canDo, at the same time.
      if (canSend()) {
        const chance = mossChance();
        return {
          place: "mosswake",
          canDo: sendFace(),
          verb: "send",
          chance: chance,
          percent: percentOf(chance),
          inProcess: null,
          blocked: s.pressLost ? MOSS_NOTHING : null,
          writing: writing,
        };
      }

      // Dark with the consist home. By construction that is a STOPPED board:
      // the floor guarantees an affordable send whenever the fork is spent and
      // nothing is in the air, and an open fork is caught by canCollect above.
      // So the blocked line is the ending's own reason. The parent's
      // fallthrough here read "The consist is not home." — unreachable there,
      // reachable here, and a lie in every state this board reaches.
      return {
        place: "mosswake",
        canDo: null,
        verb: null,
        chance: null,
        percent: null,
        inProcess: null,
        blocked: s.endedCold ? COLD_WHY_MOSS : SPENT_WHY_MOSS,
        writing: writing,
      };
    }

    if (place === "consist") {
      if (s.consistAt === "mosswake" && s.away !== null) {
        return {
          place: "consist",
          canDo: homeFace(s.away.chance),
          verb: "home",
          chance: s.away.chance,
          percent: percentOf(s.away.chance),
          inProcess: "At Mosswake.",
          blocked: null,
          writing: "The run is at Mosswake.",
        };
      }

      // Both endings land HERE, and they do not share a sentence. Both fire
      // inside commitHome, which the player reaches by tapping the consist and
      // then the can-do, so the consist is the tile they are looking at when
      // the sitting closes.
      if (s.endedCold) {
        return {
          place: "consist",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "Home.",
          blocked: null,
          writing: COLD_END,
        };
      }
      if (s.endedSpent) {
        return {
          place: "consist",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "Home.",
          blocked: SPENT_WHY,
          writing: SPENT_END,
        };
      }

      // The press-on is what this tile offered. After banking it is the branch
      // that was not taken, and it stays here for the rest of the sitting — a
      // fact in the blocked line, carried through every later run, never a
      // can-do and never a count.
      const forgone = s.collected ? FORGONE_PRESS : null;

      if (s.haulOnConsist) {
        return {
          place: "consist",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "Home.",
          blocked: forgone,
          writing: "The consist is home. The haul is on it.",
        };
      }
      // The fork. The consist is the thing being wagered, and it is the tile
      // that is empty at the arm. The cost is here, before the tap.
      if (canPress()) {
        const chance = mossChance();
        return {
          place: "consist",
          canDo: pressFace(),
          verb: "press",
          chance: chance,
          percent: percentOf(chance),
          inProcess: null,
          blocked: PRESS_COST,
          writing: ARMED_LINE,
        };
      }
      if (s.pressLost) {
        // Nothing was forgone here — the press-on was taken. This is the run's
        // own outcome, and the next paid run supersedes it. The branch that
        // WAS forgone, Collect., is at Mosswake.
        return {
          place: "consist",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "Home.",
          blocked: null,
          writing: PRESS_LOST,
        };
      }
      // Unreachable while canPress() is exactly the arm: kept so that a press
      // gated off later prints C12's true sentence, not "already up".
      if (s.armed && !s.collected) {
        return {
          place: "consist",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "Home.",
          blocked: "The haul was lost. The larder covered it.",
          writing: ARMED_LINE,
        };
      }
      return {
        place: "consist",
        canDo: null,
        verb: null,
        chance: null,
        percent: null,
        inProcess: "Home.",
        blocked: forgone || "The haul is already up.",
        writing: "The consist is home. Empty.",
      };
    }

    if (place === "rustfall") {
      return {
        place: "rustfall",
        canDo: null,
        verb: null,
        chance: null,
        percent: null,
        inProcess: null,
        blocked: RUSTFALL_NOTE,
        writing: "Rustfall. Dark.",
      };
    }

    return null;
  }

  function postNotice(place) {
    if (PLACES.indexOf(place) < 0) return false;
    s.posted = place;
    return true;
  }

  function postedNotice() {
    if (!s.posted) return null;
    return notice(s.posted);
  }

  // THE FLOOR. The sitting ends when the fork is spent, the consist is HOME,
  // no run is out, and no affordable send exists.
  //
  // THE TIMING IS LOAD-BEARING, and it is why this is a call at the end of a
  // commit rather than a clause inside canSend(). Read eagerly — "whenever
  // canSend() is false" — it fires MID-FLIGHT on the bank branch: banking
  // leaves 2 marks, stakeOf() is 2, so the very next SEND leaves 0 with the
  // consist away and `Home she comes.` still to tap. Driven and measured;
  // EVERY bank-branch sitting passes through that frame.
  //
  // It also cannot read canSend(), which is false at the fork too. It tests
  // affordability directly, and the fork separately.
  //
  // What it closes is the state the beat measured as permanently dead on the
  // parent: a lost press-on at the opening arm leaves 1 mark against a stake
  // of 2, so no staked send can ever be afforded and the second staked short
  // run can never fire either. Nothing lit, and the sitting still running.
  function closeIfSpent() {
    if (s.stopped) return;
    if (s.consistAt !== "halt") return;
    if (s.away !== null) return;
    if (canCollect() || canPress()) return;
    if (s.marks >= stakeOf()) return;
    s.stopped = true;
    s.endedSpent = true;
  }

  function commitSend() {
    if (!canSend()) return false;
    const chance = mossChance();
    s.marks -= stakeOf();
    s.haulOnConsist = false;
    s.consistAt = "mosswake";
    s.away = {
      chance: chance,
      provisions: MOSSWAKE.provisions,
      toll: MOSSWAKE.toll,
      press: false,
    };
    s.runsOut += 1;
    s.sentence = null;
    return true;
  }

  // Like commitSend with the stake WAIVED: no `s.marks -=`. The run object
  // stakes nothing, so the record's marksLost stays honest on a short return
  // (nothing was put up, nothing is lost) — and so the larder is never asked
  // to cover it, which is what makes the stop the second STAKED short run
  // rather than the second short run.
  function commitPress() {
    if (!canPress()) return false;
    const chance = mossChance();
    s.haulOnConsist = false;
    s.consistAt = "mosswake";
    s.away = {
      chance: chance,
      provisions: 0,
      toll: 0,
      press: true,
    };
    s.runsOut += 1;
    s.pressOns += 1;
    s.sentence = null;
    return true;
  }

  function commitHome() {
    if (!canHome()) return false;
    const run = s.away;
    const draw = s.roll();
    const paid = draw < run.chance;
    s.away = null;
    s.consistAt = "halt";
    if (paid) {
      s.marks += MOSSWAKE.pays;
      s.haulOnConsist = true;
      s.cargoesBanked += 1;
      s.sentence = "The train brought " + MOSSWAKE.cargo + " home.";
      // A paid press-on clears the arm. A boolean clear — an assignment on
      // purpose, beside `+=` lines that are accumulations on purpose. The
      // ending goes out of reach; nothing was lost, so nothing is said.
      if (run.press) s.armed = false;
    } else {
      s.haulOnConsist = false;
      s.runsTurnedBack += 1;
      s.marksLost += run.provisions + run.toll;
      if (run.press) {
        // A short press-on. The run was UNSTAKED — provisions 0, toll 0 above
        // — so the larder was never asked to cover it and the latch does not
        // move. What is lost is this sitting's ending; the sitting is not.
        // The arm clears so play can continue, and the marker is its own, not
        // endedCold: endedCold is bound to an ending in three notices and in
        // endSentence, and reusing it would put ending words on the Halt and
        // the consist in the middle of a sitting that did not end.
        s.armed = false;
        s.pressLost = true;
        s.sentence = MOSSWAKE.agent + " " + PRESS_LOST;
      } else if (s.larderSpent) {
        // ENDING A. The second STAKED shortfall. The larder covered one and
        // cannot cover another, which is the sentence the parent already
        // carried and the rule this board runs on.
        s.stopped = true;
        s.endedCold = true;
        s.sentence = MOSSWAKE.agent + " " + COLD_END;
      } else {
        // The first STAKED shortfall. The larder covers it, the board arms,
        // the fork opens, and the latch is set — one write, one place.
        s.larderSpent = true;
        s.armed = true;
        s.sentence = MOSSWAKE.agent + " " + ARMED_LINE;
      }
    }
    closeIfSpent();
    return true;
  }

  function commitCollect() {
    if (!canCollect()) return false;
    s.collected = true;
    s.remembered = true;
    // Increment. Not an assignment. they-remember's
    // `s.marks = MUSEUM_MARKS` would destroy the desk float.
    s.marks += MUSEUM_MARKS;
    // THE ONE NEW SYSTEM, in one line. On the parent this line ended the
    // sitting whenever the board was armed, and the parent's Kill list
    // protects that by name. It is overturned deliberately: the arm clears
    // instead, so play continues and the mark, the remembering and the
    // brightened lamp become things you go on playing beside. The larder latch
    // is what remembers that the fork is spent.
    s.armed = false;
    // Inert at the shipped float, and inert by ARITHMETIC rather than by
    // structure: Collect pays +1, so banking cannot leave the purse below the
    // stake unless it was already there, and the floor's other call site in
    // commitHome has always fired first. Measured: deleting this line turns
    // ZERO behavioural tests red. It is kept because the inertness is a
    // property of OPENING_MARKS, MUSEUM_MARKS and stakeOf() and not of the
    // control flow — change any of the three and this becomes the line that
    // decides whether banking can end the sitting, which is this card's first
    // Kill line. Do not delete it to make a count go down.
    closeIfSpent();
    return true;
  }

  function commitPosted() {
    const n = postedNotice();
    if (!n || !n.verb) return false;
    if (n.verb === "send") return commitSend();
    if (n.verb === "home") return commitHome();
    if (n.verb === "collect") return commitCollect();
    if (n.verb === "press") return commitPress();
    return false;
  }

  function wait() {
    return false;
  }

  function places() {
    return PLACES.slice();
  }

  function buildings() {
    return places();
  }

  // First match. Kept for compatibility; it cannot see a second live
  // can-do, so the corridor is never graded on it.
  function liveCanDo() {
    for (let i = 0; i < PLACES.length; i++) {
      const n = notice(PLACES[i]);
      if (n && n.canDo) return { place: n.place, verb: n.verb, canDo: n.canDo };
    }
    return null;
  }

  // Plural, in PLACES order. The corridor is graded on this and on
  // notice() enumerated directly.
  function liveCanDos() {
    const out = [];
    for (let i = 0; i < PLACES.length; i++) {
      const n = notice(PLACES[i]);
      if (n && n.canDo) out.push({ place: n.place, verb: n.verb, canDo: n.canDo });
    }
    return out;
  }

  function record() {
    return {
      runsOut: s.runsOut,
      cargoesBanked: s.cargoesBanked,
      runsTurnedBack: s.runsTurnedBack,
      marksLost: s.marksLost,
      pressOns: s.pressOns,
    };
  }

  return {
    get marks() { return s.marks; },
    get openingMarks() { return OPENING_MARKS; },
    get lampLit() { return s.lampLit; },
    get haltHolds() { return s.haltHolds; },
    get foundry() { return s.foundry; },
    get foodOnTerrace() { return s.foodOnTerrace; },
    get foodInTown() { return s.foodInTown; },
    get heatStep() { return s.heatStep; },
    get mossDim() { return s.mossDim; },
    get mossQuiet() { return s.mossQuiet; },
    get herbsWasting() { return s.herbsWasting; },
    get herbsOnMoss() { return s.herbsOnMoss; },
    get herbsInLarder() { return s.herbsInLarder; },
    get neighborAgain() { return s.neighborAgain; },
    get consistAt() { return s.consistAt; },
    get haulOnConsist() { return s.haulOnConsist; },
    get promiseKept() { return s.promiseKept; },
    get putUp() { return s.putUp; },
    get collected() { return s.collected; },
    get remembered() { return s.remembered; },
    get armed() { return s.armed; },
    get larderSpent() { return s.larderSpent; },
    get pressLost() { return s.pressLost; },
    get endedCold() { return s.endedCold; },
    get endedSpent() { return s.endedSpent; },
    get map() { return { left: s.map.left, width: s.map.width }; },
    get stopped() { return s.stopped; },
    get posted() { return s.posted; },
    get runSentence() { return s.sentence; },
    // Two endings, two sentences. The page never reads this — measured, grep
    // count 0 in index.html — so it is not where the endings are
    // distinguished; that is notice().writing and .blocked. It must not lie
    // either. Banking no longer appears here, because banking no longer ends
    // anything.
    get endSentence() {
      if (s.endedCold) return COLD_END;
      if (s.endedSpent) return SPENT_END;
      return null;
    },
    get record() { return record(); },
    get pays() { return MOSSWAKE.pays; },
    get provisions() { return MOSSWAKE.provisions; },
    get toll() { return MOSSWAKE.toll; },
    canSend,
    canHome,
    canCollect,
    canPress,
    commitSend,
    commitHome,
    commitCollect,
    commitPress,
    commitPosted,
    postNotice,
    notice,
    postedNotice,
    wait,
    places,
    buildings,
    liveCanDo,
    liveCanDos,
  };
}

function createBoard(opts) {
  const o = opts || {};
  const marks = Number.isInteger(o.marks) && o.marks >= 0 ? o.marks : OPENING_MARKS;
  // Every field the sim reads is initialised here. make() aliases this
  // literal with no clone and no defaulting: a forgotten field is
  // `undefined`, and `undefined !== null` is true. A forgotten larder latch
  // would end the sitting at the first short run; a forgotten press marker
  // would darken the fork at the open.
  return make({
    marks: marks,
    lampLit: true,
    haltHolds: true,
    foundry: true,
    foodOnTerrace: false,
    foodInTown: true,
    heatStep: 1,
    mossDim: true,
    mossQuiet: true,
    herbsWasting: false,
    herbsOnMoss: false,
    herbsInLarder: true,
    neighborAgain: true,
    consistAt: "halt",
    haulOnConsist: false,
    promiseKept: true,
    putUp: true,
    collected: false,
    remembered: false,
    armed: false,
    larderSpent: false,
    pressLost: false,
    endedCold: false,
    endedSpent: false,
    map: { left: MAP.left, width: MAP.width },
    away: null,
    stopped: false,
    posted: null,
    sentence: null,
    runsOut: 0,
    cargoesBanked: 0,
    runsTurnedBack: 0,
    marksLost: 0,
    pressOns: 0,
    roll: typeof o.roll === "function" ? o.roll : Math.random,
  });
}

const api = { createBoard };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.StillStanding = api;
