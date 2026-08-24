(function () {
  const destA = document.getElementById("destA");
  const destB = document.getElementById("destB");
  const goodsA = document.getElementById("goodsA");
  const holdA = document.getElementById("holdA");
  const warmA = document.getElementById("warmA");
  const sendB = document.getElementById("sendB");
  const train = document.getElementById("train");
  const go = document.getElementById("go");
  const hud = document.getElementById("hud");
  const homeSpot = { left: 8, bottom: 11 };
  let pick = null;
  let at = "home";
  let moving = false;
  let marks = 0;
  let heldA = true;
  let warmed = false;
  let phase = "goods";
  let pendingPay = 0;
  let heldAtLeave = true;
  let pendingWarm = false;
  let bLockedUntilWarm = false;

  function tap(el, fn) {
    el.addEventListener("pointerdown", (ev) => {
      ev.preventDefault();
      fn(ev);
    });
  }

  function destSpot(el) {
    const b = document.getElementById("strip").getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      left: ((r.left + r.width * 0.5) - b.left) / b.width * 100 - 7,
      bottom: (b.bottom - (r.top + r.height * 0.42)) / b.height * 100
    };
  }

  function canHold() { return !heldA && marks >= 1; }
  function canGoods() { return heldA && !(heldA && marks >= 1 && !warmed); }
  function canWarm() { return heldA && marks >= 1 && !warmed; }
  function canB() { return marks >= 1 && !bLockedUntilWarm; }

  function pickOk() {
    return (pick === "hold" && canHold()) || (pick === "goods" && canGoods()) || (pick === "warm" && canWarm()) || (pick === "B" && canB());
  }
  function paint() {
    if (pick && !pickOk()) pick = null;
    hud.textContent = String(marks);
    destA.classList.toggle("thin", !heldA);
    destA.classList.toggle("warmed", warmed);
    destA.classList.toggle("on", !moving && at === "home" && (pick === "hold" || pick === "warm" || pick === "goods"));
    destB.classList.toggle("on", !moving && at === "home" && pick === "B");
    destB.classList.toggle("locked", !canB());
    goodsA.classList.toggle("on", !moving && at === "home" && pick === "goods");
    holdA.classList.toggle("on", !moving && at === "home" && pick === "hold");
    warmA.classList.toggle("on", !moving && at === "home" && pick === "warm");
    sendB.classList.toggle("on", !moving && at === "home" && pick === "B");
    goodsA.disabled = moving || at !== "home" || !canGoods();
    holdA.disabled = moving || at !== "home" || !canHold();
    warmA.disabled = moving || at !== "home" || !canWarm();
    sendB.disabled = moving || at !== "home" || !canB();
    go.disabled = moving || (at === "home" && !pickOk());
    go.textContent = at === "home" ? "LEAVE" : "GO";
  }

  function lerpTo(spot, done) {
    moving = true;
    paint();
    const x0 = parseFloat(train.style.left) || homeSpot.left;
    const y0 = parseFloat(train.style.bottom) || homeSpot.bottom;
    const t0 = performance.now();
    const dur = 1100;
    function step(now) {
      const k = Math.min(1, (now - t0) / dur);
      const e = k * k * (3 - 2 * k);
      train.style.left = (x0 + (spot.left - x0) * e) + "%";
      train.style.bottom = (y0 + (spot.bottom - y0) * e) + "%";
      if (k < 1) requestAnimationFrame(step);
      else { moving = false; done(); }
    }
    requestAnimationFrame(step);
  }

  function setPick(which) {
    if (moving || at !== "home") return;
    if (which === "B" && !canB()) return;
    if (which === "hold" && !canHold()) return;
    if (which === "goods" && !canGoods()) return;
    if (which === "warm" && !canWarm()) return;
    pick = which;
    paint();
  }

  tap(destA, () => {
    if (canWarm()) setPick("warm");
    else if (canHold()) setPick("hold");
    else if (canGoods()) setPick("goods");
  });
  tap(destB, () => setPick("B"));
  tap(goodsA, () => setPick("goods"));
  tap(holdA, () => setPick("hold"));
  tap(warmA, () => setPick("warm"));
  tap(sendB, () => setPick("B"));

  tap(go, () => {
    if (moving) return;
    if (at === "home") {
      if (!pick) return;
      if (pick === "B" && !canB()) return;
      if (pick === "hold" && !canHold()) return;
      if (pick === "goods" && !canGoods()) return;
      if (pick === "warm" && !canWarm()) return;
      heldAtLeave = heldA;
      pendingWarm = (pick === "warm");
      const dest = pick === "B" ? destB : destA;
      let jobPay = 0;
      if (pick === "hold") {
        marks -= 1;
        heldA = true;
        jobPay = 0;
        phase = "warm";
      } else if (pick === "goods") {
        heldA = false;
        jobPay = 1;
        phase = "b";
      } else if (pick === "warm") {
        marks -= 1;
        heldA = true;
        warmed = true;
        bLockedUntilWarm = false;
        jobPay = 0;
        phase = "done";
      } else if (pick === "B") {
        marks -= 1;
        if (heldA) heldA = false;
        destB.classList.add("has-haul");
        bLockedUntilWarm = true;
        jobPay = 3;
        phase = "hold";
      }
      const leaving = pick;
      lerpTo(destSpot(dest), () => {
        at = leaving === "B" ? "B" : "A";
        pendingPay = jobPay;
        pick = null;
        paint();
      });
      return;
    }
    lerpTo(homeSpot, () => {
      marks += pendingPay;
      pendingPay = 0;
      if (pendingWarm && heldAtLeave && heldA) marks += 1;
      pendingWarm = false;
      at = "home";
      pick = null;
      paint();
    });
  });

  train.style.left = homeSpot.left + "%";
  train.style.bottom = homeSpot.bottom + "%";
  paint();

  document.addEventListener("touchstart", function (e) {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });
  let lastTouch = 0;
  document.addEventListener("touchend", function (e) {
    const now = Date.now();
    if (now - lastTouch <= 350) e.preventDefault();
    lastTouch = now;
  }, { passive: false });
})();
