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

  function clockFromEvent(event, date) {
    var stamp = event && event.startStr;
    if (stamp && stamp.indexOf('T') !== -1) {
      var match = stamp.match(/T(\d{2}):(\d{2})/);
      if (match) return match[1] + ':' + match[2];
    }
    return date ? formatTime(date) : '';
  }

  function formatWeekWhen(event) {
    var start = event.start;
    if (!start) return '';
    var day = WEEKDAYS[start.getDay()];
    day = day.charAt(0).toUpperCase() + day.slice(1);
    if (event.allDay) return day;
    var text = day + ' · ' + clockFromEvent(event, start);
    if (event.end) {
      var endStamp = event.endStr;
      var endClock = '';
      if (endStamp && endStamp.indexOf('T') !== -1) {
        var match = endStamp.match(/T(\d{2}):(\d{2})/);
        if (match) endClock = match[1] + ':' + match[2];
      }
      text += '–' + (endClock || formatTime(event.end));
    }
    return text;
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

  function initCalendars() {
    var nodes = document.querySelectorAll('[data-kyma-calendar]');
    if (!nodes.length || typeof FullCalendar === 'undefined') return;

    var projects = readJSON('kyma-projects-index');
    var yamlEvents = yamlToEvents(readJSON('kyma-events-data'));
    var dialog = document.getElementById('calendar-dialog');
    var titleEl = document.getElementById('calendar-dialog-title');
    var whenEl = document.getElementById('calendar-dialog-when');
    var descEl = document.getElementById('calendar-dialog-desc');
    var locEl = document.getElementById('calendar-dialog-loc');
    var linkEl = document.getElementById('calendar-dialog-link');
    var projectEl = document.getElementById('calendar-dialog-project');

    function isMobile() {
      return window.innerWidth < 768;
    }

    function openEvent(event) {
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

    function initOne(el) {
      var mode = el.getAttribute('data-mode') || 'events';
      var meetings = mode === 'meetings';
      var upcoming = el.closest('.calendar-section').querySelector('[data-calendar-upcoming]');
      var lastMobile = isMobile();
      var viewRange = { start: null, end: null };
      var jumpedToNext = false;

      function initialView() {
        if (meetings) return isMobile() ? 'listWeek' : 'timeGridWeek';
        return isMobile() ? 'listMonth' : 'dayGridMonth';
      }

      function initialDate() {
        var d = new Date();
        if (!meetings) return d;
        var day = d.getDay();
        if (day === 0) d.setDate(d.getDate() + 1);
        if (day === 6) d.setDate(d.getDate() + 2);
        return d;
      }

      function toolbar() {
        if (meetings) {
          return {
            left: 'prev,next today',
            center: 'title',
            right: isMobile() ? 'listWeek' : 'timeGridWeek,listWeek'
          };
        }
        return {
          left: 'prev,next today',
          center: 'title',
          right: isMobile() ? 'listMonth,dayGridMonth' : 'dayGridMonth,listMonth'
        };
      }

      function renderUpcoming(events) {
        if (!upcoming) return;
        var now = new Date();
        var list = events.filter(function (event) { return event.start; });

        if (meetings && viewRange.start && viewRange.end) {
          list = list.filter(function (event) {
            return event.start >= viewRange.start && event.start < viewRange.end;
          });
        } else {
          list = list.filter(function (event) { return event.start >= now; }).slice(0, 5);
        }

        list.sort(function (a, b) { return a.start - b.start; });
        upcoming.innerHTML = '';
        if (!list.length) {
          upcoming.innerHTML = meetings
            ? '<li class="calendar-upcoming-empty">No hay reuniones publicadas esta semana.</li>'
            : '<li class="calendar-upcoming-empty">No hay eventos próximos.</li>';
          return;
        }

        list.forEach(function (event) {
          var project = resolveProject(event, projects);
          var item = document.createElement('li');
          var when = meetings
            ? formatWeekWhen(event)
            : formatRange(event.start, event.end, event.allDay);
          item.innerHTML =
            '<button type="button" class="calendar-upcoming-item">' +
              '<span class="calendar-upcoming-when">' + when + '</span>' +
              '<span class="calendar-upcoming-title">' + displayTitle(event.title) + '</span>' +
            '</button>';
          if (project) {
            var link = document.createElement('a');
            link.className = 'calendar-upcoming-project';
            link.href = project.url;
            link.textContent = 'Ficha de ' + project.title;
            item.appendChild(link);
          }
          item.querySelector('button').addEventListener('click', function () {
            openEvent(event);
          });
          upcoming.appendChild(item);
        });
      }

      var sources = [];
      if (meetings) {
        sources.push({ googleCalendarId: el.getAttribute('data-google-id') });
      } else {
        if (yamlEvents.length) sources.push({ events: yamlEvents });
        if (el.getAttribute('data-google-id')) {
          sources.push({ googleCalendarId: el.getAttribute('data-google-id') });
        }
      }

      var calendarOptions = {
        locale: 'es',
        firstDay: 1,
        initialView: initialView(),
        initialDate: initialDate(),
        height: 'auto',
        expandRows: true,
        nowIndicator: true,
        navLinks: false,
        editable: false,
        selectable: false,
        dayMaxEvents: true,
        weekends: !meetings,
        allDaySlot: !meetings,
        slotMinTime: '08:00:00',
        slotMaxTime: '21:00:00',
        slotDuration: '01:00:00',
        timeZone: 'local',
        eventDisplay: 'block',
        eventColor: '#041C30',
        eventTextColor: '#ffffff',
        displayEventEnd: meetings,
        eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
        eventContent: meetings ? function (arg) {
          return {
            html: '<div class="fc-event-time">' + arg.timeText + '</div><div class="fc-event-title">' + displayTitle(arg.event.title) + '</div>'
          };
        } : undefined,
        headerToolbar: toolbar(),
        buttonText: {
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          list: 'Lista'
        },
        googleCalendarApiKey: el.getAttribute('data-google-key'),
        eventClick: function (info) {
          info.jsEvent.preventDefault();
          openEvent(info.event);
        },
        eventDidMount: function (info) {
          var project = resolveProject(info.event, projects);
          if (!project) return;
          var color = PROJECT_COLORS[normalize(project.slug)] || '#041C30';
          info.el.style.backgroundColor = color;
          info.el.style.borderColor = color;
        },
        datesSet: function (info) {
          viewRange.start = info.start;
          viewRange.end = info.end;
          if (calendar) renderUpcoming(calendar.getEvents());
        },
        eventsSet: function (events) {
          if (!calendar) return;
          if (meetings && !jumpedToNext) {
            if (!events.length) {
              renderUpcoming(events);
              return;
            }
            var start = viewRange.start;
            var end = viewRange.end;
            var now = new Date();
            var inWeek = start && end && events.some(function (event) {
              return event.start && event.start >= start && event.start < end;
            });
            if (!inWeek) {
              var next = events
                .filter(function (event) { return event.start && event.start >= now; })
                .sort(function (a, b) { return a.start - b.start; })[0];
              if (next) {
                jumpedToNext = true;
                calendar.gotoDate(next.start);
                return;
              }
            }
            jumpedToNext = true;
          }
          renderUpcoming(events);
        },
        loading: function (busy) {
          if (!calendar || busy) return;
          renderUpcoming(calendar.getEvents());
        },
        windowResize: function () {
          if (!calendar) return;
          var mobile = isMobile();
          if (mobile === lastMobile) return;
          lastMobile = mobile;
          calendar.changeView(initialView());
          calendar.setOption('headerToolbar', toolbar());
        }
      };

      if (meetings) {
        calendarOptions.events = { googleCalendarId: el.getAttribute('data-google-id') };
      } else {
        calendarOptions.eventSources = sources;
      }

      var calendar = new FullCalendar.Calendar(el, calendarOptions);
      calendar.render();
    }

    nodes.forEach(initOne);
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
    initCalendars();
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
