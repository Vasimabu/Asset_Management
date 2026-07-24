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

const loadIssueFormData = async () => {
  const assetSelect = document.getElementById("issueAsset");
  const employeeSelect = document.getElementById("issueEmployee");

  if (assetSelect) {
    try {
      const { data: assets } = await request("/api/stocks");
      assetSelect.replaceChildren(new Option("Select an available asset", ""));
      (assets || []).forEach((asset) => {
        assetSelect.add(new Option(`${asset.asset_name} (${asset.asset_id})`, asset.id));
      });
    } catch (err) {
      console.error("Failed to load available assets:", err);
    }
  }

  if (employeeSelect) {
    try {
      const { data: employees } = await request("/api/employees?status=ACTIVE");
      employeeSelect.replaceChildren(new Option("Select an employee", ""));
      (employees || []).forEach((emp) => {
        const fullName = `${emp.first_name || ""} ${emp.last_name || ""}`.trim();
        employeeSelect.add(new Option(`${fullName} (${emp.employee_code})`, emp.id));
      });
    } catch (err) {
      console.error("Failed to load employees:", err);
    }
  }
};

const renderIssues = (issues) => {
  const table = document.getElementById("issueTable");
  if (!table) return;
  table.replaceChildren();

  if (!issues || !issues.length) {
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 4;
    cell.className = "empty";
    cell.textContent = "No asset issues found.";
    return;
  }

  issues.forEach((issue) => {
    const row = table.insertRow();

    const assetName = issue.Asset?.asset_name || issue.Asset?.asset_id || "—";
    const empName = issue.Employee ? `${issue.Employee.first_name || ""} ${issue.Employee.last_name || ""}`.trim() : "—";

    const assetCell = row.insertCell();
    assetCell.innerHTML = `<strong>${esc(assetName)}</strong>`;

    const empCell = row.insertCell();
    empCell.textContent = text(empName);

    const issueDateCell = row.insertCell();
    issueDateCell.textContent = fmtDate(issue.issue_date);

    const returnDateCell = row.insertCell();
    returnDateCell.textContent = fmtDate(issue.expected_return_date);
  });
};

const loadIssues = async () => {
  const { data } = await request("/api/asset-issues");
  renderIssues(data);
};

document.addEventListener("DOMContentLoaded", () => {
  setToday("#issueDate");
  loadIssueFormData();
  loadIssues().catch((err) => console.error("Issues load error:", err));

  const form = document.getElementById("issueForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) return;

      const button = form.querySelector('button[type="submit"]');
      try {
        if (button) button.disabled = true;
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        await request("/api/asset-issues", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        location.reload();
      } catch (err) {
        alert(err.message);
      } finally {
        if (button) button.disabled = false;
      }
    });
  }
});