(function () {
  function normalize(value) {
    return (value || '').toString().toLowerCase().trim();
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function formatRange(start, end, allDay) {
    if (!start) return '';
    var months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    var d = start;
    var date = d.getDate() + ' de ' + months[d.getMonth()] + ' de ' + d.getFullYear();
    if (allDay) return date;
    var time = pad(d.getHours()) + ':' + pad(d.getMinutes());
    if (end) {
      var sameDay = start.toDateString() === end.toDateString();
      time += ' – ' + (sameDay ? '' : end.getDate() + ' de ' + months[end.getMonth()] + ', ') + pad(end.getHours()) + ':' + pad(end.getMinutes());
    }
    return date + ' · ' + time;
  }

  function filterProjects() {
    var catalog = document.querySelector('[data-project-catalog]');
    if (!catalog) return;

    var query = normalize((document.getElementById('project-search') || {}).value);
    var active = document.querySelector('.project-filters button.is-active');
    var line = active ? active.getAttribute('data-filter') : 'all';
    var cards = catalog.querySelectorAll('.project-card-item');
    var visible = 0;

    cards.forEach(function (card) {
      var haystack = [
        card.getAttribute('data-title'),
        card.getAttribute('data-summary'),
        card.getAttribute('data-keywords')
      ].join(' ');
      var lines = normalize(card.getAttribute('data-lines'));
      var matchesQuery = !query || haystack.indexOf(query) !== -1;
      var matchesLine = line === 'all' || lines.indexOf(line) !== -1;
      var show = matchesQuery && matchesLine;
      card.style.display = show ? '' : 'none';
      if (show) visible += 1;
    });

    var empty = document.getElementById('project-empty');
    if (empty) empty.style.display = visible ? 'none' : 'block';
  }

  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('navigation-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      toggle.querySelector('.nav-toggle-label').textContent = open ? 'Cerrar' : 'Menú';
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        window.setTimeout(function () { setOpen(false); }, 50);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) setOpen(false);
    });
  }

  var WEEKDAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var PROJECT_COLORS = {
    ion: '#0e7c7b',
    roky: '#4891dc',
    coralink: '#1f4e79',
    metis: '#c45c26',
    kuntur: '#041c30',
    talos: '#5b4b8a',
    kronos: '#2f5d50',
    apolo: '#8a4b2f',
    turing: '#3d5a80',
    piezo: '#6b7c3a',
    kytron: '#4a6fa5',
    gluky: '#7a4e7a',
    simlab: '#4d6b4d',
    kyno: '#666666'
  };

  function readJSON(id) {
    var node = document.getElementById(id);
    if (!node) return [];
    try { return JSON.parse(node.textContent); } catch (e) { return []; }
  }

  function formatTime(date) {
    return pad(date.getHours()) + ':' + pad(date.getMinutes());
  }

  function displayTitle(title) {
    return (title || 'Evento').replace(/^proyecto\s+/i, '');
  }

  function resolveProject(event, projects) {
    var props = event.extendedProps || {};
    var slug = normalize(props.project);
    var i;
    if (slug) {
      for (i = 0; i < projects.length; i++) {
        if (normalize(projects[i].slug) === slug) return projects[i];
      }
    }
    var title = normalize(displayTitle(event.title));
    for (i = 0; i < projects.length; i++) {
      var p = projects[i];
      if (normalize(p.title) === title || normalize(p.slug) === title) return p;
    }
    return null;
  }

  function yamlToEvents(items) {
    return (items || []).map(function (item) {
      var start = item.start || item.date;
      var allDay = !!item.allDay || (start && String(start).length <= 10);
      return {
        title: item.title,
        start: start,
        end: item.end || null,
        url: item.url || '',
        allDay: allDay,
        extendedProps: {
          description: item.description || '',
          location: item.location || '',
          project: item.project || ''
        }
      };
    }).filter(function (item) { return item.start; });
  }

  var MONTHS_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];

  function mondayOf(date) {
    var d = new Date(date);
    d.setHours(0, 0, 0, 0);
    var day = d.getDay();
    var shift = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + shift);
    return d;
  }

  function workWeekStart(from) {
    var d = new Date(from);
    d.setHours(0, 0, 0, 0);
    var day = d.getDay();
    if (day === 0) d.setDate(d.getDate() + 1);
    if (day === 6) d.setDate(d.getDate() + 2);
    return mondayOf(d);
  }

  function addDays(date, n) {
    var d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
  }

  function clockFromIso(stamp) {
    if (stamp && stamp.indexOf('T') !== -1) {
      var match = stamp.match(/T(\d{2}):(\d{2})/);
      if (match) return match[1] + ':' + match[2];
    }
    return '';
  }

  function formatWeekLabel(monday) {
    var friday = addDays(monday, 4);
    var sameMonth = monday.getMonth() === friday.getMonth();
    var start = monday.getDate() + (sameMonth ? '' : ' ' + MONTHS_SHORT[monday.getMonth()]);
    return start + ' – ' + friday.getDate() + ' ' + MONTHS_SHORT[friday.getMonth()] + ' ' + friday.getFullYear();
  }

  function openCalendarDialog(event, projects) {
    var dialog = document.getElementById('calendar-dialog');
    var titleEl = document.getElementById('calendar-dialog-title');
    var whenEl = document.getElementById('calendar-dialog-when');
    var descEl = document.getElementById('calendar-dialog-desc');
    var locEl = document.getElementById('calendar-dialog-loc');
    var linkEl = document.getElementById('calendar-dialog-link');
    var projectEl = document.getElementById('calendar-dialog-project');
    if (!dialog) return;

    var project = resolveProject(event, projects);
    titleEl.textContent = displayTitle(event.title);
    whenEl.textContent = formatRange(event.start, event.end, event.allDay);
    var desc = (event.extendedProps && event.extendedProps.description) || '';
    descEl.textContent = desc.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    descEl.hidden = !descEl.textContent;
    var loc = (event.extendedProps && event.extendedProps.location) || '';
    locEl.textContent = loc ? 'Lugar: ' + loc : '';
    locEl.hidden = !loc;
    if (project && projectEl) {
      projectEl.href = project.url;
      projectEl.textContent = 'Proyecto: ' + project.title;
      projectEl.hidden = false;
    } else if (projectEl) {
      projectEl.hidden = true;
    }
    if (event.url && linkEl) {
      linkEl.href = event.url;
      linkEl.hidden = false;
    } else if (linkEl) {
      linkEl.hidden = true;
    }
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }

  function initCalendars() {
    var el = document.querySelector('[data-kyma-calendar]');
    if (!el || typeof FullCalendar === 'undefined') return;

    var projects = readJSON('kyma-projects-index');
    var yamlEvents = yamlToEvents(readJSON('kyma-events-data'));
    var upcoming = el.closest('.calendar-section').querySelector('[data-calendar-upcoming]');
    var lastMobile = window.innerWidth < 768;
    var calendar;

    function isMobile() {
      return window.innerWidth < 768;
    }

    function renderUpcoming(events) {
      if (!upcoming) return;
      var now = new Date();
      var list = events
        .filter(function (event) { return event.start && event.start >= now; })
        .sort(function (a, b) { return a.start - b.start; })
        .slice(0, 5);

      upcoming.innerHTML = '';
      if (!list.length) {
        upcoming.innerHTML = '<li class="calendar-upcoming-empty">No hay eventos próximos.</li>';
        return;
      }

      list.forEach(function (event) {
        var item = document.createElement('li');
        item.innerHTML =
          '<button type="button" class="calendar-upcoming-item">' +
            '<span class="calendar-upcoming-when">' + formatRange(event.start, event.end, event.allDay) + '</span>' +
            '<span class="calendar-upcoming-title">' + displayTitle(event.title) + '</span>' +
          '</button>';
        item.querySelector('button').addEventListener('click', function () {
          openCalendarDialog(event, projects);
        });
        upcoming.appendChild(item);
      });
    }

    var sources = [];
    if (yamlEvents.length) sources.push({ events: yamlEvents });
    if (el.getAttribute('data-google-id')) {
      sources.push({ googleCalendarId: el.getAttribute('data-google-id') });
    }

    calendar = new FullCalendar.Calendar(el, {
      locale: 'es',
      firstDay: 1,
      initialView: isMobile() ? 'listMonth' : 'dayGridMonth',
      height: 'auto',
      expandRows: true,
      nowIndicator: true,
      navLinks: false,
      editable: false,
      selectable: false,
      dayMaxEvents: true,
      timeZone: 'local',
      eventDisplay: 'block',
      eventColor: '#041C30',
      eventTextColor: '#ffffff',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: isMobile() ? 'listMonth,dayGridMonth' : 'dayGridMonth,listMonth'
      },
      buttonText: { today: 'Hoy', month: 'Mes', list: 'Lista' },
      googleCalendarApiKey: el.getAttribute('data-google-key'),
      eventSources: sources,
      eventClick: function (info) {
        info.jsEvent.preventDefault();
        openCalendarDialog(info.event, projects);
      },
      eventsSet: function (events) {
        renderUpcoming(events);
      },
      loading: function (busy) {
        if (busy || !calendar) return;
        renderUpcoming(calendar.getEvents());
      },
      windowResize: function () {
        var mobile = isMobile();
        if (mobile === lastMobile) return;
        lastMobile = mobile;
        calendar.changeView(mobile ? 'listMonth' : 'dayGridMonth');
        calendar.setOption('headerToolbar', {
          left: 'prev,next today',
          center: 'title',
          right: mobile ? 'listMonth,dayGridMonth' : 'dayGridMonth,listMonth'
        });
      }
    });

    calendar.render();
    return calendar;
  }

  function initCalendarSwitch(calendar) {
    var root = document.querySelector('[data-calendar-switch]');
    if (!root) return;

    var kickerEl = root.querySelector('[data-calendar-kicker]');
    var headingEl = root.querySelector('#agenda-heading');
    var leadEl = root.querySelector('[data-calendar-lead]');
    var tabs = root.querySelectorAll('[data-calendar-tab]');
    var panels = root.querySelectorAll('[data-calendar-panel]');

    function show(name) {
      tabs.forEach(function (tab) {
        var on = tab.getAttribute('data-calendar-tab') === name;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-calendar-panel') !== name;
      });
      var active = root.querySelector('[data-calendar-tab="' + name + '"]');
      if (active) {
        if (kickerEl && active.getAttribute('data-kicker')) kickerEl.textContent = active.getAttribute('data-kicker');
        if (headingEl && active.getAttribute('data-heading')) headingEl.textContent = active.getAttribute('data-heading');
        if (leadEl && active.getAttribute('data-lead')) leadEl.textContent = active.getAttribute('data-lead');
      }
      if (name === 'events' && calendar) {
        window.requestAnimationFrame(function () { calendar.updateSize(); });
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        show(tab.getAttribute('data-calendar-tab'));
      });
    });
  }

  function initMeetBoard() {
    var root = document.querySelector('[data-meet-board]');
    if (!root) return;

    var projects = readJSON('kyma-projects-index');
    var lanesEl = root.querySelector('[data-meet-lanes]');
    var titleEl = root.querySelector('[data-meet-title]');
    var key = root.getAttribute('data-google-key');
    var calId = root.getAttribute('data-google-id');
    var monday = workWeekStart(new Date());

    function mapGoogleEvent(item) {
      var startStamp = (item.start && (item.start.dateTime || item.start.date)) || '';
      var endStamp = (item.end && (item.end.dateTime || item.end.date)) || '';
      return {
        title: item.summary || 'Reunión',
        start: startStamp ? new Date(startStamp) : null,
        end: endStamp ? new Date(endStamp) : null,
        startStr: startStamp,
        endStr: endStamp,
        url: item.htmlLink || '',
        allDay: !!(item.start && item.start.date && !item.start.dateTime),
        extendedProps: {
          description: item.description || '',
          location: item.location || ''
        }
      };
    }

    function renderLanes(events) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (titleEl) titleEl.textContent = formatWeekLabel(monday);
      lanesEl.innerHTML = '';

      for (var i = 0; i < 5; i++) {
        var day = addDays(monday, i);
        var next = addDays(monday, i + 1);
        var dayEvents = events.filter(function (event) {
          return event.start && event.start >= day && event.start < next;
        }).sort(function (a, b) { return a.start - b.start; });

        var lane = document.createElement('section');
        lane.className = 'meet-lane' + (day.getTime() === today.getTime() ? ' is-today' : '');
        var heading = document.createElement('h4');
        heading.innerHTML = WEEKDAYS[day.getDay()].replace(/^./, function (c) { return c.toUpperCase(); }) +
          ' <span>' + day.getDate() + '</span>';
        lane.appendChild(heading);

        var list = document.createElement('ol');
        list.className = 'meet-lane-list';
        if (!dayEvents.length) {
          list.innerHTML = '<li class="meet-lane-empty">Sin reus</li>';
        } else {
          dayEvents.forEach(function (event) {
            var project = resolveProject(event, projects);
            var color = project ? (PROJECT_COLORS[normalize(project.slug)] || '#041C30') : '#041C30';
            var time = clockFromIso(event.startStr);
            if (event.endStr) time += (time ? '–' : '') + clockFromIso(event.endStr);
            var item = document.createElement('li');
            var card = document.createElement(project ? 'a' : 'div');
            card.className = 'meet-card';
            if (project) {
              card.href = project.url;
              card.setAttribute('aria-label', displayTitle(event.title) + ', ' + time);
            }
            card.style.borderLeftColor = color;
            card.innerHTML =
              (time ? '<span class="meet-card-time">' + time + '</span>' : '') +
              '<strong class="meet-card-title">' + displayTitle(event.title) + '</strong>';
            item.appendChild(card);
            list.appendChild(item);
          });
        }
        lane.appendChild(list);
        lanesEl.appendChild(lane);
      }
    }

    function load() {
      if (!lanesEl || !key || !calId) return;
      lanesEl.innerHTML = '<p class="meet-board-status">Cargando horario…</p>';
      var from = monday;
      var to = addDays(monday, 5);
      var url = 'https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(calId) +
        '/events?key=' + encodeURIComponent(key) +
        '&timeMin=' + encodeURIComponent(from.toISOString()) +
        '&timeMax=' + encodeURIComponent(to.toISOString()) +
        '&singleEvents=true&orderBy=startTime';

      fetch(url).then(function (res) { return res.json(); }).then(function (data) {
        if (data.error) throw new Error(data.error.message || 'Calendar');
        renderLanes((data.items || []).map(mapGoogleEvent));
      }).catch(function () {
        lanesEl.innerHTML = '<p class="meet-board-status">No se pudo cargar el horario de reuniones.</p>';
      });
    }

    var prev = root.querySelector('[data-meet-prev]');
    var next = root.querySelector('[data-meet-next]');
    var todayBtn = root.querySelector('[data-meet-today]');
    if (prev) prev.addEventListener('click', function () { monday = addDays(monday, -7); load(); });
    if (next) next.addEventListener('click', function () { monday = addDays(monday, 7); load(); });
    if (todayBtn) todayBtn.addEventListener('click', function () { monday = workWeekStart(new Date()); load(); });

    load();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();

    var search = document.getElementById('project-search');
    var filters = document.querySelectorAll('.project-filters button');

    if (search) search.addEventListener('input', filterProjects);
    filters.forEach(function (button) {
      button.addEventListener('click', function () {
        filters.forEach(function (item) { item.classList.remove('is-active'); });
        button.classList.add('is-active');
        filterProjects();
      });
    });

    var params = new URLSearchParams(window.location.search);
    var preset = params.get('linea');
    if (preset) {
      filters.forEach(function (button) {
        if (button.getAttribute('data-filter') === preset) {
          filters.forEach(function (item) { item.classList.remove('is-active'); });
          button.classList.add('is-active');
        }
      });
    }
    filterProjects();

    var peopleSearch = document.getElementById('people-search');
    if (peopleSearch) {
      peopleSearch.addEventListener('input', function () {
        var q = normalize(peopleSearch.value);
        document.querySelectorAll('.lab-person-item, .lab-docente-item').forEach(function (item) {
          var text = normalize(item.textContent);
          item.style.display = !q || text.indexOf(q) !== -1 ? '' : 'none';
        });
      });
    }

    initTernas();
    var calendar = initCalendars();
    initMeetBoard();
    initCalendarSwitch(calendar);
  });

  function initTernas() {
    var root = document.querySelector('[data-ternas]');
    if (!root) return;

    var track = root.querySelector('.ternas-track');
    var slides = root.querySelectorAll('.terna');
    var status = root.querySelector('.ternas-status');
    var dotsWrap = root.querySelector('.ternas-dots');
    var prev = root.querySelector('[data-terna-prev]');
    var next = root.querySelector('[data-terna-next]');
    if (!track || !slides.length) return;

    var index = 0;
    var viewport = root.querySelector('.ternas-viewport');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'ternas-dot' + (i === index ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Terna ' + (i + 1) + ' de ' + slides.length);
        dot.addEventListener('click', function () { go(i); });
        dotsWrap.appendChild(dot);
      });
    }

    function go(n) {
      index = (n + slides.length) % slides.length;
      var width = viewport ? viewport.offsetWidth : track.offsetWidth;
      track.style.transform = 'translateX(-' + (index * width) + 'px)';
      if (status) status.textContent = 'Terna ' + (index + 1) + ' de ' + slides.length;
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.ternas-dot').forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === index);
        });
      }
    }

    window.addEventListener('resize', function () { go(index); });

    if (prev) prev.addEventListener('click', function () { go(index - 1); });
    if (next) next.addEventListener('click', function () { go(index + 1); });

    var startX = 0;
    track.addEventListener('touchstart', function (e) {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      go(index + (dx < 0 ? 1 : -1));
    }, { passive: true });

    if (reduce) track.style.transition = 'none';
    renderDots();
    go(0);
  }
})();
