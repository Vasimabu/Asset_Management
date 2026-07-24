const request = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const result = await response.json();
  if (!response.ok || !result.success) throw new Error(result.message || "Request failed");
  return result;
};

const employeeIdFromPath = () => location.pathname.match(/^\/employees\/([^/]+)(?:\/edit)?$/)?.[1];
const text = (value) => value ?? "Ã¢â‚¬â€";

const employeePayload = (form) => Object.fromEntries(new FormData(form).entries());

const loadForm = async (form, id) => {
  const { data } = await request(`/api/employees/${id}`);
  Object.entries(data).forEach(([name, value]) => {
    const input = form.elements.namedItem(name);
    if (input && value != null) input.value = value;
  });
};

const loadBranches = async (select, selectedValue = "") => {
  const { data: branches } = await request("/api/branches");
  select.replaceChildren(new Option("Select a branch", ""));
  branches.forEach((branch) => select.add(new Option(branch.branch_name, branch.id)));
  select.value = selectedValue;
};
const submitForm = (form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    form.classList.add("was-validated");
    if (!form.checkValidity()) return;

    const button = form.querySelector('button[type="submit"]');
    const id = location.pathname.match(/^\/employees\/([^/]+)\/edit$/)?.[1];
    try {
      button.disabled = true;
      const payload = employeePayload(form);
      await request(id ? `/api/employees/${id}` : "/api/employees", {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(payload)
      });
      location.assign("/employees");
    } catch (error) {
      alert(error.message);
    } finally {
      button.disabled = false;
    }
  });
};

const renderEmployees = (employees) => {
  const table = document.getElementById("employeeTable");
  if (!table) return;
  table.replaceChildren();

  if (!employees.length) {
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 7;
    cell.className = "text-center text-secondary py-4";
    cell.textContent = "No employees found.";
    return;
  }

  employees.forEach((employee) => {
    const row = table.insertRow();
    [employee.employee_code, `${employee.first_name || ""} ${employee.last_name || ""}`.trim(), employee.email, employee.mobile, employee.Branch?.branch_name, employee.status]
      .forEach((value) => { const cell = row.insertCell(); cell.textContent = text(value); });
    const actions = row.insertCell();
    actions.className = "text-end";
    const edit = document.createElement("a");
    edit.className = "btn btn-sm btn-outline-primary";
    edit.href = `/employees/${employee.id}/edit`;
    edit.textContent = "Edit";
    actions.appendChild(edit);
  });
};

const loadEmployees = async (search = "", status = "") => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (status) params.set("status", status);
  const { data } = await request(`/api/employees?${params}`);
  renderEmployees(data);
};

const setupEmployeeList = () => {
  const filters = document.getElementById("employeeFilters");
  if (!filters) return;
  const search = document.getElementById("employeeSearch");
  const status = document.getElementById("employeeStatus");
  filters.addEventListener("submit", (event) => {
    event.preventDefault();
    loadEmployees(search.value.trim(), status.value).catch((error) => alert(error.message));
  });
  loadEmployees().catch((error) => alert(error.message));
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");
  if (form) {
    const id = location.pathname.match(/^\/employees\/([^/]+)\/edit$/)?.[1];
    const branchSelect = form.elements.namedItem("branch_id");
    if (id) {
      loadForm(form, id).then(() => {
        if (branchSelect) return loadBranches(branchSelect, branchSelect.value);
      }).catch((error) => alert(error.message));
    } else if (branchSelect) {
      loadBranches(branchSelect).catch((error) => alert(error.message));
    }
    submitForm(form);
  }
  setupEmployeeList();
});