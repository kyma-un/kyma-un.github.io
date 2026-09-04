(function () {
  function normalize(value) {
    return (value || '').toString().toLowerCase().trim();
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

  document.addEventListener('DOMContentLoaded', function () {
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
  });
})();
