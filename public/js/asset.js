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

const loadCategoriesDropdown = async (selectElement, defaultLabel = "Select category") => {
  if (!selectElement) return;
  try {
    const { data: categories } = await request("/api/asset-categories");
    selectElement.replaceChildren(new Option(defaultLabel, ""));
    (categories || []).forEach((cat) => {
      selectElement.add(new Option(cat.category_name, cat.id));
    });
  } catch (err) {
    console.error("Failed to load categories:", err);
  }
};

const loadBranchesDropdown = async (selectElement) => {
  if (!selectElement) return;
  try {
    const { data: branches } = await request("/api/branches");
    selectElement.replaceChildren(new Option("Select branch", ""));
    (branches || []).forEach((branch) => {
      selectElement.add(new Option(branch.branch_name, branch.id));
    });
  } catch (err) {
    console.error("Failed to load branches:", err);
  }
};

const renderAssets = (assets) => {
  const table = document.getElementById("assetTable");
  if (!table) return;
  table.replaceChildren();

  if (!assets || !assets.length) {
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 6;
    cell.className = "empty";
    cell.textContent = "No assets found.";
    return;
  }

  assets.forEach((asset) => {
    const row = table.insertRow();
    const makeModel = [asset.make, asset.model].filter(Boolean).join(" / ") || "—";
    const categoryName = asset.AssetCategory?.category_name || "—";
    const branchName = asset.Branch?.branch_name || "—";

    const nameCell = row.insertCell();
    nameCell.innerHTML = `<strong>${esc(asset.asset_name || '')}</strong><br><small class="text-muted">${esc(asset.asset_id || '')}</small>`;

    const serialCell = row.insertCell();
    serialCell.textContent = text(asset.serial_number);

    const categoryCell = row.insertCell();
    categoryCell.textContent = text(categoryName);

    const makeModelCell = row.insertCell();
    makeModelCell.textContent = makeModel;

    const branchCell = row.insertCell();
    branchCell.textContent = text(branchName);

    const statusCell = row.insertCell();
    statusCell.innerHTML = status(asset.status);
  });
};

const loadAssets = async (search = "", category = "", status = "") => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (status) params.set("status", status);
  const { data } = await request(`/api/assets?${params}`);
  renderAssets(data);
};

const setupAssetList = () => {
  const table = document.getElementById("assetTable");
  if (!table) return;

  const searchInput = document.getElementById("assetSearch");
  const categorySelect = document.getElementById("assetCategory");
  const statusSelect = document.getElementById("assetStatus");

  loadCategoriesDropdown(categorySelect, "All categories");

  const filterHandler = () => {
    loadAssets(
      searchInput?.value.trim() || "",
      categorySelect?.value || "",
      statusSelect?.value || ""
    ).catch((err) => alert(err.message));
  };

  if (searchInput) searchInput.addEventListener("input", filterHandler);
  if (categorySelect) categorySelect.addEventListener("change", filterHandler);
  if (statusSelect) statusSelect.addEventListener("change", filterHandler);

  loadAssets().catch((err) => alert(err.message));
};

const setupAssetForm = () => {
  const form = document.getElementById("assetForm");
  if (!form) return;

  const categorySelect = document.getElementById("assetCategorySelect");
  if (categorySelect) {
    loadCategoriesDropdown(categorySelect, "Select category");
  }

  const branchSelect = document.getElementById("assetBranchSelect");
  if (branchSelect) {
    loadBranchesDropdown(branchSelect);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;

    const button = form.querySelector('button[type="submit"]');
    try {
      if (button) button.disabled = true;
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      await request("/api/assets", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      location.assign("/assets");
    } catch (err) {
      alert(err.message);
    } finally {
      if (button) button.disabled = false;
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupAssetList();
  setupAssetForm();
});
