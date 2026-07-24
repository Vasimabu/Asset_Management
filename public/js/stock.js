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

const renderStock = (stocks) => {
  const table = document.getElementById("stockTable");
  const totalEl = document.getElementById("stockTotal");
  if (!table) return;
  table.replaceChildren();

  if (!stocks || !stocks.length) {
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 6;
    cell.className = "empty";
    cell.textContent = "No stock available.";
    if (totalEl) totalEl.textContent = money(0);
    return;
  }

  let totalValue = 0;
  stocks.forEach((asset) => {
    const row = table.insertRow();
    const val = Number(asset.purchase_cost || 0);
    totalValue += val;

    const nameCell = row.insertCell();
    nameCell.innerHTML = `<strong>${esc(asset.asset_name || '')}</strong>`;

    const idCell = row.insertCell();
    idCell.textContent = text(asset.asset_id);

    const serialCell = row.insertCell();
    serialCell.textContent = text(asset.serial_number);

    const branchCell = row.insertCell();
    branchCell.textContent = text(asset.Branch?.branch_name);

    const categoryCell = row.insertCell();
    categoryCell.textContent = text(asset.AssetCategory?.category_name);

    const valCell = row.insertCell();
    valCell.textContent = money(val);
  });

  if (totalEl) totalEl.textContent = money(totalValue);
};

const renderStockSummary = (summary) => {
  const table = document.getElementById("stockSummaryTable");
  if (!table) return;
  table.replaceChildren();

  if (!summary || !summary.length) {
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 3;
    cell.className = "empty";
    cell.textContent = "No branch summary available.";
    return;
  }

  summary.forEach((item) => {
    const row = table.insertRow();

    const branchCell = row.insertCell();
    branchCell.textContent = text(item.branch_name);

    const countCell = row.insertCell();
    countCell.textContent = text(item.total_assets);

    const valCell = row.insertCell();
    valCell.textContent = money(item.total_value);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [stockRes, summaryRes] = await Promise.all([
      request("/api/stocks"),
      request("/api/stocks/summary")
    ]);
    renderStock(stockRes.data);
    renderStockSummary(summaryRes.data?.[0] || summaryRes.data || []);
  } catch (err) {
    console.error("Stock load error:", err);
  }
});