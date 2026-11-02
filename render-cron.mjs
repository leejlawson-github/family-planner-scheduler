
const endpoint = "https://lawson-family-planner.givingzebu1.chatgpt.site/api/notifications/dispatch";

const token = process.env.FAMILY_PLANNER_SERVICE_TOKEN;

if (!token) {
  throw new Error("Missing FAMILY_PLANNER_SERVICE_TOKEN");
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "OAI-Sites-Authorization": `Bearer ${token}`,
  },
  signal: AbortSignal.timeout(20000),
});

if (!response.ok) {
  throw new Error(`Notification dispatch failed: HTTP ${response.status}`);
}

const result = await response.json();

if (result.ok !== true || Number(result.failed ?? 0) > 0) {
  throw new Error("Notification dispatch reported failures");
}

console.log(JSON.stringify({
  checkedAt: result.checkedAt,
  due: result.due,
  sent: result.sent,
  failed: result.failed,
}));
