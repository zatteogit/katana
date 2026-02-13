let index = [];

fetch('search-index.json')
  .then(res => res.json())
  .then(data => {
    index = data;
    document.getElementById('searchInput').addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      if (!query) return displayResults([]);

      const results = index
        .map(item => {
          const inTitle = item.title.toLowerCase().includes(query);
          const inKeywords = item.keywords.some(keyword => keyword.toLowerCase().includes(query));
          const inContent = item.content.toLowerCase().includes(query);
          
          // Calcolo della pertinenza basato su titolo, parole chiave e contenuto
          if (inTitle || inKeywords || inContent) {
            let matchStrength = 0;
            if (inTitle) matchStrength += 3;  // Più peso al titolo
            if (inKeywords) matchStrength += 2;  // Parole chiave importanti
            if (inContent) matchStrength += 1;  // Contenuto meno importante

            return {
              ...item,
              matchStrength,
              relevance: item.relevance // Rilevanza predefinita
            };
          }
          return null;
        })
        .filter(Boolean)
        .sort((a, b) => {
          // Ordinamento per rilevanza e forza del match
          return (a.relevance - b.relevance) || (b.matchStrength - a.matchStrength);
        });

      displayResults(results, query);
    });
  });

function highlight(text, query) {
  const reg = new RegExp(`(${query})`, 'gi');
  return text.replace(reg, '<mark>$1</mark>');
}

function displayResults(results, query = '') {
  const container = document.getElementById('results');
  container.innerHTML = '';
  if (results.length === 0) {
    container.innerHTML = '<li class="list-group-item">Nessun risultato trovato.</li>';
    return;
  }

  results.forEach(result => {
    const item = document.createElement('li');
    item.className = 'list-group-item';

    const contentSnippet = result.content.length > 120
      ? result.content.slice(0, 120) + '...'
      : result.content;

    item.innerHTML = `
      <a href="${result.url}" class="fw-bold">${highlight(result.title, query)}</a><br>
      <small>${highlight(contentSnippet, query)}</small><br>
      <span class="badge bg-secondary mt-1">Categoria: ${result.category}</span>
      <span class="badge bg-info mt-1">Rilevanza: ${result.relevance}</span>
    `;
    container.appendChild(item);
  });
}
