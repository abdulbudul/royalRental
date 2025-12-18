async function fetchListings(){
  const res = await fetch('/api/listings');
  const listings = await res.json();
  // Format as island/mainland groups
  return {
    'Lagos Island': listings.filter(l => l.islandOrMainland === 'Island'),
    'Lagos Mainland': listings.filter(l => l.islandOrMainland === 'Mainland')
  };
}

function formatPrice(p){ return p; }

function populateLocationOptions(data){
  const set = new Set();
  Object.keys(data).forEach(group => data[group].forEach(item => set.add(item.location)));
  const sel = document.getElementById('locationFilter');
  set.forEach(loc => {
    const o = document.createElement('option'); o.value = loc; o.textContent = loc; sel.appendChild(o);
  });
}

function renderListings(data, filters){
  const container = document.getElementById('listings');
  container.innerHTML = '';
  let count = 0;
  Object.keys(data).forEach(group => {
    data[group].forEach(item => {
      if(filters.area !== 'all' && item.islandOrMainland !== filters.area) return;
      if(filters.location !== 'all' && item.location !== filters.location) return;
      const q = (item.title + ' ' + item.description).toLowerCase();
      if(filters.q && !q.includes(filters.q.toLowerCase())) return;
      count++;
      const amenities = typeof item.amenities === 'string' ? JSON.parse(item.amenities) : (item.amenities || []);
      const el = document.createElement('div'); el.className = 'listing';
      el.innerHTML = `
        <h3>${item.title}</h3>
        <div class="meta">${item.location} • ${item.houseType} • ${item.bedrooms}bd • ${item.bathrooms}ba • ${item.toilets}to • <strong>${formatPrice(item.yearlyPrice)}</strong></div>
        <div>${item.description}</div>
        <div class="amenities">${amenities.map(a=>`<span class="amenity">${a}</span>`).join('')}</div>
      `;
      container.appendChild(el);
    });
  });
  document.getElementById('counts').textContent = `Showing ${count} approved listings`;
}

function showPublic(){ window.location.href = '/'; }

(async ()=>{
  const data = await fetchListings();
  populateLocationOptions(data);
  const filters = { area: 'all', location: 'all', q: '' };
  document.getElementById('areaFilter').addEventListener('change', e=>{ filters.area = e.target.value; renderListings(data, filters); });
  document.getElementById('locationFilter').addEventListener('change', e=>{ filters.location = e.target.value; renderListings(data, filters); });
  document.getElementById('searchInput').addEventListener('input', e=>{ filters.q = e.target.value; renderListings(data, filters); });
  document.getElementById('refreshBtn').addEventListener('click', async ()=>{ const d = await fetchListings(); renderListings(d, filters); });
  renderListings(data, filters);
})();
