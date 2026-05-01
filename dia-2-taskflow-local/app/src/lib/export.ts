import type { Client, LogEntry, Project } from "../types";

export function clientName(clients: Client[], id: string) {
  return clients.find((client) => client.id === id)?.name ?? "Unknown";
}

export function projectName(projects: Project[], id?: string | null) {
  return id ? projects.find((project) => project.id === id)?.name ?? "" : "";
}

export function downloadCsv(filename: string, entries: LogEntry[], clients: Client[], projects: Project[]) {
  const header = ["date", "client", "project", "title", "type", "status", "hours", "description"];
  const rows = entries.map((entry) => [
    entry.entry_date,
    clientName(clients, entry.client_id),
    projectName(projects, entry.project_id),
    entry.title,
    entry.entry_type ?? "",
    entry.status,
    entry.hours ?? "",
    entry.description
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  downloadBlob(filename, csv, "text/csv;charset=utf-8");
}

export function downloadPdf(filename: string, title: string, entries: LogEntry[], clients: Client[], projects: Project[]) {
  const lines = [
    title,
    "",
    ...entries.flatMap((entry) => [
      `${entry.entry_date} | ${clientName(clients, entry.client_id)} | ${projectName(projects, entry.project_id)} | ${entry.title}`,
      entry.hours ? `Hours: ${entry.hours}` : "",
      entry.description,
      ""
    ])
  ].map((line) => sanitizePdfText(line).slice(0, 96));
  const stream = [
    "BT",
    "/F1 12 Tf",
    "50 790 Td",
    ...lines.flatMap((line, index) => index === 0 ? [`(${line}) Tj`] : ["0 -16 Td", `(${line}) Tj`]),
    "ET"
  ].join("\n");
  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj",
    "4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
    `5 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`
  ];
  const header = "%PDF-1.4\n";
  let body = "";
  const offsets = [0];
  objects.forEach((object) => {
    offsets.push(header.length + body.length);
    body += `${object}\n`;
  });
  const xrefOffset = header.length + body.length;
  const xref = [
    "xref",
    `0 ${objects.length + 1}`,
    "0000000000 65535 f ",
    ...offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n `),
    "trailer",
    `<< /Size ${objects.length + 1} /Root 1 0 R >>`,
    "startxref",
    String(xrefOffset),
    "%%EOF"
  ].join("\n");
  downloadBlob(filename, `${header}${body}${xref}`, "application/pdf");
}

function downloadBlob(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function sanitizePdfText(value: string) {
  return value.replace(/[^\x20-\x7E]/g, "").replace(/[()\\]/g, "\\$&");
}
