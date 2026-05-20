---
layout: page
permalink: /deadlines/
title: deadlines
nav: true
nav_order: 3
---

<div class="deadlines-page">

<p class="deadlines-disclaimer">Deadlines are scraped automatically via <a href="https://github.com/kha-dinh/deadline-crawler">deadline-crawler</a> and may be inaccurate. Always verify against the official CFP. Last crawled: {{ site.data.deadlines.generated_at | date: "%Y-%m-%d %H:%M UTC" }}. <a href="{{ '/assets/data/deadlines.yaml' | relative_url }}">raw data (YAML)</a></p>

{% assign confs = site.data.deadlines.conferences %}

<!-- collect unique areas and tiers -->
{% assign areas = "" %}
{% assign tiers = "" %}
{% for conf in confs %}
  {% if conf.area %}
    {% assign areas = areas | append: conf.area | append: "," %}
  {% endif %}
  {% if conf.tier %}
    {% assign tiers = tiers | append: conf.tier | append: "," %}
  {% endif %}
{% endfor %}
{% assign areas = areas | split: "," | uniq | sort %}
{% assign tiers = tiers | split: "," | uniq | sort %}

<div class="deadlines-filter-groups">
  <div class="deadlines-filter-bar" role="toolbar" aria-label="Filter by area">
    <span class="deadlines-filter-label">area</span>
    <button class="deadlines-filter active" aria-pressed="true" data-group="area" data-tag="all">All</button>
    {% for tag in areas %}
      {% if tag != "" %}
      <button class="deadlines-filter" aria-pressed="false" data-group="area" data-tag="{{ tag }}">{{ tag }}</button>
      {% endif %}
    {% endfor %}
  </div>
  <div class="deadlines-filter-bar" role="toolbar" aria-label="Filter by CORE Ranking">
    <span class="deadlines-filter-label">CORE RANKING<br>(<a href="https://portal.core.edu.au/conf-ranks" target="_blank" rel="noopener">ICORE2026</a>)</span>
    <button class="deadlines-filter active" aria-pressed="true" data-group="tier" data-tag="all">All</button>
    {% assign tier_order = "A*,A,B,C" | split: "," %}
    {% for t in tier_order %}
      {% if tiers contains t %}
      <button class="deadlines-filter" aria-pressed="false" data-group="tier" data-tag="{{ t }}">{{ t }}</button>
      {% endif %}
    {% endfor %}
  </div>
  <div class="deadlines-filter-bar" role="toolbar" aria-label="Filter by status">
    <span class="deadlines-filter-label">status</span>
    <button class="deadlines-filter" aria-pressed="false" data-group="status" data-tag="all">All</button>
    <button class="deadlines-filter active" aria-pressed="true" data-group="status" data-tag="upcoming">upcoming</button>
    <button class="deadlines-filter active" aria-pressed="true" data-group="status" data-tag="ongoing">ongoing</button>
    <button class="deadlines-filter" aria-pressed="false" data-group="status" data-tag="passed">passed</button>
  </div>
</div>

<div class="deadlines-timeline-wrap">
  <div class="deadlines-timeline" id="deadlines-timeline"></div>
  <div class="timeline-tooltip" id="timeline-tooltip"></div>
</div>
<div class="timeline-zoom-controls" id="timeline-zoom-controls">
  <button id="tl-zoom-reset" disabled>reset zoom</button>
  <button id="tl-select-clear" disabled>clear selection</button>
  <button id="tl-show-others" disabled>show unselected</button>
  <span id="tl-zoom-hint">drag to select range</span>
</div>

<div class="deadlines-legend">
  <span class="legend-item"><span class="status-dot upcoming"></span> upcoming</span>
  <span class="legend-item"><span class="status-dot passed"></span> passed</span>
</div>

<div id="deadlines-list"></div>

</div>

<script>
(function() {
  var CONFS = [
    {% for conf in confs %}
    {
      id: {{ conf.id | jsonify }},
      name: {{ conf.name | jsonify }},
      description: {{ conf.description | jsonify }},
      link: {{ conf.link | jsonify }},
      area: {{ conf.area | jsonify }},
      tier: {{ conf.tier | jsonify }},
      place: {{ conf.place | jsonify }},
      date: {{ conf.date | jsonify }},
      timezone: {{ conf.timezone | jsonify }},
      deadlines: [
        {% for d in conf.deadlines %}
        { label: {{ d.label | jsonify }}, date: {{ d.date | jsonify }}, passed: {{ d.passed | default: false }} }{% unless forloop.last %},{% endunless %}
        {% endfor %}
      ]
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  // sort by first deadline date (abstract or submission)
  CONFS.sort(function(a, b) {
    return parseDate(a.deadlines[0].date) - parseDate(b.deadlines[0].date);
  });

  var LABEL_SHORT = {
    abstract: 'ABS',
    submission: 'SUB',
    early_reject: 'ER',
    notification: 'NOT',
    shepherd: 'SHP',
    rebuttal_start: 'REB',
    rebuttal_end: 'REB',
    camera_ready: 'CR'
  };

  function formatDuration(ms) {
    var days = Math.floor(ms / 86400000);
    if (days >= 30) {
      var months = Math.floor(days / 30);
      var rem = days % 30;
      return rem > 0 ? months + 'mo ' + rem + 'd' : months + 'mo';
    }
    return days + 'd';
  }

  function formatCountdown(ms) {
    if (ms <= 0) return 'now';
    var d = Math.floor(ms / 86400000);
    var h = Math.floor((ms % 86400000) / 3600000);
    var m = Math.floor((ms % 3600000) / 60000);
    var s = Math.floor((ms % 60000) / 1000);
    if (d > 0) return d + 'd ' + h + 'h ' + m + 'm ' + s + 's';
    if (h > 0) return h + 'h ' + m + 'm ' + s + 's';
    return m + 'm ' + s + 's';
  }

  var FONT = '"Recursive", system-ui, sans-serif';

  // AoE = UTC-12. Parse deadline as AoE, return UTC Date.
  function parseDate(s) {
    return new Date(s.replace(' ', 'T') + ':00-12:00');
  }

  // Compute passed from date if not set by crawler
  (function() {
    var now = new Date();
    CONFS.forEach(function(c) {
      c.deadlines.forEach(function(d) {
        d.passed = parseDate(d.date) < now;
      });
    });
  })();

  function toLocalStr(s) {
    var d = parseDate(s);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    var h = String(d.getHours()).padStart(2, '0');
    var min = String(d.getMinutes()).padStart(2, '0');
    return y + '-' + m + '-' + day + ' ' + h + ':' + min;
  }

  // --- Zoom state ---
  var zoomStart = null; // Date or null (null = full extent)
  var zoomEnd = null;
  var fullStart = null; // computed from data, cached
  var fullEnd = null;

  // --- Focus state ---
  var selectedConfIds = [];
  var showOthers = true;
  var countdownEls = [];

  function isZoomed() {
    return zoomStart !== null && zoomEnd !== null;
  }

  function updateZoomControls() {
    var btn = document.getElementById('tl-zoom-reset');
    var clearBtn = document.getElementById('tl-select-clear');
    var othersBtn = document.getElementById('tl-show-others');
    var hint = document.getElementById('tl-zoom-hint');
    if (btn) btn.disabled = !isZoomed();
    if (clearBtn) clearBtn.disabled = selectedConfIds.length === 0;
    if (othersBtn) {
      othersBtn.disabled = selectedConfIds.length === 0;
      othersBtn.textContent = showOthers ? 'hide unselected' : 'show unselected';
    }
    if (hint) {
      if (selectedConfIds.length > 0) {
        var names = selectedConfIds.map(function(id) {
          var fc = CONFS.filter(function(c) { return c.id === id; })[0];
          return fc ? fc.name : id;
        }).join(', ');
        hint.textContent = selectedConfIds.length + ' selected: ' + names + ' \u00b7 click to deselect';
      } else if (isZoomed()) {
        hint.textContent = 'drag to select · dblclick to reset';
      } else {
        hint.textContent = 'drag to select range · click label to select';
      }
    }
  }

  function resetZoom() {
    zoomStart = null;
    zoomEnd = null;
    updateZoomControls();
    buildTimeline();
  }

  document.getElementById('tl-zoom-reset').addEventListener('click', resetZoom);

  document.getElementById('tl-select-clear').addEventListener('click', function() {
    selectedConfIds = [];
    showOthers = true;
    writeFiltersToURL();
    buildList();
    buildTimeline();
  });

  document.getElementById('tl-show-others').addEventListener('click', function() {
    showOthers = !showOthers;
    writeFiltersToURL();
    buildList();
    buildTimeline();
    updateZoomControls();
  });

  function buildTimeline() {
    var container = document.getElementById('deadlines-timeline');
    if (!container) return;

    var hasSelection = selectedConfIds.length > 0;
    var filtered = (hasSelection && !showOthers)
      ? CONFS.filter(function(c) { return selectedConfIds.indexOf(c.id) !== -1; })
      : filterConfs();

    // selected first, then upcoming, then passed
    filtered.sort(function(a, b) {
      var aSel = hasSelection && selectedConfIds.indexOf(a.id) !== -1 ? 0 : 1;
      var bSel = hasSelection && selectedConfIds.indexOf(b.id) !== -1 ? 0 : 1;
      if (aSel !== bSel) return aSel - bSel;
      var aUp = a.deadlines.some(function(d) { return !d.passed; }) ? 0 : 1;
      var bUp = b.deadlines.some(function(d) { return !d.passed; }) ? 0 : 1;
      if (aUp !== bUp) return aUp - bUp;
      return parseDate(a.deadlines[0].date) - parseDate(b.deadlines[0].date);
    });

    if (filtered.length === 0) {
      container.innerHTML = '';
      return;
    }

    // compute full date extent
    var allDates = [];
    filtered.forEach(function(c) {
      c.deadlines.forEach(function(d) { allDates.push(parseDate(d.date)); });
    });
    // always anchor range to start of previous month so today marker always
    // shows with a clean month tick to its left
    var _t = new Date();
    allDates.push(new Date(_t.getFullYear(), _t.getMonth() - 1, 1));
    allDates.push(_t);
    var minDate = new Date(Math.min.apply(null, allDates));
    var maxDate = new Date(Math.max.apply(null, allDates));
    var pad = (maxDate - minDate) * 0.04;
    fullStart = new Date(minDate.getTime() - pad);
    fullEnd = new Date(maxDate.getTime() + pad);

    var rangeStart = isZoomed() ? zoomStart : fullStart;
    var rangeEnd = isZoomed() ? zoomEnd : fullEnd;
    var rangeMs = rangeEnd - rangeStart;

    var LANE_H = 24;
    var TOP_PAD = 96; // must fit rotated tick labels: label_width/√2 + font_size/√2 + 6 ≤ TOP_PAD
    var BOT_PAD = 6;
    var containerW = container.clientWidth || 700;
    var LEFT_PAD = containerW < 420 ? 72 : 130;
    var RIGHT_PAD = 16;
    var svgH = TOP_PAD + filtered.length * LANE_H + BOT_PAD;
    var chartW = containerW - LEFT_PAD - RIGHT_PAD;

    // store layout for interaction handlers
    container._tl = {
      rangeStart: rangeStart, rangeEnd: rangeEnd, rangeMs: rangeMs,
      LEFT_PAD: LEFT_PAD, RIGHT_PAD: RIGHT_PAD, chartW: chartW,
      containerW: containerW, TOP_PAD: TOP_PAD, svgH: svgH
    };

    function xPos(dateStr) {
      var t = parseDate(dateStr).getTime();
      return LEFT_PAD + ((t - rangeStart.getTime()) / rangeMs) * chartW;
    }

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var textColor = isDark ? 'oklch(90% 0.002 264)' : 'oklch(5% 0.004 264)';
    var textLight = isDark ? 'oklch(62% 0.002 264)' : 'oklch(48% 0.002 264)';
    var gridColor = isDark ? 'oklch(25% 0.003 264)' : 'oklch(91% 0.003 264)';
    var accentColor = isDark ? 'oklch(61% 0.22 264)' : 'oklch(46% 0.27 264)';
    var passedDot = isDark ? 'oklch(38% 0.004 264)' : 'oklch(78% 0.004 264)';
    var laneLineColor = isDark ? 'oklch(30% 0.003 264)' : 'oklch(88% 0.004 264)';

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="' + svgH + '"'
      + ' viewBox="0 0 ' + containerW + ' ' + svgH + '"'
      + ' style="font-family:' + FONT + ';overflow:visible;"'
      + ' aria-hidden="true">';

    // clip rect for chart area (hides dots/lines outside zoom range)
    svg += '<defs><clipPath id="tl-clip"><rect x="' + LEFT_PAD + '" y="0" width="' + chartW + '" height="' + svgH + '" /></clipPath></defs>';

    // row hover highlights — rendered first so grid/dots draw on top
    filtered.forEach(function(conf, i) {
      svg += '<rect class="tl-row-highlight" data-conf-id="' + conf.id.replace(/"/g, '&quot;') + '" x="0" y="' + (TOP_PAD + i * LANE_H) + '" width="' + containerW + '" height="' + LANE_H + '" fill="transparent" pointer-events="none" />';
    });

    // today x position
    var now = new Date();
    var todayX = -Infinity;
    if (now >= rangeStart && now <= rangeEnd) {
      todayX = LEFT_PAD + ((now.getTime() - rangeStart.getTime()) / rangeMs) * chartW;
    }

    // adaptive grid ticks based on visible range
    var rangeDays = rangeMs / 86400000;

    function addTick(x, label) {
      if (x < LEFT_PAD || x > LEFT_PAD + chartW) return;
      svg += '<line x1="' + x + '" y1="' + TOP_PAD + '" x2="' + x + '" y2="' + (svgH - BOT_PAD) + '" stroke="' + gridColor + '" stroke-width="1" />';
      if (label && Math.abs(x - todayX) > 20) {
        svg += '<text x="' + x + '" y="' + (TOP_PAD - 6) + '" font-size="10" letter-spacing="0.04em" fill="' + textLight + '" transform="rotate(-45 ' + x + ' ' + (TOP_PAD - 6) + ')">' + label + '</text>';
      }
    }

    // always draw monthly ticks
    var d = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);
    while (d <= rangeEnd) {
      var x = LEFT_PAD + ((d.getTime() - rangeStart.getTime()) / rangeMs) * chartW;
      var monthLabel = d.toLocaleString('en', { month: 'short' }).toUpperCase() + ' ' + String(d.getFullYear()).slice(2);
      addTick(x, monthLabel);
      d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    }

    // when zoomed < 6 months: add mid-month (15th) ticks
    if (rangeDays < 180) {
      d = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 15);
      while (d <= rangeEnd) {
        var x = LEFT_PAD + ((d.getTime() - rangeStart.getTime()) / rangeMs) * chartW;
        var label = d.toLocaleString('en', { month: 'short' }).toUpperCase() + ' ' + d.getDate();
        addTick(x, label);
        d = new Date(d.getFullYear(), d.getMonth() + 1, 15);
      }
    }

    // when zoomed < 2 months: add weekly ticks
    if (rangeDays < 60) {
      var weekStart = new Date(rangeStart);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // align to Sunday
      while (weekStart <= rangeEnd) {
        // skip if too close to 1st or 15th (already drawn)
        var dom = weekStart.getDate();
        if (dom !== 1 && dom !== 15 && Math.abs(dom - 1) > 2 && Math.abs(dom - 15) > 2) {
          var x = LEFT_PAD + ((weekStart.getTime() - rangeStart.getTime()) / rangeMs) * chartW;
          var label = weekStart.toLocaleString('en', { month: 'short' }).toUpperCase() + ' ' + weekStart.getDate();
          addTick(x, label);
        }
        weekStart = new Date(weekStart.getTime() + 7 * 86400000);
      }
    }

    // today marker
    if (todayX > -Infinity) {
      svg += '<line x1="' + todayX + '" y1="' + TOP_PAD + '" x2="' + todayX + '" y2="' + (svgH - BOT_PAD) + '" stroke="' + accentColor + '" stroke-width="1.5" stroke-dasharray="3,3" />';
      var todayStr = 'TODAY (' + now.toLocaleString('en', { month: 'short' }).toUpperCase() + ' ' + now.getDate() + ')';
      svg += '<text x="' + todayX + '" y="' + (TOP_PAD - 6) + '" font-size="10" letter-spacing="0.04em" fill="' + accentColor + '" transform="rotate(-45 ' + todayX + ' ' + (TOP_PAD - 6) + ')">' + todayStr + '</text>';
    }

    // lanes (clipped to chart area)
    svg += '<g clip-path="url(#tl-clip)">';
    filtered.forEach(function(conf, i) {
      var y = TOP_PAD + i * LANE_H + LANE_H / 2;
      var allPassed = conf.deadlines.every(function(d) { return d.passed; });
      var isSelected = selectedConfIds.indexOf(conf.id) !== -1;
      var isOtherFocused = hasSelection && !isSelected;
      var laneOpacity = isOtherFocused ? '0.25' : '1';

      svg += '<g opacity="' + laneOpacity + '">';

      // connecting line
      if (conf.deadlines.length > 1) {
        var x1 = xPos(conf.deadlines[0].date);
        var x2 = xPos(conf.deadlines[conf.deadlines.length - 1].date);
        svg += '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="' + (allPassed ? passedDot : laneLineColor) + '" stroke-width="1" />';
      }

      // deadline dots
      conf.deadlines.forEach(function(dl) {
        var cx = xPos(dl.date);
        var dotColor = dl.passed ? passedDot : accentColor;
        var r = dl.passed ? 3 : 4;
        var label = dl.label.replace(/_/g, ' ');
        var tooltip = conf.name + ' \u2014 ' + label + ' (' + toLocalStr(dl.date) + ')';
        if (!dl.passed) {
          var hoursLeft = Math.ceil((parseDate(dl.date) - now) / 3600000);
          if (hoursLeft > 48) {
            var daysLeft = Math.ceil(hoursLeft / 24);
            tooltip += ' \u2014 ' + daysLeft + 'd left';
          } else {
            tooltip += ' \u2014 ' + hoursLeft + 'h left';
          }
        }
        svg += '<g class="tl-dot-group">';
        svg += '<circle cx="' + cx + '" cy="' + y + '" r="8" fill="transparent" class="tl-dot" data-tip="' + tooltip.replace(/"/g, '&quot;') + '" style="cursor:default" />';
        svg += '<circle cx="' + cx + '" cy="' + y + '" r="' + r + '" fill="' + dotColor + '" class="tl-dot-vis" pointer-events="none" />';
        svg += '</g>';
      });

      svg += '</g>';
    });
    svg += '</g>';

    // conference labels (outside clip so always visible)
    filtered.forEach(function(conf, i) {
      var y = TOP_PAD + i * LANE_H + LANE_H / 2;
      var allPassed = conf.deadlines.every(function(d) { return d.passed; });
      var isSelected = selectedConfIds.indexOf(conf.id) !== -1;
      var isOtherFocused = selectedConfIds.length > 0 && !isSelected;
      var maxLabelLen = LEFT_PAD < 100 ? 9 : 18;
      var labelName = conf.name.length > maxLabelLen ? conf.name.substring(0, maxLabelLen - 1) + '\u2026' : conf.name;
      var labelColor = isSelected ? accentColor : (isOtherFocused ? passedDot : (allPassed ? passedDot : textColor));
      var labelOpacity = isOtherFocused ? '0.35' : '1';
      var labelSize = LEFT_PAD < 100 ? 10 : 11;
      var fontWeight = isSelected ? '400' : '300';
      svg += '<text x="' + (LEFT_PAD - 6) + '" y="' + (y + 3) + '" font-size="' + labelSize + '" font-weight="' + fontWeight + '" letter-spacing="0.02em" fill="' + labelColor + '" opacity="' + labelOpacity + '" text-anchor="end" pointer-events="none" style="font-variation-settings:\'MONO\' 1,\'CASL\' 0">' + labelName + '</text>';
      // transparent hit rect for conf info tooltip + focus click
      var tipParts = ['<strong>' + esc(conf.name) + '</strong>'];
      if (!isSelected) tipParts.push('<em>click to select</em>');
      else tipParts.push('<em>click to deselect</em>');
      if (conf.description) tipParts.push(esc(conf.description));
      var locDate = [conf.place, conf.date].filter(Boolean).map(esc).join(' \u00b7 ');
      if (locDate) tipParts.push(locDate);
      var tags = [conf.area, conf.tier].filter(Boolean).map(esc).join(' \u00b7 ');
      if (tags) tipParts.push('<em>' + tags + '</em>');
      var tipHtml = tipParts.join('<br>');
      svg += '<rect x="0" y="' + (TOP_PAD + i * LANE_H) + '" width="' + (LEFT_PAD - 4) + '" height="' + LANE_H + '" fill="transparent" pointer-events="all" class="tl-conf-label" style="cursor:pointer" data-conf-id="' + conf.id.replace(/"/g, '&quot;') + '" data-tip-html="' + tipHtml.replace(/"/g, '&quot;') + '" />';
    });

    // no overlay rect — events bound to container so tooltips still work

    svg += '</svg>';
    container.innerHTML = svg;
    updateZoomControls();
    bindTooltips();
    bindInteractions(container);
  }

  function bindTooltips() {
    var tip = document.getElementById('timeline-tooltip');
    if (!tip) return;
    var tipHideTimer = null;
    var pinnedItems = []; // { el, tipEl, fixedTop, scrollY }

    function getConnectorSvg() {
      var svg = document.getElementById('tl-connectors');
      if (!svg) {
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'tl-connectors';
        var page = document.querySelector('.deadlines-page') || document.body;
        page.appendChild(svg);
      }
      return svg;
    }

    function updateLine(item) {
      if (!item.lineEl) return;
      var nodeRect = item.el.getBoundingClientRect();
      var tipRect = item.tipEl.getBoundingClientRect();
      var nx = nodeRect.left + nodeRect.width / 2;
      var ny = nodeRect.top + nodeRect.height / 2;
      var tx = tipRect.left + tipRect.width / 2;
      var ty = tipRect.bottom;
      item.lineEl.setAttribute('x1', nx);
      item.lineEl.setAttribute('y1', ny);
      item.lineEl.setAttribute('x2', tx);
      item.lineEl.setAttribute('y2', ty);
    }

    function onScrollPins() {
      pinnedItems.forEach(function(item) {
        item.tipEl.style.top = (item.fixedTop - (window.scrollY - item.scrollY)) + 'px';
        updateLine(item);
      });
    }

    function isPinned(el) {
      return pinnedItems.some(function(p) { return p.el === el; });
    }

    function unpinItem(el) {
      var idx = -1;
      for (var i = 0; i < pinnedItems.length; i++) {
        if (pinnedItems[i].el === el) { idx = i; break; }
      }
      if (idx === -1) return;
      var item = pinnedItems.splice(idx, 1)[0];
      item.tipEl.remove();
      if (item.lineEl) item.lineEl.remove();
      var svg = document.getElementById('tl-connectors');
      if (svg && svg.childElementCount === 0) svg.remove();
      var visDot = el.nextElementSibling;
      if (visDot && visDot.classList.contains('tl-dot-vis')) {
        visDot.classList.remove('tl-dot-pinned', 'tl-dot-hovered');
      }
      if (pinnedItems.length === 0) window.removeEventListener('scroll', onScrollPins);
    }

    function unpinAll() {
      pinnedItems.slice().forEach(function(item) { unpinItem(item.el); });
    }

    function pinEl(el) {
      var tipEl = document.createElement('div');
      tipEl.className = 'timeline-tooltip visible pinned';
      var html = el.getAttribute('data-tip-html');
      if (html) tipEl.innerHTML = html;
      else tipEl.textContent = el.getAttribute('data-tip') || '';
      var page = document.querySelector('.deadlines-page') || document.body;
      page.appendChild(tipEl);
      var rect = el.getBoundingClientRect();
      tipEl.style.top = '-9999px';
      var tipH = tipEl.offsetHeight;
      var ANGLE_RAD = 75 * Math.PI / 180; // CCW from positive x-axis; 90°=up, 100°=up-left
      var LINE_LEN = 60; // px from node center to tooltip bottom-center
      var nodeCx = rect.left + rect.width / 2;
      var nodeCy = rect.top + rect.height / 2;
      var horizOffset = LINE_LEN * Math.cos(ANGLE_RAD);
      var vertOffset  = LINE_LEN * Math.sin(ANGLE_RAD); // positive = upward in screen
      tipEl.style.left = (nodeCx + horizOffset) + 'px';
      tipEl.style.transform = 'translateX(-50%)';
      var fixedTop = nodeCy - vertOffset - tipH;
      tipEl.style.top = fixedTop + 'px';
      // Shift up to avoid overlapping existing pinned tooltips
      var GAP = 6;
      var maxPasses = pinnedItems.length + 1;
      for (var pass = 0; pass < maxPasses; pass++) {
        var newR = tipEl.getBoundingClientRect();
        var shifted = false;
        for (var pi = 0; pi < pinnedItems.length; pi++) {
          var otherR = pinnedItems[pi].tipEl.getBoundingClientRect();
          var overlapV = newR.bottom > otherR.top && newR.top < otherR.bottom;
          var overlapH = newR.right > otherR.left + 4 && newR.left < otherR.right - 4;
          if (overlapV && overlapH) {
            fixedTop -= (newR.bottom - otherR.top + GAP);
            tipEl.style.top = fixedTop + 'px';
            shifted = true;
            break;
          }
        }
        if (!shifted) break;
      }
      tipEl.addEventListener('click', function(e) { e.stopPropagation(); unpinItem(el); });
      // Connector line
      var lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      lineEl.setAttribute('stroke-width', '1.5');
      lineEl.setAttribute('stroke-dasharray', '5,3');
      lineEl.setAttribute('opacity', '0.75');
      lineEl.classList.add('tl-connector');
      getConnectorSvg().appendChild(lineEl);
      var item = { el: el, tipEl: tipEl, lineEl: lineEl, fixedTop: fixedTop, scrollY: window.scrollY };
      if (pinnedItems.length === 0) window.addEventListener('scroll', onScrollPins, { passive: true });
      pinnedItems.push(item);
      updateLine(item);
      var visDot = el.nextElementSibling;
      if (visDot && visDot.classList.contains('tl-dot-vis')) visDot.classList.add('tl-dot-pinned');
    }

    function showTip(el, e) {
      clearTimeout(tipHideTimer);
      var html = el.getAttribute('data-tip-html');
      if (html) {
        tip.innerHTML = html;
        var elRect = el.getBoundingClientRect();
        tip.style.left = (elRect.left + elRect.width / 2) + 'px';
        tip.style.transform = 'translateX(-50%)';
        tip.style.top = '-9999px';
        tip.classList.add('visible');
        tip.style.top = (elRect.top - tip.offsetHeight - 8) + 'px';
      } else {
        tip.textContent = el.getAttribute('data-tip');
        var rect = el.getBoundingClientRect();
        tip.style.left = (rect.left + rect.width / 2) + 'px';
        tip.style.transform = 'translateX(-50%)';
        tip.style.top = '-9999px';
        tip.classList.add('visible');
        tip.style.top = (rect.top - tip.offsetHeight - 8) + 'px';
      }
    }

    document.querySelectorAll('[data-tip], [data-tip-html]').forEach(function(el) {
      el.addEventListener('mouseenter', function(e) {
        if (isPinned(el)) return;
        showTip(el, e);
        var visDot = el.nextElementSibling;
        if (visDot && visDot.classList.contains('tl-dot-vis')) visDot.classList.add('tl-dot-hovered');
      });
      el.addEventListener('mouseleave', function() {
        if (isPinned(el)) return;
        tipHideTimer = setTimeout(function() { tip.classList.remove('visible'); }, 1000);
        var visDot = el.nextElementSibling;
        if (visDot && visDot.classList.contains('tl-dot-vis')) visDot.classList.remove('tl-dot-hovered');
      });
      el.addEventListener('click', function(e) {
        if (el.classList.contains('tl-conf-label')) return;
        if (el.classList.contains('deadline-date')) return;
        e.stopPropagation();
        if (isPinned(el)) { unpinItem(el); return; }
        tip.classList.remove('visible');
        pinEl(el);
      });
      el.addEventListener('focus', function(e) {
        if (isPinned(el)) return;
        clearTimeout(tipHideTimer);
        showTip(el, e);
      });
      el.addEventListener('blur', function() {
        if (isPinned(el)) return;
        tipHideTimer = setTimeout(function() { tip.classList.remove('visible'); }, 200);
      });
    });

    document.addEventListener('click', function() { unpinAll(); });
  }

  // --- Interaction: brush select, shift+drag pan, dblclick reset ---
  function bindInteractions(container) {
    var svgEl = container.querySelector('svg');
    if (!svgEl) return;
    var tl = container._tl;

    function xToDate(px) {
      var frac = (px - tl.LEFT_PAD) / tl.chartW;
      return new Date(tl.rangeStart.getTime() + frac * tl.rangeMs);
    }

    function svgX(e) {
      var rect = svgEl.getBoundingClientRect();
      return (e.clientX - rect.left) * (tl.containerW / rect.width);
    }

    var brushRect = null;
    var brushStartX = 0;

    svgEl.addEventListener('mousedown', function(e) {
      if (e.target.hasAttribute('data-tip')) return;
      e.preventDefault();
      brushStartX = svgX(e);
      brushRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      brushRect.classList.add('timeline-brush-rect');
      brushRect.setAttribute('x', brushStartX);
      brushRect.setAttribute('y', tl.TOP_PAD);
      brushRect.setAttribute('width', 0);
      brushRect.setAttribute('height', tl.svgH - tl.TOP_PAD - 6);
      svgEl.appendChild(brushRect);
    });

    document.addEventListener('mousemove', function(e) {
      if (!brushRect) return;
      var cx = svgX(e);
      var x = Math.max(tl.LEFT_PAD, Math.min(cx, tl.LEFT_PAD + tl.chartW));
      var bx = Math.max(tl.LEFT_PAD, Math.min(brushStartX, tl.LEFT_PAD + tl.chartW));
      brushRect.setAttribute('x', Math.min(x, bx));
      brushRect.setAttribute('width', Math.abs(x - bx));
    });

    document.addEventListener('mouseup', function(e) {
      if (!brushRect) return;
      var cx = svgX(e);
      var x1 = Math.max(tl.LEFT_PAD, Math.min(Math.min(brushStartX, cx), tl.LEFT_PAD + tl.chartW));
      var x2 = Math.max(tl.LEFT_PAD, Math.min(Math.max(brushStartX, cx), tl.LEFT_PAD + tl.chartW));
      if (brushRect.parentNode) brushRect.parentNode.removeChild(brushRect);
      brushRect = null;

      if (x2 - x1 > 5) {
        zoomStart = xToDate(x1);
        zoomEnd = xToDate(x2);
        updateZoomControls();
        buildTimeline();
      }
    });

    svgEl.addEventListener('dblclick', function() {
      if (isZoomed()) resetZoom();
    });

    // conf label hover → highlight row
    var _isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var _rowHoverColor = _isDark ? 'oklch(22% 0.002 264)' : 'oklch(96% 0.003 264)';
    svgEl.querySelectorAll('.tl-conf-label').forEach(function(el) {
      var id = el.getAttribute('data-conf-id');
      var row = svgEl.querySelector('.tl-row-highlight[data-conf-id="' + id + '"]');
      el.addEventListener('mouseenter', function() { if (row) row.setAttribute('fill', _rowHoverColor); });
      el.addEventListener('mouseleave', function() { if (row) row.setAttribute('fill', 'transparent'); });
    });

    // conf label click → focus/unfocus
    svgEl.querySelectorAll('.tl-conf-label').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.stopPropagation();
        var tip = document.getElementById('timeline-tooltip');
        if (tip) tip.classList.remove('visible');
        var id = el.getAttribute('data-conf-id');
        var _idx = selectedConfIds.indexOf(id);
        if (_idx === -1) selectedConfIds.push(id);
        else selectedConfIds.splice(_idx, 1);
        buildList();
        buildTimeline();
        writeFiltersToURL();
      });
    });
  }

  function esc(s) {
    var el = document.createElement('span');
    el.textContent = s;
    return el.innerHTML;
  }

  function renderEntry(conf) {
    var hasUpcoming = conf.deadlines.some(function(d) { return !d.passed; });
    var isEntrySelected = selectedConfIds.indexOf(conf.id) !== -1;
    var html = '<div class="deadline-entry' + (hasUpcoming ? ' has-upcoming' : ' all-passed') + (isEntrySelected ? ' selected' : '') + '" data-conf-id="' + esc(conf.id) + '">';
    html += '<div class="deadline-header">';
    html += '<div class="deadline-title-row">';
    html += '<h3 class="deadline-title-toggle">' + esc(conf.name) + '<a href="' + esc(conf.link) + '" class="deadline-conf-link" title="Conference website" target="_blank" rel="noopener">&#8599;</a></h3>';
    html += '<div class="deadline-tags">';
    html += '<span class="deadline-tag area">' + esc(conf.area) + '</span>';
    html += '<span class="deadline-tag tier">' + esc(conf.tier) + '</span>';
    html += '</div></div>';
    var meta = esc(conf.description);
    var venue = [conf.place, conf.date].filter(Boolean).map(esc).join(', ');
    if (venue) meta += ' \u00b7 ' + venue;
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'local';
    meta += ' \u00b7 times in ' + esc(tz);
    html += '<p class="deadline-meta">' + meta + '</p>';
    // two-segment progress bar: gray (now→first deadline) + blue (first→last deadline)
    // total scale = 8 months
    var SCALE_MS = 8 * 30 * 86400000;
    var t0 = parseDate(conf.deadlines[0].date).getTime();
    var t1 = parseDate(conf.deadlines[conf.deadlines.length - 1].date).getTime();
    var nowMs = new Date().getTime();
    var nextDl = conf.deadlines.find(function(d) { return !d.passed; });
    // gray bar = time from now until next deadline, proportional to 8 months
    var grayPct = 0;
    if (nextDl) {
      var nextMs = parseDate(nextDl.date).getTime();
      grayPct = ((nextMs - nowMs) / SCALE_MS) * 100;
    }
    var countdownHtml = '';
    if (nextDl) {
      var dlMs = parseDate(nextDl.date).getTime();
      var diff = dlMs - nowMs;
      var dlLabel = nextDl.label.replace(/_/g, ' ');
      countdownHtml = '<span class="deadline-countdown" data-target="' + dlMs + '" data-label="' + esc(dlLabel) + '">'
        + esc(dlLabel) + ' in ' + formatCountdown(diff) + '</span>';
    }
    html += '<div class="deadline-progress-wrap">';
    html += '<div class="deadline-progress">';
    if (grayPct > 0) html += '<div class="deadline-progress-gray" style="width:' + grayPct.toFixed(1) + '%"></div>';
    var bluePct = 100 - grayPct;
    if (bluePct > 0) html += '<div class="deadline-progress-fill" style="width:' + bluePct.toFixed(1) + '%"></div>';
    html += '</div>';
    html += '<div class="deadline-progress-labels">';
    if (countdownHtml) html += countdownHtml;
    html += '</div></div>';
    html += '</div>';
    html += '<div class="deadline-dates">';
    conf.deadlines.forEach(function(d) {
      var cls = d.passed ? 'passed' : 'upcoming';
      var tip = d.date + ' AoE';
      var dt = parseDate(d.date);
      var now = new Date();
      var diff = dt - now;
      if (d.passed) {
        tip += ' (passed)';
      } else {
        var h = Math.ceil(diff / 3600000);
        if (h <= 48) {
          tip += ' (' + h + 'h left)';
        } else {
          tip += ' (' + Math.ceil(h / 24) + 'd left)';
        }
      }
      html += '<div class="deadline-date ' + cls + '" data-tip="' + esc(tip) + '" data-date="' + esc(d.date) + '" tabindex="0">';
      html += '<span class="deadline-label">' + esc(d.label.replace(/_/g, ' ')) + '</span>';
      html += '<span class="deadline-value">' + esc(toLocalStr(d.date)) + '</span>';
      html += '</div>';
    });
    html += '</div></div>';
    return html;
  }

  function getActiveFilters() {
    var areas = [];
    var tiers = [];
    document.querySelectorAll('.deadlines-filter.active[data-group="area"]').forEach(function(b) {
      var t = b.getAttribute('data-tag');
      if (t !== 'all') areas.push(t);
    });
    document.querySelectorAll('.deadlines-filter.active[data-group="tier"]').forEach(function(b) {
      var t = b.getAttribute('data-tag');
      if (t !== 'all') tiers.push(t);
    });
    return { areas: areas, tiers: tiers };
  }

  function getConfStatus(c) {
    var allPassed = c.deadlines.every(function(d) { return d.passed; });
    if (allPassed) return 'passed';
    var submitDls = c.deadlines.filter(function(d) {
      return d.label === 'abstract' || d.label === 'submission';
    }).sort(function(a, b) { return parseDate(a.date) - parseDate(b.date); });
    var firstSubmit = submitDls.length > 0 ? submitDls[0] : null;
    if (firstSubmit && firstSubmit.passed) return 'ongoing';
    return 'upcoming';
  }

  function filterConfs() {
    var f = getActiveFilters();
    var statuses = [];
    document.querySelectorAll('.deadlines-filter.active[data-group="status"]').forEach(function(b) {
      var t = b.getAttribute('data-tag');
      if (t !== 'all') statuses.push(t);
    });
    return CONFS.filter(function(c) {
      var matchArea = f.areas.length === 0 || f.areas.indexOf(c.area) !== -1;
      var matchTier = f.tiers.length === 0 || f.tiers.indexOf(c.tier) !== -1;
      var matchStatus = statuses.length === 0 || statuses.indexOf(getConfStatus(c)) !== -1;
      return matchArea && matchTier && matchStatus;
    });
  }

  function buildList() {
    var container = document.getElementById('deadlines-list');
    if (!container) return;

    var filtered = filterConfs();

    // upcoming: first submission-type deadline (abstract or submission) not yet passed
    // ongoing: first submission-type deadline passed, but still has upcoming deadlines
    // passed: all deadlines passed
    var upcoming = [];
    var ongoing = [];
    var passed = [];
    filtered.forEach(function(c) {
      var allPassed = c.deadlines.every(function(d) { return d.passed; });
      if (allPassed) { passed.push(c); return; }
      var submitDls2 = c.deadlines.filter(function(d) {
        return d.label === 'abstract' || d.label === 'submission';
      }).sort(function(a, b) { return parseDate(a.date) - parseDate(b.date); });
      var firstSubmit = submitDls2.length > 0 ? submitDls2[0] : null;
      if (firstSubmit && firstSubmit.passed) {
        ongoing.push(c);
      } else {
        upcoming.push(c);
      }
    });

    // when selection active: sort selected to top within each section
    var hasSelection = selectedConfIds.length > 0;
    function sortSelected(arr) {
      if (!hasSelection) return arr;
      var sel = arr.filter(function(c) { return selectedConfIds.indexOf(c.id) !== -1; });
      var rest = arr.filter(function(c) { return selectedConfIds.indexOf(c.id) === -1; });
      return sel.concat(rest);
    }

    var html = '';
    if (upcoming.length > 0) {
      html += '<h2 class="deadlines-section-heading">upcoming</h2>';
      sortSelected(upcoming).forEach(function(conf) { html += renderEntry(conf); });
    }
    if (ongoing.length > 0) {
      html += '<h2 class="deadlines-section-heading ongoing">ongoing</h2>';
      sortSelected(ongoing).forEach(function(conf) { html += renderEntry(conf); });
    }
    if (passed.length > 0) {
      html += '<h2 class="deadlines-section-heading passed">passed</h2>';
      sortSelected(passed).forEach(function(conf) { html += renderEntry(conf); });
    }
    container.innerHTML = html;
    countdownEls = Array.prototype.slice.call(container.querySelectorAll('.deadline-countdown'));

    // highlight the next immediate deadline per entry
    container.querySelectorAll('.deadline-entry').forEach(function(entry) {
      var first = entry.querySelector('.deadline-date.upcoming');
      if (first) first.classList.add('next-immediate');
    });

    // when hiding others: hide unselected entries and empty section headings
    if (hasSelection && !showOthers) {
      container.querySelectorAll('.deadline-entry').forEach(function(entry) {
        if (selectedConfIds.indexOf(entry.getAttribute('data-conf-id')) === -1) {
          entry.style.display = 'none';
        }
      });
      container.querySelectorAll('.deadlines-section-heading').forEach(function(heading) {
        var sib = heading.nextElementSibling;
        var hasVisible = false;
        while (sib && !sib.classList.contains('deadlines-section-heading')) {
          if (sib.style.display !== 'none') { hasVisible = true; break; }
          sib = sib.nextElementSibling;
        }
        if (!hasVisible) heading.style.display = 'none';
      });
    }
    container.querySelectorAll('.deadline-entry').forEach(function(entry) {
      entry.addEventListener('click', function(e) {
        if (e.target.closest('a')) return;
        var id = entry.getAttribute('data-conf-id');
        var _i = selectedConfIds.indexOf(id);
        if (_i === -1) selectedConfIds.push(id);
        else selectedConfIds.splice(_i, 1);
        buildList();
        buildTimeline();
        writeFiltersToURL();
      });
    });
  }

  var DEFAULTS = { area: 'SEC,SYS', tier: 'A*', status: 'upcoming' };

  function readFiltersFromURL() {
    var params = new URLSearchParams(window.location.search);
    var noParams = params.toString() === '';
    ['area', 'tier'].forEach(function(group) {
      var val = params.get(group) || (noParams ? DEFAULTS[group] : null);
      if (!val) return;
      var allBtn = document.querySelector('.deadlines-filter[data-group="' + group + '"][data-tag="all"]');
      var tagBtns = document.querySelectorAll('.deadlines-filter[data-group="' + group + '"]:not([data-tag="all"])');
      if (val === 'all') {
        if (allBtn) allBtn.classList.add('active');
        tagBtns.forEach(function(b) { b.classList.remove('active'); });
      } else {
        var vals = val.split(',');
        if (allBtn) allBtn.classList.remove('active');
        tagBtns.forEach(function(b) {
          b.classList.toggle('active', vals.indexOf(b.getAttribute('data-tag')) !== -1);
        });
      }
    });
    var statusVal = params.get('status') || (noParams ? DEFAULTS.status : null);
    if (statusVal) {
      var statusVals = statusVal.split(',');
      document.querySelectorAll('.deadlines-filter[data-group="status"]').forEach(function(b) {
        b.classList.toggle('active', statusVals.indexOf(b.getAttribute('data-tag')) !== -1);
      });
    }
    var focusVal = params.get('focus');
    if (focusVal) selectedConfIds = focusVal.split(',').filter(Boolean);
    if (params.get('others') === 'hide') showOthers = false;
    // sync aria-pressed for all filter buttons
    document.querySelectorAll('.deadlines-filter').forEach(function(b) {
      b.setAttribute('aria-pressed', b.classList.contains('active') ? 'true' : 'false');
    });
  }

  function writeFiltersToURL() {
    var params = new URLSearchParams();
    ['area', 'tier'].forEach(function(group) {
      var allBtn = document.querySelector('.deadlines-filter[data-group="' + group + '"][data-tag="all"]');
      if (allBtn && allBtn.classList.contains('active')) return; // default — omit
      var active = [];
      document.querySelectorAll('.deadlines-filter.active[data-group="' + group + '"]:not([data-tag="all"])').forEach(function(b) {
        active.push(b.getAttribute('data-tag'));
      });
      if (active.length) params.set(group, active.join(','));
    });
    var activeStatuses = [];
    document.querySelectorAll('.deadlines-filter.active[data-group="status"]').forEach(function(b) {
      activeStatuses.push(b.getAttribute('data-tag'));
    });
    var defaultStatuses = ['upcoming', 'ongoing'];
    var isDefault = activeStatuses.length === defaultStatuses.length &&
      defaultStatuses.every(function(s) { return activeStatuses.indexOf(s) !== -1; });
    if (!isDefault) params.set('status', activeStatuses.join(','));
    if (selectedConfIds.length > 0) params.set('focus', selectedConfIds.join(','));
    if (selectedConfIds.length > 0 && !showOthers) params.set('others', 'hide');
    var qs = params.toString();
    history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
  }

  document.querySelectorAll('.deadlines-filter').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var group = btn.getAttribute('data-group');
      var allBtn = document.querySelector('.deadlines-filter[data-group="' + group + '"][data-tag="all"]');
      var tagBtns = document.querySelectorAll('.deadlines-filter[data-group="' + group + '"]:not([data-tag="all"])');

      if (!allBtn) {
        // Simple toggle (e.g., hide-passed)
        btn.classList.toggle('active');
      } else if (btn.getAttribute('data-tag') === 'all') {
        // All: activate All, deactivate specific tags
        btn.classList.add('active');
        tagBtns.forEach(function(b) { b.classList.remove('active'); });
      } else {
        // Specific tag: toggle it, deactivate All
        btn.classList.toggle('active');
        allBtn.classList.remove('active');
        // If none active, revert to All
        var anyActive = Array.prototype.some.call(tagBtns, function(b) { return b.classList.contains('active'); });
        if (!anyActive) allBtn.classList.add('active');
      }
      // sync aria-pressed
      document.querySelectorAll('.deadlines-filter[data-group="' + group + '"]').forEach(function(b) {
        b.setAttribute('aria-pressed', b.classList.contains('active') ? 'true' : 'false');
      });
      buildList();
      buildTimeline();
      writeFiltersToURL();
    });
  });

  readFiltersFromURL();
  buildList();
  buildTimeline();

  // re-render on theme change
  var observer = new MutationObserver(function() { buildTimeline(); });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // debounced resize
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() { buildTimeline(); }, 150);
  });

  // live countdown ticker — update every second
  setInterval(function() {
    var now = Date.now();
    countdownEls.forEach(function(el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var label = el.getAttribute('data-label');
      var diff = target - now;
      if (diff <= 0) {
        el.textContent = label + ' — now!';
      } else {
        el.textContent = label + ' in ' + formatCountdown(diff);
      }
    });
  }, 1000);
})();
</script>
