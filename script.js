// DADOS DOS EPISÓDIOS
const episodes = [
  // Temporada 1
  {
    id: 'ep1',
    season: 1,
    number: 1,
    title: 'Casa de Verão',
    thumb: 'images/ep1.jpg',
    duration: '45 min',
    date: '17 Jun 2022',
    synopsis: 'Belly e sua família chegam a Cousins Beach para o verão. Ela tem uma queda por Conrad desde os 10 anos, mas ele a vê apenas como uma garotinha.',
    tags: ['Romance', 'Drama', 'Adolescência']
  },
  {
    id: 'ep2',
    season: 1,
    number: 2,
    title: 'Vestido de Verão',
    thumb: 'images/poster2.jpg',
    duration: '43 min',
    date: '17 Jun 2022',
    synopsis: 'Belly vai às compras para seu vestido de debutante. Conrad começa a agir de forma estranha, enquanto Jeremiah e Steven tentam proteger Belly.',
    tags: ['Debutante', 'Conflitos']
  },
  {
    id: 'ep3',
    season: 1,
    number: 3,
    title: 'Noites de Verão',
    thumb: 'images/poster3.jpg',
    duration: '48 min',
    date: '17 Jun 2022',
    synopsis: 'Belly comemora seu 16º aniversário. Ela descobre que Conrad comprou um presente especial para ela, mas ele nunca o entregou.',
    tags: ['Aniversário', 'Mistério']
  },
  {
    id: 'ep4',
    season: 1,
    number: 4,
    title: 'Calor de Verão',
    thumb: 'images/ep4.jpg',
    duration: '46 min',
    date: '17 Jun 2022',
    synopsis: 'A celebração do 4 de Julho traz tensões. Belly bebe demais e quase beija Conrad, mas são interrompidos por Jeremiah.',
    tags: ['Festa', 'Tensão']
  },
  // Temporada 2
  {
    id: 'ep5',
    season: 2,
    number: 1,
    title: 'Amor Perdido',
    thumb: 'images/ep2.jpg',
    duration: '52 min',
    date: '14 Jul 2023',
    synopsis: 'Belly tenta lidar com as consequências do verão passado. A casa em Cousins Beach está à venda e ela precisa reunir os irmãos Fisher.',
    tags: ['Luto', 'Reencontro']
  },
  {
    id: 'ep6',
    season: 2,
    number: 2,
    title: 'Cenas de Verão',
    thumb: 'images/ep3.jpg',
    duration: '50 min',
    date: '14 Jul 2023',
    synopsis: 'Flashbacks revelam o que aconteceu entre Belly e Conrad durante o inverno. Jeremiah ainda está magoado com os dois.',
    tags: ['Passado', 'Emoção']
  },
  {
    id: 'ep7',
    season: 2,
    number: 3,
    title: 'Maré de Verão',
    thumb: 'images/ep5.jpg',
    duration: '49 min',
    date: '14 Jul 2023',
    synopsis: 'A competição de vôlei de praia retorna. Belly e Conrad precisam trabalhar juntos, mas a tensão entre eles é evidente.',
    tags: ['Esporte', 'Trabalho em Equipe']
  },
  // Temporada 3
  {
    id: 'ep8',
    season: 3,
    number: 1,
    title: 'Sempre Teremos o Verão',
    thumb: 'images/ep6.jpg',
    duration: '55 min',
    date: '16 Jul 2025',
    synopsis: 'Anos depois, Belly está na faculdade e precisa tomar a decisão final entre Conrad e Jeremiah. O verão em Cousins nunca foi tão decisivo.',
    tags: ['Final', 'Decisões']
  },
  {
    id: 'ep9',
    season: 3,
    number: 2,
    title: 'O Último Verão',
    thumb: 'images/ep7.jpg',
    duration: '58 min',
    date: '23 Jul 2025',
    synopsis: 'Preparativos para um casamento em Cousins Beach trazem velhas lembranças e novos sentimentos à tona para todos os envolvidos.',
    tags: ['Casamento', 'Despedida']
  }
];

// ELEMENTOS DOM
const episodesGrid = document.getElementById('episodesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const noResults = document.getElementById('noResults');
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const modalOverlay = document.getElementById('modalOverlay');
const seasonFilters = document.querySelectorAll('.season-filter, .tab');

// ESTADO GLOBAL
let currentSeason = 'all';
let currentSearch = '';
let currentSort = 'asc';

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  renderEpisodes();
  setupEventListeners();
});

// FUNÇÕES DE RENDERIZAÇÃO
function renderEpisodes() {
  let filtered = episodes.filter(ep => {
    const matchesSeason = currentSeason === 'all' || ep.season == currentSeason;
    const matchesSearch = ep.title.toLowerCase().includes(currentSearch.toLowerCase()) || 
                          ep.synopsis.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesSeason && matchesSearch;
  });

  // Ordenação
  filtered.sort((a, b) => {
    if (currentSort === 'asc') return a.number - b.number || a.season - b.season;
    return b.number - a.number || b.season - a.season;
  });

  episodesGrid.innerHTML = '';
  
  if (filtered.length === 0) {
    noResults.style.display = 'flex';
  } else {
    noResults.style.display = 'none';
    filtered.forEach((ep, index) => {
      const card = createEpisodeCard(ep, index);
      episodesGrid.appendChild(card);
    });
  }
}

function createEpisodeCard(ep, index) {
  const div = document.createElement('div');
  div.className = 'ep-card';
  div.style.animationDelay = `${index * 0.05}s`;
  div.onclick = () => openModal(ep.id);

  div.innerHTML = `
    <div class="ep-thumb-wrap">
      <img src="${ep.thumb}" alt="${ep.title}" class="ep-thumb" loading="lazy" onerror="this.src='images/poster1.jpg'">
      <div class="ep-overlay">
        <div class="ep-play-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
      <span class="ep-duration">${ep.duration}</span>
      <span class="ep-season-badge badge-s${ep.season}">T${ep.season}</span>
    </div>
    <div class="ep-info">
      <div class="ep-number">Episódio ${ep.number}</div>
      <h3 class="ep-title">${ep.title}</h3>
      <p class="ep-synopsis">${ep.synopsis}</p>
      <div class="ep-footer">
        <span class="ep-date">${ep.date}</span>
        <div class="ep-actions">
          <button class="ep-action-btn" onclick="toggleLike(event, this)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="ep-action-btn" onclick="shareEp(event, '${ep.title}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
  return div;
}

// EVENT LISTENERS
function setupEventListeners() {
  // Busca
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderEpisodes();
  });

  searchBtn.addEventListener('click', () => {
    renderEpisodes();
  });

  // Ordenação
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderEpisodes();
  });

  // Filtros de Temporada
  seasonFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Remove active de todos
      seasonFilters.forEach(f => f.classList.remove('active'));
      
      // Adiciona active no clicado e no seu par (sidebar/tabs)
      const season = filter.getAttribute('data-season');
      currentSeason = season;
      
      document.querySelectorAll(`[data-season="${season}"]`).forEach(f => f.classList.add('active'));
      
      renderEpisodes();
      
      // Fecha sidebar no mobile após selecionar
      if (window.innerWidth <= 900) {
        sidebar.classList.remove('open');
      }
    });
  });

  // Menu Toggle
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Fechar modal com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// MODAL LOGIC
function openModal(id) {
  const ep = episodes.find(e => e.id === id);
  if (!ep) return;

  document.getElementById('modalThumb').src = ep.thumb;
  document.getElementById('modalTitle').textContent = ep.title;
  document.getElementById('modalSynopsis').textContent = ep.synopsis;
  document.getElementById('modalMeta').innerHTML = `
    <span><strong style="color:var(--accent)">Temporada ${ep.season}</strong></span>
    <span>•</span>
    <span>Episódio ${ep.number}</span>
    <span>•</span>
    <span>${ep.duration}</span>
    <span>•</span>
    <span>${ep.date}</span>
  `;

  const tagsContainer = document.getElementById('modalTags');
  tagsContainer.innerHTML = '';
  ep.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'modal-tag';
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// UTILITÁRIOS
function toggleLike(event, btn) {
  event.stopPropagation();
  btn.classList.toggle('liked');
  const isLiked = btn.classList.contains('liked');
  showToast(isLiked ? 'Adicionado aos Favoritos!' : 'Removido dos Favoritos');
}

function shareEp(event, title) {
  event.stopPropagation();
  showToast(`Link de "${title}" copiado!`);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
