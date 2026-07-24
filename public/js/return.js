const request = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const result = await response.json();
  if (!response.ok || !result.success) throw new Error(result.message || "Request failed");
  return result;
};

const loadReturnFormData = async () => {
  const returnIssueSelect = document.getElementById("returnIssue");
  if (!returnIssueSelect) return;

  try {
    const { data: issues } = await request("/api/asset-issues");
    returnIssueSelect.replaceChildren(new Option("Select an issued asset", ""));
    (issues || []).forEach((issue) => {
      const assetName = issue.Asset?.asset_name || "Asset";
      const empName = issue.Employee ? `${issue.Employee.first_name || ""} ${issue.Employee.last_name || ""}`.trim() : "";
      returnIssueSelect.add(new Option(`${assetName} - Issued to ${empName}`, issue.id));
    });
  } catch (err) {
    console.error("Failed to load active issues:", err);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setToday("#returnDate");
  loadReturnFormData();

  const form = document.getElementById("returnForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) return;

      const button = form.querySelector('button[type="submit"]');
      try {
        if (button) button.disabled = true;
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        await request("/api/asset-returns", {
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