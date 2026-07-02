(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function clamp01(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  function cssPx(name, fallback) {
    var value = getComputedStyle(root).getPropertyValue(name).trim();
    var parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function cssColor(name, fallback) {
    return getComputedStyle(root).getPropertyValue(name).trim() || fallback;
  }

  function toRgb(color) {
    var value = color.trim();
    var rgb = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (rgb) return rgb[1] + ', ' + rgb[2] + ', ' + rgb[3];
    if (value[0] === '#') {
      var hex = value.slice(1);
      if (hex.length === 3) {
        hex = hex
          .split('')
          .map(function (ch) {
            return ch + ch;
          })
          .join('');
      }
      if (hex.length === 6) {
        return [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16),
        ].join(', ');
      }
    }
    return fallbackRgb;
  }

  var fallbackRgb = '127, 184, 196';
  var palette = {};

  function refreshPalette() {
    palette.accent = toRgb(cssColor('--accent', '#7fb8c4'));
    palette.soft = toRgb(cssColor('--ink-soft', '#c2c7d0'));
    palette.gold = toRgb(cssColor('--gold', '#c9a15b'));
    palette.bg = toRgb(cssColor('--bg', '#14171d'));
  }

  function rgba(rgb, alpha) {
    return 'rgba(' + rgb + ', ' + alpha.toFixed(3) + ')';
  }

  function fitCanvas(canvas, ctx, w, h) {
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    var pw = Math.max(1, Math.round(w * ratio));
    var ph = Math.max(1, Math.round(h * ratio));
    if (canvas.width !== pw) canvas.width = pw;
    if (canvas.height !== ph) canvas.height = ph;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function diamond(ctx, x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r, y);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x - r, y);
    ctx.closePath();
    ctx.fill();
  }

  var heroCanvas = document.getElementById('evidence-network');
  var hctx = heroCanvas && heroCanvas.getContext ? heroCanvas.getContext('2d') : null;
  var hW = 0;
  var hH = 0;
  var hcx = 0;
  var hcy = 0;
  var hpts = [];
  var pointer = { x: 0, y: 0, active: false };
  var pull = 0;
  var yaw = 0;
  var pitch = 0;

  function heroPoint() {
    return {
      x: rand(-1, 1),
      y: rand(-1, 1),
      z: rand(-1, 1),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.45, 1.15),
      radius: rand(1.1, 2.0),
      diamond: Math.random() < 0.09,
    };
  }

  function heroGeometry() {
    if (!hctx) return;
    var rect = heroCanvas.parentElement.getBoundingClientRect();
    hW = Math.max(1, rect.width);
    hH = Math.max(1, rect.height);
    hcx = hW / 2;
    hcy = hH / 2;
    fitCanvas(heroCanvas, hctx, hW, hH);
  }

  function heroDensity() {
    if (!hctx) return;
    var count = Math.round(Math.min(72, Math.max(30, (hW * hH) / 24000)));
    while (hpts.length < count) hpts.push(heroPoint());
    if (hpts.length > count) hpts.length = count;
  }

  function drawHero(t) {
    if (!hctx) return;
    var visible = heroCanvas.getBoundingClientRect();
    if (visible.bottom < 0 || visible.top > window.innerHeight) return;

    hctx.clearRect(0, 0, hW, hH);
    pull += ((pointer.active ? 1 : 0) - pull) * 0.055;
    yaw += ((pointer.active ? (pointer.x / hW - 0.5) * 0.42 : 0) - yaw) * 0.04;
    pitch += ((pointer.active ? (pointer.y / hH - 0.5) * 0.28 : 0) - pitch) * 0.04;

    var ry = t * 0.000045 + yaw;
    var rx = 0.32 + pitch;
    var cosY = Math.cos(ry);
    var sinY = Math.sin(ry);
    var cosX = Math.cos(rx);
    var sinX = Math.sin(rx);
    var wobble = [];
    var projected = [];
    var lens = Math.min(150, Math.max(90, hW * 0.13));

    for (var i = 0; i < hpts.length; i++) {
      var p = hpts[i];
      var wx = p.x + 0.055 * Math.sin(t * 0.00022 * p.speed + p.phase);
      var wy = p.y + 0.055 * Math.cos(t * 0.00018 * p.speed + p.phase * 1.7);
      var wz = p.z + 0.055 * Math.sin(t * 0.0002 * p.speed + p.phase * 2.3);
      wobble.push(wx, wy, wz);

      var x = wx * cosY + wz * sinY;
      var z = wz * cosY - wx * sinY;
      var y = wy * cosX - z * sinX;
      z = wy * sinX + z * cosX;

      var scale = 2.35 / (2.35 + z);
      var depth = clamp01((scale - 0.68) / 0.62);
      var q = {
        x: hcx + x * scale * hW * 0.42,
        y: hcy + y * scale * hH * 0.5,
        scale: scale,
        alpha: 0.18 + 0.58 * depth,
        force: 0,
      };

      if (pull > 0.01) {
        var pdx = pointer.x - q.x;
        var pdy = pointer.y - q.y;
        var distance = Math.sqrt(pdx * pdx + pdy * pdy);
        if (distance < lens) {
          q.force = (1 - distance / lens) * pull;
          q.x += pdx * q.force * 0.1;
          q.y += pdy * q.force * 0.1;
        }
      }

      projected.push(q);
    }

    hctx.lineWidth = 1;
    for (var a = 0; a < hpts.length; a++) {
      for (var b = a + 1; b < hpts.length; b++) {
        var dx = wobble[a * 3] - wobble[b * 3];
        var dy = wobble[a * 3 + 1] - wobble[b * 3 + 1];
        var dz = wobble[a * 3 + 2] - wobble[b * 3 + 2];
        var d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 0.48) {
          hctx.strokeStyle = rgba(
            palette.accent,
            (1 - d / 0.48) * 0.18 * Math.min(projected[a].alpha, projected[b].alpha)
          );
          hctx.beginPath();
          hctx.moveTo(projected[a].x, projected[a].y);
          hctx.lineTo(projected[b].x, projected[b].y);
          hctx.stroke();
        }
      }
    }

    for (var c = 0; c < hpts.length; c++) {
      var q = projected[c];
      if (q.force > 0.025) {
        hctx.strokeStyle = rgba(palette.accent, 0.2 * q.force * q.alpha);
        hctx.beginPath();
        hctx.moveTo(pointer.x, pointer.y);
        hctx.lineTo(q.x, q.y);
        hctx.stroke();
      }
    }

    for (var n = 0; n < hpts.length; n++) {
      var node = hpts[n];
      var pos = projected[n];
      var glow = 1 + 0.42 * pos.force;
      var alpha = Math.min(0.88, pos.alpha * (1 + 0.45 * pos.force));
      if (node.diamond) {
        var r = 3.1 * pos.scale * glow;
        hctx.fillStyle = rgba(palette.gold, 0.08 * alpha);
        diamond(hctx, pos.x, pos.y, r * 2);
        hctx.fillStyle = rgba(palette.gold, 0.62 * alpha);
        diamond(hctx, pos.x, pos.y, r);
      } else {
        hctx.fillStyle = rgba(palette.soft, 0.5 * alpha);
        hctx.beginPath();
        hctx.arc(pos.x, pos.y, node.radius * pos.scale * glow, 0, Math.PI * 2);
        hctx.fill();
      }
    }
  }

  function initHeroPointer() {
    if (!hctx || reduceMotion) return;
    var hero = heroCanvas.parentElement;
    hero.addEventListener('pointermove', function (event) {
      var rect = heroCanvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    });
    hero.addEventListener('pointerleave', function () {
      pointer.active = false;
    });
    hero.addEventListener('pointercancel', function () {
      pointer.active = false;
    });
  }

  var marginCanvas = document.getElementById('margin-network');
  var mctx = marginCanvas && marginCanvas.getContext ? marginCanvas.getContext('2d') : null;
  var mW = 0;
  var mH = 0;
  var gutter = 0;
  var marginActive = false;
  var strips = [[], []];

  function marginPoint() {
    return {
      u: Math.random(),
      y: Math.random(),
      drift: rand(2.2, 6.2),
      parallax: rand(0.04, 0.12),
      phase: rand(0, Math.PI * 2),
      radius: rand(1, 1.8),
      diamond: Math.random() < 0.08,
    };
  }

  function marginGeometry() {
    if (!mctx) return;
    mW = window.innerWidth;
    mH = window.innerHeight;
    gutter = (mW - (cssPx('--maxw', 1000) + 96)) / 2;
    marginActive = gutter >= 72 && getComputedStyle(marginCanvas).display !== 'none';
    fitCanvas(marginCanvas, mctx, mW, mH);
  }

  function marginDensity() {
    if (!mctx || !marginActive) return;
    var count = Math.max(8, Math.min(26, Math.round((gutter * mH) / 7200)));
    for (var s = 0; s < strips.length; s++) {
      while (strips[s].length < count) strips[s].push(marginPoint());
      if (strips[s].length > count) strips[s].length = count;
    }
  }

  function drawMargin(t) {
    if (!mctx) return;
    mctx.clearRect(0, 0, mW, mH);
    if (!marginActive) return;

    var scroll = window.scrollY || 0;
    var innerW = Math.max(1, gutter - 16);
    var linkDistance = 96;

    for (var s = 0; s < 2; s++) {
      var points = strips[s];
      var x0 = (s === 0 ? 0 : mW - gutter) + 8;
      var projected = [];

      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var x = x0 + p.u * innerW + 2.5 * Math.sin(t * 0.0003 + p.phase);
        var y = (((p.y * mH - scroll * p.parallax - t * 0.001 * p.drift) % mH) + mH) % mH;
        var vertical = clamp01((y - 76) / 100) * clamp01((mH - 28 - y) / 100);
        var horizontal = s === 0 ? clamp01((gutter - x) / 34) : clamp01((x - (mW - gutter)) / 34);
        projected.push({ x: x, y: y, alpha: vertical * horizontal });
      }

      mctx.lineWidth = 1;
      for (var a = 0; a < points.length; a++) {
        if (projected[a].alpha <= 0.01) continue;
        for (var b = a + 1; b < points.length; b++) {
          if (projected[b].alpha <= 0.01) continue;
          var dx = projected[a].x - projected[b].x;
          var dy = projected[a].y - projected[b].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDistance) {
            mctx.strokeStyle = rgba(
              palette.accent,
              (1 - d / linkDistance) * 0.16 * Math.min(projected[a].alpha, projected[b].alpha)
            );
            mctx.beginPath();
            mctx.moveTo(projected[a].x, projected[a].y);
            mctx.lineTo(projected[b].x, projected[b].y);
            mctx.stroke();
          }
        }
      }

      for (var c = 0; c < points.length; c++) {
        var q = projected[c];
        if (q.alpha <= 0.01) continue;
        if (points[c].diamond) {
          mctx.fillStyle = rgba(palette.gold, 0.06 * q.alpha);
          diamond(mctx, q.x, q.y, 5.8);
          mctx.fillStyle = rgba(palette.gold, 0.42 * q.alpha);
          diamond(mctx, q.x, q.y, 2.8);
        } else {
          mctx.fillStyle = rgba(palette.soft, 0.36 * q.alpha);
          mctx.beginPath();
          mctx.arc(q.x, q.y, points[c].radius, 0, Math.PI * 2);
          mctx.fill();
        }
      }
    }
  }

  var lastTime = 0;
  var frameCount = 0;

  function frame(t) {
    lastTime = t;
    if (frameCount++ % 45 === 0) refreshPalette();
    drawHero(t);
    drawMargin(t);
    requestAnimationFrame(frame);
  }

  var resizeQueued = false;
  var densityTimer = 0;

  function onResize() {
    if (!resizeQueued) {
      resizeQueued = true;
      requestAnimationFrame(function () {
        resizeQueued = false;
        heroGeometry();
        marginGeometry();
        if (reduceMotion) {
          drawHero(lastTime);
          drawMargin(lastTime);
        }
      });
    }
    clearTimeout(densityTimer);
    densityTimer = setTimeout(function () {
      heroDensity();
      marginDensity();
      if (reduceMotion) {
        drawHero(lastTime);
        drawMargin(lastTime);
      }
    }, 180);
  }

  refreshPalette();
  initHeroPointer();
  heroGeometry();
  heroDensity();
  marginGeometry();
  marginDensity();
  window.addEventListener('resize', onResize);

  if (reduceMotion) {
    drawHero(0);
    drawMargin(0);
  } else {
    requestAnimationFrame(frame);
  }
})();
