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

const renderScrap = (scrapped) => {
  const table = document.getElementById("scrapTable");
  if (!table) return;
  table.replaceChildren();

  if (!scrapped || !scrapped.length) {
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 6;
    cell.className = "empty";
    cell.textContent = "No scrapped assets.";
    return;
  }

  scrapped.forEach((asset) => {
    const row = table.insertRow();
    const makeModel = [asset.make, asset.model].filter(Boolean).join(" / ") || "—";

    const nameCell = row.insertCell();
    nameCell.innerHTML = `<strong>${esc(asset.asset_name || '')}</strong>`;

    const idCell = row.insertCell();
    idCell.textContent = text(asset.asset_id);

    const serialCell = row.insertCell();
    serialCell.textContent = text(asset.serial_number);

    const makeModelCell = row.insertCell();
    makeModelCell.textContent = makeModel;

    const valCell = row.insertCell();
    valCell.textContent = money(asset.purchase_cost);

    const statusCell = row.insertCell();
    statusCell.innerHTML = status(asset.status);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { data } = await request("/api/assets/scrapped");
    renderScrap(data);
  } catch (err) {
    console.error("Scrap list load error:", err);
  }
});