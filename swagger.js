const swaggerJsdoc = require("swagger-jsdoc");

const id = { type: "string", format: "uuid", example: "f3809e2d-4271-43d1-ad8c-7031a2181c80" };
const json = (schema, description = "Success") => ({
  "200": { description, content: { "application/json": { schema } } },
  "500": { description: "Server error" }
});
const dataResponse = (schema) => ({ type: "object", properties: { success: { type: "boolean", example: true }, data: schema } });
const listResponse = (schema) => dataResponse({ type: "array", items: schema });
const body = (schema, required = true) => ({ required, content: { "application/json": { schema } } });

const Employee = {
  type: "object",
  required: ["employee_code", "first_name", "branch_id"],
  properties: {
    id, employee_code: { type: "string", example: "EMP-1001" }, first_name: { type: "string", example: "Abu" },
    last_name: { type: "string", example: "Khan" }, email: { type: "string", format: "email", example: "abu@example.com" },
    mobile: { type: "string", example: "7806987923" }, designation: { type: "string", example: "Engineer" }, branch_id: id,
    status: { type: "string", enum: ["ACTIVE", "INACTIVE"], example: "ACTIVE" }
  }
};
const Asset = {
  type: "object",
  required: ["asset_id", "asset_name"],
  properties: {
    id, asset_id: { type: "string", example: "LAP-0001" }, asset_name: { type: "string", example: "Dell Latitude 5440" },
    serial_number: { type: "string", example: "SN-12345" }, make: { type: "string", example: "Dell" }, model: { type: "string", example: "Latitude 5440" },
    purchase_date: { type: "string", format: "date" }, purchase_cost: { type: "number", example: 65000 }, category_id: id, branch_id: id,
    status: { type: "string", enum: ["AVAILABLE", "ISSUED", "REPAIR", "SCRAPPED"], example: "AVAILABLE" }
  }
};
const Category = { type: "object", properties: { id, category_name: { type: "string", example: "Laptop" }, description: { type: "string", example: "Portable computers" } } };
const Branch = { type: "object", properties: { id, branch_name: { type: "string", example: "Chennai Branch" }, branch_code: { type: "string", example: "CHE" } } };
const Issue = { type: "object", required: ["asset_id", "employee_id", "issue_date"], properties: { id, asset_id: id, employee_id: id, issue_date: { type: "string", format: "date" }, expected_return_date: { type: "string", format: "date" } } };
const Return = { type: "object", required: ["issue_id", "return_date", "return_reason"], properties: { id, issue_id: id, return_date: { type: "string", format: "date" }, return_reason: { type: "string", enum: ["UPGRADE", "REPAIR", "RESIGNATION", "OTHER"] }, remarks: { type: "string" } } };
const History = { type: "object", properties: { id, asset_id: id, employee_id: id, action: { type: "string", enum: ["PURCHASED", "STOCKED", "ISSUED", "RETURNED", "REPAIR", "SCRAPPED"] }, action_date: { type: "string", format: "date-time" }, remarks: { type: "string" } } };
const parameter = (name, description, schema = { type: "string" }, required = true) => ({ name, in: "path", required, description, schema });

const options = {
  definition: {
    openapi: "3.0.3",
    info: { title: "AssetFlow API", version: "1.0.0", description: "Interactive documentation for the Asset Management API. Use Try it out to call the connected PostgreSQL-backed endpoints." },
    servers: [{ url: "http://localhost:3005", description: "Local development server" }],
    tags: [{ name: "Employees" }, { name: "Branches" }, { name: "Assets" }, { name: "Categories" }, { name: "Issues" }, { name: "Returns" }, { name: "Stock" }, { name: "History" }],
    components: { schemas: { Employee, Asset, Category, Branch, Issue, Return, History } },
    paths: {
      "/api/employees": { get: { tags: ["Employees"], summary: "List employees", parameters: [{ name: "search", in: "query", schema: { type: "string" } }, { name: "status", in: "query", schema: { type: "string", enum: ["ACTIVE", "INACTIVE"] } }], responses: json(listResponse(Employee)) }, post: { tags: ["Employees"], summary: "Create an employee", requestBody: body({ $ref: "#/components/schemas/Employee" }), responses: { "201": { description: "Employee created" }, "500": { description: "Validation or database error" } } } },
      "/api/employees/{id}": { get: { tags: ["Employees"], summary: "Get an employee", parameters: [parameter("id", "Employee UUID", id)], responses: json(dataResponse(Employee)) }, put: { tags: ["Employees"], summary: "Update an employee", parameters: [parameter("id", "Employee UUID", id)], requestBody: body({ $ref: "#/components/schemas/Employee" }), responses: json(dataResponse(Employee)) }, delete: { tags: ["Employees"], summary: "Delete an employee", parameters: [parameter("id", "Employee UUID", id)], responses: json(dataResponse({ type: "object" })) } },
      "/api/branches": { get: { tags: ["Branches"], summary: "List branches for form dropdowns", responses: json(listResponse(Branch)) } },
      "/api/assets": { get: { tags: ["Assets"], summary: "List assets", parameters: [{ name: "search", in: "query", schema: { type: "string" } }, { name: "category", in: "query", schema: id }, { name: "status", in: "query", schema: { type: "string", enum: ["AVAILABLE", "ISSUED", "REPAIR", "SCRAPPED"] } }], responses: json(listResponse(Asset)) }, post: { tags: ["Assets"], summary: "Create an asset", requestBody: body({ $ref: "#/components/schemas/Asset" }), responses: { "201": { description: "Asset created" } } } },
      "/api/assets/{id}": { get: { tags: ["Assets"], summary: "Get an asset", parameters: [parameter("id", "Asset UUID", id)], responses: json(dataResponse(Asset)) }, put: { tags: ["Assets"], summary: "Update an asset", parameters: [parameter("id", "Asset UUID", id)], requestBody: body({ $ref: "#/components/schemas/Asset" }), responses: json(dataResponse(Asset)) }, delete: { tags: ["Assets"], summary: "Delete an asset", parameters: [parameter("id", "Asset UUID", id)], responses: json(dataResponse({ type: "object" })) } },
      "/api/assets/{id}/scrap": { put: { tags: ["Assets"], summary: "Mark an asset as scrapped", parameters: [parameter("id", "Asset UUID", id)], requestBody: body({ type: "object", properties: { reason: { type: "string", example: "Damaged beyond repair" } } }), responses: json(dataResponse(Asset)) } },
      "/api/assets/scrapped": { get: { tags: ["Assets"], summary: "List scrapped assets", responses: json(listResponse(Asset)) } },
      "/api/asset-categories": { get: { tags: ["Categories"], summary: "List categories", responses: json(listResponse(Category)) }, post: { tags: ["Categories"], summary: "Create a category", requestBody: body({ $ref: "#/components/schemas/Category" }), responses: { "201": { description: "Category created" } } } },
      "/api/asset-categories/{id}": { get: { tags: ["Categories"], summary: "Get a category", parameters: [parameter("id", "Category UUID", id)], responses: json(dataResponse(Category)) }, put: { tags: ["Categories"], summary: "Update a category", parameters: [parameter("id", "Category UUID", id)], requestBody: body({ $ref: "#/components/schemas/Category" }), responses: json(dataResponse(Category)) }, delete: { tags: ["Categories"], summary: "Delete a category", parameters: [parameter("id", "Category UUID", id)], responses: json(dataResponse({ type: "object" })) } },
      "/api/asset-issues": { get: { tags: ["Issues"], summary: "List issued assets", responses: json(listResponse(Issue)) }, post: { tags: ["Issues"], summary: "Issue an asset", requestBody: body({ $ref: "#/components/schemas/Issue" }), responses: { "201": { description: "Asset issued" } } } },
      "/api/asset-issues/{id}": { get: { tags: ["Issues"], summary: "Get an issue", parameters: [parameter("id", "Issue UUID", id)], responses: json(dataResponse(Issue)) }, put: { tags: ["Issues"], summary: "Update an issue", parameters: [parameter("id", "Issue UUID", id)], requestBody: body({ $ref: "#/components/schemas/Issue" }), responses: json(dataResponse(Issue)) }, delete: { tags: ["Issues"], summary: "Delete an issue", parameters: [parameter("id", "Issue UUID", id)], responses: json(dataResponse({ type: "object" })) } },
      "/api/asset-returns": { get: { tags: ["Returns"], summary: "List returned assets", responses: json(listResponse(Return)) }, post: { tags: ["Returns"], summary: "Record an asset return", requestBody: body({ $ref: "#/components/schemas/Return" }), responses: { "201": { description: "Return recorded" } } } },
      "/api/asset-returns/{id}": { get: { tags: ["Returns"], summary: "Get a return record", parameters: [parameter("id", "Return UUID", id)], responses: json(dataResponse(Return)) } },
      "/api/stocks": { get: { tags: ["Stock"], summary: "List available assets", responses: json(listResponse(Asset)) } },
      "/api/stocks/summary": { get: { tags: ["Stock"], summary: "Get branch stock summary", responses: json(dataResponse({ type: "object" })) } },
      "/api/stocks/branch/{branchId}": { get: { tags: ["Stock"], summary: "Get available stock for one branch", parameters: [parameter("branchId", "Branch UUID", id)], responses: json(listResponse(Asset)) } },
      "/api/asset-history": { get: { tags: ["History"], summary: "List asset history", responses: json(listResponse(History)) } },
      "/api/asset-history/{assetId}": { get: { tags: ["History"], summary: "Get history for an asset", parameters: [parameter("assetId", "Asset UUID", id)], responses: json(listResponse(History)) } }
    }
  },
  apis: []
};

module.exports = swaggerJsdoc(options);