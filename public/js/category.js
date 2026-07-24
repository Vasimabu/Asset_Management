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

const renderCategories = (categories) => {
  const table = document.getElementById("categoryTable");
  if (!table) return;
  table.replaceChildren();

  if (!categories || !categories.length) {
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 3;
    cell.className = "empty";
    cell.textContent = "No categories found.";
    return;
  }

  categories.forEach((cat) => {
    const row = table.insertRow();

    const nameCell = row.insertCell();
    nameCell.innerHTML = `<strong>${esc(cat.category_name || '')}</strong>`;

    const descCell = row.insertCell();
    descCell.textContent = text(cat.description);

    const dateCell = row.insertCell();
    dateCell.textContent = fmtDate(cat.createdAt);
  });
};

const loadCategories = async (search = "") => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  const { data } = await request(`/api/asset-categories?${params}`);
  renderCategories(data);
};

const setupCategoryList = () => {
  const table = document.getElementById("categoryTable");
  if (!table) return;

  const searchInput = document.getElementById("categorySearch");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      loadCategories(searchInput.value.trim()).catch((err) => alert(err.message));
    });
  }

  loadCategories().catch((err) => alert(err.message));
};

const setupCategoryForm = () => {
  const form = document.getElementById("categoryForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;

    const button = form.querySelector('button[type="submit"]');
    try {
      if (button) button.disabled = true;
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      await request("/api/asset-categories", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      location.assign("/asset-categories");
    } catch (err) {
      alert(err.message);
    } finally {
      if (button) button.disabled = false;
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupCategoryList();
  setupCategoryForm();
});
