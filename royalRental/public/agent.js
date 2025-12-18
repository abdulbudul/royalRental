const TOKEN_KEY = 'royal_rental_token';

function getToken() { return localStorage.getItem(TOKEN_KEY); }
function setToken(token) { localStorage.setItem(TOKEN_KEY, token); }
function logout() { localStorage.removeItem(TOKEN_KEY); location.reload(); }

async function registerAgent() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (!email || !password) return alert('Please enter email and password');
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error(await res.text());
    alert('Registration successful! Now login.');
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

async function loginAgent() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (!email || !password) return alert('Please enter email and password');
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error(await res.text());
    const { token } = await res.json();
    setToken(token);
    showAgentPanel();
  } catch (err) {
    alert('Login failed: ' + err.message);
  }
}

function showAgentPanel() {
  document.getElementById('authPanel').style.display = 'none';
  document.getElementById('agentPanel').style.display = 'block';
  loadMyListings();
}

async function submitListing() {
  const token = getToken();
  if (!token) return alert('Not logged in');
  const listing = {
    title: document.getElementById('title').value,
    location: document.getElementById('location').value,
    islandOrMainland: document.getElementById('islandOrMainland').value,
    houseType: document.getElementById('houseType').value,
    bedrooms: parseInt(document.getElementById('bedrooms').value),
    bathrooms: parseInt(document.getElementById('bathrooms').value),
    toilets: parseInt(document.getElementById('toilets').value),
    yearlyPrice: document.getElementById('yearlyPrice').value,
    description: document.getElementById('description').value,
    amenities: document.getElementById('amenities').value.split(',').map(a => a.trim())
  };
  if (!listing.title || !listing.location) return alert('Fill all required fields');
  try {
    const res = await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(listing)
    });
    if (!res.ok) throw new Error(await res.text());
    alert('Property submitted for approval!');
    document.getElementById('listingForm').reset();
    loadMyListings();
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

async function loadMyListings() {
  const token = getToken();
  if (!token) return;
  try {
    const res = await fetch('/api/listings/agent/my', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const listings = await res.json();
    const container = document.getElementById('myListings');
    if (!listings.length) return container.innerHTML = '<p>No listings yet.</p>';
    container.innerHTML = listings.map(l => `
      <div class="listing">
        <h3>${l.title} <span class="status ${l.status}">${l.status.toUpperCase()}</span></h3>
        <div class="meta">${l.location} • ${l.houseType} • ${l.bedrooms}bd • ${l.bathrooms}ba • ${l.yearlyPrice}</div>
        <div>${l.description}</div>
        <div style="margin-top: 10px;">
          <button class="btn btn-danger" onclick="deleteListing('${l.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    alert('Error loading listings: ' + err.message);
  }
}

async function deleteListing(id) {
  if (!confirm('Delete this listing?')) return;
  const token = getToken();
  try {
    const res = await fetch(`/api/listings/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    alert('Listing deleted');
    loadMyListings();
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// Init
if (getToken()) {
  showAgentPanel();
}
