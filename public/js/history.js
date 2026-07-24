const request = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const result = await response.json();
  if (!response.ok || !result.success) throw new Error(result.message || "Request failed");
  return result;
};

const text = (value) => value ?? "—";

const renderHistory = (history) => {
  const table = document.getElementById("historyTable");
  if (!table) return;
  table.replaceChildren();

  if (!history || !history.length) {
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 5;
    cell.className = "empty";
    cell.textContent = "No history recorded.";
    return;
  }

  history.forEach((item) => {
    const row = table.insertRow();
    const assetName = item.Asset?.asset_name || item.Asset?.asset_id || "—";
    const empName = item.Employee ? `${item.Employee.first_name || ""} ${item.Employee.last_name || ""}`.trim() : "—";

    const dateCell = row.insertCell();
    dateCell.textContent = fmtDate(item.createdAt || item.action_date);

    const assetCell = row.insertCell();
    assetCell.innerHTML = `<strong>${esc(assetName)}</strong>`;

    const empCell = row.insertCell();
    empCell.textContent = text(empName);

    const actionCell = row.insertCell();
    actionCell.textContent = text(item.action);

    const remarksCell = row.insertCell();
    remarksCell.textContent = text(item.remarks);
  });
};

// const loadHistory = async (assetId = "") => {
//   const url = assetId ? `/api/asset-history/${encodeURIComponent(assetId)}` : "/api/asset-history";
//   const { data } = await request(url);
//   renderHistory(Array.isArray(data) ? data : (data ? [data] : []));
// };

const loadHistory = async (search = "") => {

    const url = search
        ? `/api/asset-history?search=${encodeURIComponent(search)}`
        : "/api/asset-history";

    const { data } = await request(url);

    renderHistory(data);
};

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("historySearch");
  const input = document.getElementById("historyAssetId");

  if (searchBtn && input) {
    searchBtn.addEventListener("click", () => {
      loadHistory(input.value.trim()).catch((err) => alert(err.message));
    });
  }

  loadHistory().catch((err) => console.error("History load error:", err));
});