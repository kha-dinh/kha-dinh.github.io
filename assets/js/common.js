// No side channels here.
console.log(
  '%ckha-dinh.github.io%c\nCuriosity noted. duykha.dinh@ubc.ca',
  'color: oklch(46% 0.27 264); font-family: monospace; font-weight: bold;',
  'color: inherit; font-family: monospace;'
);

$(document).ready(function() {
  // add toggle functionality to abstract and bibtex buttons
  $('a.abstract').click(function() {
    var $entry = $(this).closest('.col-sm-10, .col-sm-9');
    $entry.find(".abstract.hidden").toggleClass('open');
    $entry.find(".bibtex.hidden.open").toggleClass('open');
  });
  $('a.bibtex').click(function() {
    var $entry = $(this).closest('.col-sm-10, .col-sm-9');
    $entry.find(".bibtex.hidden").toggleClass('open');
    $entry.find(".abstract.hidden.open").toggleClass('open');
  });
  $('a').removeClass('waves-effect waves-light');

  // Publication topic filtering — build filter bar dynamically from rendered tags
  (function buildFilterBar() {
    var $bar = $('#pub-filter-bar');
    if (!$bar.length) return;
    var seen = {};
    var topics = [];
    $('.pub-topic-tag').each(function() {
      var t = $(this).data('topic');
      if (t && !seen[t]) { seen[t] = true; topics.push(t); }
    });
    if (!topics.length) { $bar.hide(); return; }
    var html = '<button class="filter-btn active" data-filter="all">all</button>';
    topics.forEach(function(t) {
      html += '<button class="filter-btn" data-filter="' + t + '">' + t + '</button>';
    });
    $bar.html(html);

    function applyActiveFilters() {
      var active = $bar.find('.filter-btn.active:not([data-filter="all"])').map(function() {
        return $(this).data('filter');
      }).get();
      if (!active.length) {
        $bar.find('.filter-btn[data-filter="all"]').addClass('active');
        filterByTopics([]);
      } else {
        filterByTopics(active);
      }
    }

    $bar.find('.filter-btn[data-filter="all"]').click(function() {
      $bar.find('.filter-btn').removeClass('active');
      $(this).addClass('active');
      filterByTopics([]);
    });

    $bar.find('.filter-btn:not([data-filter="all"])').click(function() {
      $bar.find('.filter-btn[data-filter="all"]').removeClass('active');
      $(this).toggleClass('active');
      applyActiveFilters();
    });

    // Apply ?topic= query param if present
    var params = new URLSearchParams(window.location.search);
    var topicParam = params.get('topic');
    if (topicParam) {
      var $match = $bar.find('.filter-btn[data-filter="' + topicParam + '"]');
      if ($match.length) $match.click();
      else filterByTopics([topicParam]);
    }
  })();

  function filterByTopics(active) {
    $('ol.bibliography li').each(function() {
      if (!active.length) {
        $(this).show();
      } else {
        var tags = $(this).find('.pub-topic-tag').map(function() {
          return $(this).data('topic');
        }).get();
        $(this).toggle(active.some(function(f) { return tags.indexOf(f) !== -1; }));
      }
    });
    $('.pub-topic-tag').removeClass('active');
    active.forEach(function(f) {
      $('.pub-topic-tag[data-topic="' + f + '"]').addClass('active');
    });
  }

  function filterByTopic(filter) {
    filterByTopics(filter === 'all' ? [] : [filter]);
  }

  // Clicking inline topic tags: filter in-place on /publications/, redirect otherwise
  $(document).on('click', '.pub-topics .pub-topic-tag', function() {
    var topic = $(this).data('topic');
    if (!$('#pub-filter-bar').length) {
      window.location.href = '/publications/?topic=' + encodeURIComponent(topic);
      return;
    }
    var $btn = $('#pub-filter-bar .filter-btn[data-filter="' + topic + '"]');
    if ($btn.length) {
      $btn.click();
    } else {
      // tag exists but has no filter button — toggle it directly
      var isActive = $(this).hasClass('active');
      if (isActive) {
        filterByTopic('all');
      } else {
        filterByTopic(topic);
      }
    }
  });

  // bootstrap-toc
  if($('#toc-sidebar').length){
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href  = "../css/jupyter.css";
  cssLink.rel   = "stylesheet";
  cssLink.type  = "text/css";

  let theme = localStorage.getItem("theme");
  if (theme == null || theme == "null") {
    const userPref = window.matchMedia;
    if (userPref && userPref("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    }
  }

  $('.jupyter-notebook-iframe-container iframe').each(function() {
    $(this).contents().find("head").append(cssLink);

    if (theme == "dark") {
      $(this).bind("load",function(){
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark"});
      });
    }
  });
});

