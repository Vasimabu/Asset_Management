const api = async (url, options = {}) => {
  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) throw new Error(payload.message || 'Request failed');
  return payload.data;
};
const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const fmtDate = value => value ? new Date(value).toLocaleDateString() : '—';
const money = value => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(Number(value || 0));
const showToast = message => { const toast = document.querySelector('#toast'); if (!toast) return; toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2800); };
const status = value => `<span class="status ${String(value || '').toLowerCase()}">${esc(value || '—')}</span>`;
const pathId = (position = -1) => location.pathname.split('/').filter(Boolean).at(position);
const setToday = id => { const el = document.querySelector(id); if (el) el.value = new Date().toISOString().slice(0,10); };
document.querySelectorAll('.nav-link').forEach(a => { if (a.pathname === location.pathname || (a.pathname !== '/' && location.pathname.startsWith(a.pathname))) a.classList.add('active'); });
