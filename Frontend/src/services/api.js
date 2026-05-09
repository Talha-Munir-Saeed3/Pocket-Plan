const DEFAULT_API_BASE_URL = "http://localhost:8000";
export const defaultUserId = "demo-user-1";
export const defaultAccountId = "account_personal";

export const getApiBaseUrl = () => {
  const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;
  return String(baseUrl).replace(/\/$/, "");
};

const request = async (path, options = {}) => {
  let response;
  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });
  } catch (err) {
    throw new Error(`Network request failed: ${err && err.message ? err.message : String(err)}`);
  }

  if (!response.ok) {
    const message = await response.text().catch(() => "Request failed");
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) return null;

  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`Failed to parse JSON response: ${err && err.message ? err.message : String(err)}`);
  }
};

export const createTransaction = (payload) => request("/transactions", { method: "POST", body: JSON.stringify(payload) });
export const listRecentTransactions = (userId = defaultUserId, limit = 4) => request(`/transactions/recent?user_id=${encodeURIComponent(userId)}&limit=${limit}`);
export const listTransactionsHistory = (userId = defaultUserId, months = 3) => request(`/transactions/history?user_id=${encodeURIComponent(userId)}&months=${months}`);
export const saveBudget = (payload) => request("/budgets", { method: "POST", body: JSON.stringify(payload) });
export const getCurrentBudget = (userId = defaultUserId, accountId = defaultAccountId) => request(`/budgets/current?user_id=${encodeURIComponent(userId)}&account_id=${encodeURIComponent(accountId)}`);
export const listBudgets = (userId = defaultUserId) => request(`/budgets?user_id=${encodeURIComponent(userId)}`);
export const createSavingsGoal = (payload) => request("/savings-goals", { method: "POST", body: JSON.stringify(payload) });
export const listSavingsGoals = (userId = defaultUserId) => request(`/savings-goals?user_id=${encodeURIComponent(userId)}`);
export const updateSavingsGoal = (goalId, payload) => request(`/savings-goals/${encodeURIComponent(goalId)}`, { method: "PATCH", body: JSON.stringify(payload) });
export const getReportSummary = (userId = defaultUserId, month, year) => {
  const params = new URLSearchParams({ user_id: userId });
  if (month) params.set("month", String(month));
  if (year) params.set("year", String(year));
  return request(`/reports/summary?${params.toString()}`);
};
