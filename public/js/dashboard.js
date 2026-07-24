const getData = async (url) => {
  const response = await fetch(url);
  const payload = await response.json();
  if (!response.ok || !payload.success) throw new Error(payload.message || "Unable to load dashboard data");
  return payload.data || [];
};

const setMetric = (id, value) => {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
};

const displayDate = (value) => value
  ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value))
  : "—";

const addCell = (row, value) => {
  const cell = document.createElement("td");
  cell.textContent = value;
  row.appendChild(cell);
};

const showEmptyRow = (table, message, columns) => {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = columns;
  cell.className = "text-center text-secondary py-4";
  cell.textContent = message;
  row.appendChild(cell);
  table.appendChild(row);
};

const renderRecentActivity = (history) => {
  const table = document.getElementById("recentActivityTable");
  if (!table) return;
  table.replaceChildren();

  if (!history.length) return showEmptyRow(table, "No activity recorded yet.", 4);

  history.slice(0, 8).forEach((entry) => {
    const row = document.createElement("tr");
    addCell(row, entry.action || "—");
    addCell(row, entry.Asset?.asset_name || entry.Asset?.asset_id || "—");
    addCell(row, displayDate(entry.action_date || entry.createdAt));
    addCell(row, entry.Employee ? `${entry.Employee.first_name || ""} ${entry.Employee.last_name || ""}`.trim() : "—");
    table.appendChild(row);
  });
};

const renderBranchSummary = (assets) => {
  const table = document.getElementById("branchSummaryTable");
  if (!table) return;
  table.replaceChildren();

  const branches = new Map();
  assets.forEach((asset) => {
    const name = asset.Branch?.branch_name || "Unassigned";
    const summary = branches.get(name) || { total: 0, available: 0 };
    summary.total += 1;
    if (asset.status === "AVAILABLE") summary.available += 1;
    branches.set(name, summary);
  });

  if (!branches.size) return showEmptyRow(table, "No assets found.", 3);

  [...branches.entries()].sort(([a], [b]) => a.localeCompare(b)).forEach(([name, summary]) => {
    const row = document.createElement("tr");
    addCell(row, name);
    addCell(row, summary.available);
    addCell(row, summary.total);
    table.appendChild(row);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [employees, assets, returns, history] = await Promise.all([
      getData("/api/employees"),
      getData("/api/assets"),
      getData("/api/asset-returns"),
      getData("/api/asset-history")
    ]);

    setMetric("totalEmployees", employees.length);
    setMetric("totalAssets", assets.length);
    setMetric("availableAssets", assets.filter((asset) => asset.status === "AVAILABLE").length);
    setMetric("issuedAssets", assets.filter((asset) => asset.status === "ISSUED").length);
    setMetric("returnedAssets", returns.length);
    setMetric("scrappedAssets", assets.filter((asset) => asset.status === "SCRAPPED").length);

    renderRecentActivity(history);
    renderBranchSummary(assets);
  } catch (error) {
    console.error("Dashboard load failed:", error);
    ["recentActivityTable", "branchSummaryTable"].forEach((id) => {
      const table = document.getElementById(id);
      if (table) {
        table.replaceChildren();
        showEmptyRow(table, "Unable to load data. Please refresh the page.", id === "recentActivityTable" ? 4 : 3);
      }
    });
  }
});