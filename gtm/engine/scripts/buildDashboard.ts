/**
 * Generates a self-contained HTML growth dashboard from Privy user data.
 *
 * Usage:
 *   pnpm dashboard
 *
 * Output: exports/dashboard-YYYY-MM-DD.html (open in any browser)
 */

import type { SegmentedContact } from "../lib/segmentation.js";
import { parseArguments, printHelp } from "../lib/cli.ts";

function buildSignupsByWeek(contacts: SegmentedContact[]): Record<string, number> {
  const weeks: Record<string, number> = {};
  for (const c of contacts) {
    const date = new Date(c.signup_date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const key = weekStart.toISOString().split("T")[0];
    weeks[key] = (weeks[key] || 0) + 1;
  }
  return Object.fromEntries(
    Object.entries(weeks).sort(([a], [b]) => a.localeCompare(b)),
  );
}

function buildLoginMethodBreakdown(contacts: SegmentedContact[]): Record<string, number> {
  const methods: Record<string, number> = {};
  for (const c of contacts) {
    methods[c.login_method] = (methods[c.login_method] || 0) + 1;
  }
  return methods;
}

function generateHtml(
  contacts: SegmentedContact[],
  totalPrivy: number,
): string {
  const segments = { new: 0, active: 0, dormant: 0, churned: 0 };
  let withEmail = 0;
  for (const c of contacts) {
    segments[c.segment]++;
    if (c.email) withEmail++;
  }

  const signupsByWeek = buildSignupsByWeek(contacts);
  const weekLabels = JSON.stringify(Object.keys(signupsByWeek));
  const weekValues = JSON.stringify(Object.values(signupsByWeek));

  const loginMethods = buildLoginMethodBreakdown(contacts);
  const methodLabels = JSON.stringify(Object.keys(loginMethods));
  const methodValues = JSON.stringify(Object.values(loginMethods));

  const segmentLabels = JSON.stringify(["New", "Active", "Dormant", "Churned"]);
  const segmentValues = JSON.stringify([segments.new, segments.active, segments.dormant, segments.churned]);

  const today = new Date().toISOString().split("T")[0];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recoupable Growth Dashboard — ${today}</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; color: #1a1a1a; padding: 2rem; }
  h1 { color: #345A5D; margin-bottom: 0.25rem; font-size: 1.75rem; }
  .subtitle { color: #666; margin-bottom: 2rem; font-size: 0.9rem; }
  .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .kpi { background: white; border-radius: 12px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  .kpi .value { font-size: 2rem; font-weight: 700; color: #345A5D; }
  .kpi .label { font-size: 0.8rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.25rem; }
  .charts { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
  .chart-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  .chart-card h3 { margin-bottom: 1rem; font-size: 1rem; color: #333; }
  .bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  canvas { max-height: 300px; }
  @media (max-width: 768px) { .charts, .bottom-row { grid-template-columns: 1fr; } }
</style>
</head>
<body>
  <h1>Recoupable Growth Dashboard</h1>
  <p class="subtitle">Generated ${today} from Privy user data</p>

  <div class="kpi-grid">
    <div class="kpi"><div class="value">${totalPrivy.toLocaleString()}</div><div class="label">Total Accounts</div></div>
    <div class="kpi"><div class="value">${withEmail.toLocaleString()}</div><div class="label">With Email</div></div>
    <div class="kpi"><div class="value">${segments.new.toLocaleString()}</div><div class="label">New (7 days)</div></div>
    <div class="kpi"><div class="value">${segments.active.toLocaleString()}</div><div class="label">Active (30 days)</div></div>
    <div class="kpi"><div class="value">${segments.dormant.toLocaleString()}</div><div class="label">Dormant</div></div>
    <div class="kpi"><div class="value">${segments.churned.toLocaleString()}</div><div class="label">Churned</div></div>
  </div>

  <div class="charts">
    <div class="chart-card">
      <h3>Signups by Week</h3>
      <canvas id="signupsChart"></canvas>
    </div>
    <div class="chart-card">
      <h3>User Segments</h3>
      <canvas id="segmentsChart"></canvas>
    </div>
  </div>

  <div class="bottom-row">
    <div class="chart-card">
      <h3>Login Methods</h3>
      <canvas id="methodsChart"></canvas>
    </div>
    <div class="chart-card">
      <h3>Email Coverage</h3>
      <canvas id="emailChart"></canvas>
    </div>
  </div>

<script>
  const brandColor = '#345A5D';
  const palette = ['#345A5D', '#4A7C7F', '#6B9EA1', '#8DBFC2', '#B0E0E3'];
  const segmentColors = ['#2ECC71', '#345A5D', '#F39C12', '#E74C3C'];

  new Chart(document.getElementById('signupsChart'), {
    type: 'bar',
    data: { labels: ${weekLabels}, datasets: [{ label: 'Signups', data: ${weekValues}, backgroundColor: brandColor, borderRadius: 4 }] },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { maxRotation: 45 } } } }
  });

  new Chart(document.getElementById('segmentsChart'), {
    type: 'doughnut',
    data: { labels: ${segmentLabels}, datasets: [{ data: ${segmentValues}, backgroundColor: segmentColors }] },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });

  new Chart(document.getElementById('methodsChart'), {
    type: 'bar',
    data: { labels: ${methodLabels}, datasets: [{ label: 'Users', data: ${methodValues}, backgroundColor: palette.concat(palette) }] },
    options: { responsive: true, indexAxis: 'y', plugins: { legend: { display: false } } }
  });

  new Chart(document.getElementById('emailChart'), {
    type: 'doughnut',
    data: { labels: ['Has Email', 'No Email'], datasets: [{ data: [${withEmail}, ${contacts.length - withEmail}], backgroundColor: [brandColor, '#ddd'] }] },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });
</script>
</body>
</html>`;
}

async function main() {
  const { help } = parseArguments("dashboard", process.argv.slice(2));
  if (help) return printHelp("dashboard");
  const { mkdirSync, writeFileSync } = await import("node:fs");
  const { fetchAllPrivyUsers } = await import("../lib/recoupApi.js");
  const { segmentUser } = await import("../lib/segmentation.js");
  const { exportsDirectory } = await import("../lib/paths.js");
  console.log("Fetching user data for dashboard...");
  const { logins, total } = await fetchAllPrivyUsers();

  const contacts = logins.map(segmentUser);

  const html = generateHtml(contacts, total);
  const date = new Date().toISOString().split("T")[0];
  const filename = `dashboard-${date}.html`;

  mkdirSync(exportsDirectory, { recursive: true });
  writeFileSync(new URL(filename, exportsDirectory), html);

  console.log(`Dashboard generated → exports/${filename}`);
  console.log("Open it in your browser to view.");
}

main().catch((err) => {
  console.error("Dashboard generation failed:", err);
  process.exit(1);
});
