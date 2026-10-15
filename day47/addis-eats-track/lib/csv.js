// lib/csv.js
function escapeCell(value) {
  let text = String(value ?? "");

  if (/^[\t\r ]*[=+\-@]/.test(text)) {
    text = "'" + text;
  }
  if (/[",\r\n]/.test(text)) {
    text = `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function toCsv(rows) {
  if (!rows.length) return "";

  const headers = Object.keys(rows[0]);
  const lines = [
    headers,
    ...rows.map((row) => headers.map((header) => row[header])),
  ];

  return lines.map((row) => row.map(escapeCell).join(",")).join("\r\n");
}

export function downloadCsv(text, filename) {
  const blob = new Blob(["\uFEFF", text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
