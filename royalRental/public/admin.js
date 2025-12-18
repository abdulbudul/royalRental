const TOKEN_KEY = 'royal_rental_token';

function getToken() { return localStorage.getItem(TOKEN_KEY); }
function setToken(token) { localStorage.setItem(TOKEN_KEY, token); }
function logout() { localStorage.removeItem(TOKEN_KEY); location.reload(); }

async function loginAdmin() {
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
    showAdminPanel();
  } catch (err) {
    alert('Login failed: ' + err.message);
  }
}

function showAdminPanel() {
  document.getElementById('authPanel').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'block';
  loadAllListings();
}

async function loadAllListings() {
  const token = getToken();
  if (!token) return;
  const status = document.getElementById('statusFilter').value;
  try {
    const res = await fetch('/api/listings/admin/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    let listings = await res.json();
    if (status) listings = listings.filter(l => l.status === status);
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = listings.map(l => `
      <tr>
        <td><strong>${l.title}</strong></td>
        <td>${l.location}</td>
        <td>${l.houseType}</td>
        <td>${l.yearlyPrice}</td>
        <td><span class="status ${l.status}">${l.status.toUpperCase()}</span></td>
        <td>${l.uploadedBy}</td>
        <td style="white-space: nowrap;">
          ${l.status === 'pending' ? `<button class="btn btn-success" onclick="approve('${l.id}')">Approve</button>` : ''}
          ${l.status === 'pending' ? `<button class="btn btn-danger" onclick="reject('${l.id}')">Reject</button>` : ''}
          <button class="btn btn-danger" onclick="adminDelete('${l.id}')">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

async function approve(id) {
  const token = getToken();
  try {
    const res = await fetch(`/api/listings/${id}/approve`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    alert('Listing approved!');
    loadAllListings();
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

async function reject(id) {
  const token = getToken();
  try {
    const res = await fetch(`/api/listings/${id}/reject`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    alert('Listing rejected!');
    loadAllListings();
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

async function adminDelete(id) {
  if (!confirm('Delete this listing?')) return;
  const token = getToken();
  try {
    const res = await fetch(`/api/listings/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    alert('Listing deleted!');
    loadAllListings();
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// Init
if (getToken()) {
  showAdminPanel();
}
