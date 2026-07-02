// Draws a looping ECG trace (normal sinus rhythm) across the hero rhythm strip,
// monitor-style: the sweep head redraws over the old trace with a clearing gap.
(function () {
  var canvas = document.getElementById('ecg-strip');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W = 0;
  var H = 0;
  var head = 0;
  var GAP = 30; // cleared gap ahead of the sweep, px
  var SPEED = 110; // px per second (≈ paper speed)
  var color = '#b2262e';

  function refreshColor() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--trace').trim();
    if (v) color = v;
  }

  function fit() {
    var rect = canvas.getBoundingClientRect();
    W = Math.max(1, rect.width);
    H = Math.max(1, rect.height);
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * ratio);
    canvas.height = Math.round(H * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function gauss(t, center, width) {
    var d = (t - center) / width;
    return Math.exp(-d * d);
  }

  // One PQRST complex per cycle; y offset in "amplitude units" above baseline.
  var PERIOD = 210;
  function wave(x) {
    var t = ((x % PERIOD) + PERIOD) % PERIOD;
    return (
      7 * gauss(t, 46, 8) + // P
      -6 * gauss(t, 84, 2.6) + // Q
      44 * gauss(t, 93, 3.4) + // R
      -11 * gauss(t, 103, 2.8) + // S
      13 * gauss(t, 156, 12) // T
    );
  }

  function yAt(x) {
    var base = H * 0.64;
    var unit = H / 96;
    return base - wave(x) * unit;
  }

  // Stroke the trace from x0 to x1 (x0 < x1, no wrap).
  function strokeSpan(x0, x1) {
    if (x1 <= x0) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x0, yAt(x0));
    for (var x = x0 + 1; x < x1; x += 1) {
      ctx.lineTo(x, yAt(x));
    }
    ctx.lineTo(x1, yAt(x1));
    ctx.stroke();
  }

  // Repaint everything except the gap ahead of the head (used after
  // resize / theme change so the strip never looks blank or two-toned).
  function repaint() {
    ctx.clearRect(0, 0, W, H);
    var gapEnd = head + GAP;
    if (gapEnd <= W) {
      strokeSpan(0, head);
      strokeSpan(gapEnd, W);
    } else {
      strokeSpan(gapEnd - W, head);
    }
  }

  function clearAhead(from, width) {
    if (from + width <= W) {
      ctx.clearRect(from, 0, width, H);
    } else {
      ctx.clearRect(from, 0, W - from, H);
      ctx.clearRect(0, 0, from + width - W, H);
    }
  }

  var last = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    if (!last) {
      last = t;
      return;
    }
    var dt = Math.min(64, t - last);
    last = t;

    var rect = canvas.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    var next = head + (SPEED * dt) / 1000;
    clearAhead(head, next - head + GAP);
    if (next <= W) {
      strokeSpan(head, next);
    } else {
      strokeSpan(head, W);
      strokeSpan(0, next - W);
      next -= W;
    }
    head = next;
  }

  var resizeQueued = false;
  window.addEventListener('resize', function () {
    if (resizeQueued) return;
    resizeQueued = true;
    requestAnimationFrame(function () {
      resizeQueued = false;
      fit();
      if (head > W) head = 0;
      repaint();
    });
  });

  // Follow the paper/monitor theme toggle.
  new MutationObserver(function () {
    refreshColor();
    repaint();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  refreshColor();
  fit();
  if (reduceMotion) {
    head = W;
    strokeSpan(0, W);
  } else {
    head = Math.round(W * 0.3);
    repaint();
    requestAnimationFrame(frame);
  }
})();
