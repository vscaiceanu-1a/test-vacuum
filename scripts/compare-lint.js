const fs = require('fs');

const headFile = process.argv[2];
const baseFile = process.argv[3];

if (!headFile || !baseFile) {
  console.error("Usage: node compare-lint.js <head-json> <base-json>");
  process.exit(1);
}

let headProblems = [];
let baseProblems = [];

try {
  // Redocly JSON output structure might vary, assuming standard output or handling potential wrapper
  const headContent = fs.readFileSync(headFile, 'utf8');
  const baseContent = fs.readFileSync(baseFile, 'utf8');
  
  // Try parsing, handle empty files or non-JSON gracefully if possible
  const headJson = headContent ? JSON.parse(headContent) : {};
  const baseJson = baseContent ? JSON.parse(baseContent) : {};

  // Extract problems array. Redocly usually outputs { totals: ..., problems: [...] } or just [...]
  headProblems = Array.isArray(headJson) ? headJson : (headJson.problems || []);
  baseProblems = Array.isArray(baseJson) ? baseJson : (baseJson.problems || []);

} catch (e) {
  console.error("Error parsing JSON files:", e);
  process.exit(1);
}

// Create a set of signatures for base problems to easily check existence
// Signature: file + ruleId + message (ignoring line/col to be robust against shifts)
const getSignature = (p) => `${p.file}|${p.ruleId}|${p.message}`;
const baseSignatures = new Set(baseProblems.map(getSignature));

const newViolations = headProblems.filter(p => !baseSignatures.has(getSignature(p)));

if (newViolations.length > 0) {
  console.log("### 🚨 New Lint Violations Detected");
  console.log(`Found ${newViolations.length} new violation(s) introduced in this PR:`);
  console.log("");
  console.log("| Severity | Rule | File | Message |");
  console.log("|---|---|---|---|");
  
  newViolations.forEach(p => {
    const severityIcon = p.severity === 'error' ? '🔴' : '⚠️';
    // Escape pipes in message to avoid breaking markdown table
    const message = p.message.replace(/\|/g, '\\|');
    console.log(`| ${severityIcon} ${p.severity} | \`${p.ruleId}\` | \`${p.file}\` | ${message} |`);
  });
} else {
  console.log("✅ No new lint violations detected.");
}
