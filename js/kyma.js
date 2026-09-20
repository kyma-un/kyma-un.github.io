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
      toggle.querySelector('.nav-toggle-label').textContent = open ? 'Cerrar' : 'Menú';
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) setOpen(false);
    });
  }

  function initCalendar() {
    var el = document.querySelector('[data-kyma-calendar]');
    if (!el || typeof FullCalendar === 'undefined') return;

    var upcoming = document.getElementById('calendar-upcoming');
    var dialog = document.getElementById('calendar-dialog');
    var titleEl = document.getElementById('calendar-dialog-title');
    var whenEl = document.getElementById('calendar-dialog-when');
    var descEl = document.getElementById('calendar-dialog-desc');
    var locEl = document.getElementById('calendar-dialog-loc');
    var linkEl = document.getElementById('calendar-dialog-link');
    var viewLabel = document.getElementById('calendar-view-label');

    function isMobile() {
      return window.innerWidth < 768;
    }

    function initialView() {
      return isMobile() ? 'listMonth' : 'dayGridMonth';
    }

    var lastMobile = isMobile();

    function renderUpcoming(events) {
      if (!upcoming) return;
      var now = new Date();
      var next = events
        .filter(function (event) { return event.start && event.start >= now; })
        .sort(function (a, b) { return a.start - b.start; })
        .slice(0, 5);

      upcoming.innerHTML = '';
      if (!next.length) {
        upcoming.innerHTML = '<li class="calendar-upcoming-empty">No hay eventos próximos en la agenda pública.</li>';
        return;
      }

      next.forEach(function (event) {
        var item = document.createElement('li');
        item.innerHTML =
          '<button type="button" class="calendar-upcoming-item">' +
            '<span class="calendar-upcoming-when">' + formatRange(event.start, event.end, event.allDay) + '</span>' +
            '<span class="calendar-upcoming-title">' + (event.title || 'Evento') + '</span>' +
          '</button>';
        item.querySelector('button').addEventListener('click', function () {
          openEvent(event);
        });
        upcoming.appendChild(item);
      });
    }

    function openEvent(event) {
      if (!dialog) return;
      titleEl.textContent = event.title || 'Evento';
      whenEl.textContent = formatRange(event.start, event.end, event.allDay);
      var desc = (event.extendedProps && event.extendedProps.description) || '';
      descEl.textContent = desc.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      descEl.hidden = !descEl.textContent;
      var loc = (event.extendedProps && event.extendedProps.location) || '';
      locEl.textContent = loc ? 'Lugar: ' + loc : '';
      locEl.hidden = !loc;
      if (event.url) {
        linkEl.href = event.url;
        linkEl.hidden = false;
      } else {
        linkEl.hidden = true;
      }
      if (typeof dialog.showModal === 'function') dialog.showModal();
    }

    var calendar = new FullCalendar.Calendar(el, {
      locale: 'es',
      initialView: initialView(),
      height: 'auto',
      expandRows: true,
      nowIndicator: true,
      navLinks: true,
      editable: false,
      selectable: false,
      dayMaxEvents: true,
      allDaySlot: false,
      slotMinTime: '06:00:00',
      slotMaxTime: '22:00:00',
      timeZone: 'America/Bogota',
      eventDisplay: 'block',
      eventColor: '#041C30',
      eventTextColor: '#ffffff',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: isMobile() ? 'listMonth,dayGridMonth' : 'dayGridMonth,timeGridWeek,listMonth'
      },
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        list: 'Agenda'
      },
      googleCalendarApiKey: el.getAttribute('data-google-key'),
      events: {
        googleCalendarId: el.getAttribute('data-google-id')
      },
      eventClick: function (info) {
        info.jsEvent.preventDefault();
        openEvent(info.event);
      },
      datesSet: function (info) {
        if (viewLabel) {
          var map = { timeGridWeek: 'Semana', dayGridMonth: 'Mes', listMonth: 'Agenda' };
          viewLabel.textContent = map[info.view.type] || info.view.title;
        }
      },
      eventsSet: function (events) {
        renderUpcoming(events);
      },
      loading: function (busy) {
        if (!busy) renderUpcoming(calendar.getEvents());
      },
      windowResize: function () {
        var mobile = isMobile();
        if (mobile === lastMobile) return;
        lastMobile = mobile;
        calendar.changeView(mobile ? 'listMonth' : 'dayGridMonth');
        calendar.setOption('headerToolbar', {
          left: 'prev,next today',
          center: 'title',
          right: mobile ? 'listMonth,dayGridMonth' : 'dayGridMonth,timeGridWeek,listMonth'
        });
      }
    });

    calendar.render();
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
    initCalendar();
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
