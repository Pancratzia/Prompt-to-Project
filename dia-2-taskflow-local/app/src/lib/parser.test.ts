import { describe, expect, it } from "vitest";
import { parseNaturalText } from "./parser";

const clients = [
  { id: "c1", user_id: "u1", name: "Gen", created_at: "", updated_at: "" },
  { id: "c2", user_id: "u1", name: "Diego", created_at: "", updated_at: "" }
];

const projects = [
  { id: "p1", user_id: "u1", client_id: "c1", name: "Dashboard", status: "open" as const, created_at: "", updated_at: "" },
  { id: "p2", user_id: "u1", client_id: "c2", name: "Landing Page", status: "open" as const, created_at: "", updated_at: "" }
];

describe("local parser", () => {
  it("parses Spanish hours, client and project", () => {
    const [entry] = parseNaturalText("Para Gen trabaje tres horas en el dashboard el lunes.", clients, projects, "es");
    expect(entry.client_id).toBe("c1");
    expect(entry.project_id).toBe("p1");
    expect(entry.hours).toBe(3);
    expect(entry.entry_type).toBe("work_done");
  });

  it("parses English client requests", () => {
    const [entry] = parseNaturalText("Diego asked me to update the pricing section.", clients, projects, "en");
    expect(entry.client_id).toBe("c2");
    expect(entry.entry_type).toBe("client_request");
    expect(entry.title).toBe("Update the pricing section");
  });

  it("splits repeated dictated client phrases", () => {
    const suggestions = parseNaturalText("Para Gen hice ajustes en el dashboard. Para Gen revise metricas.", clients, projects, "es");
    expect(suggestions).toHaveLength(2);
    expect(suggestions[0].title).toContain("Ajustes");
    expect(suggestions[1].title).toContain("Revise metricas");
  });

  it("keeps long context together and anchors weekday before an absolute date", () => {
    const [entry] = parseNaturalText(
      "Para la landing Page de Diego. El lunes. De esta semana, es decir, el lunes antes del 30 de abril del 2026. Tuve que hacer una seccion de Cultura en la landing Page.",
      clients,
      projects,
      "es"
    );
    expect(entry.client_id).toBe("c2");
    expect(entry.project_id).toBe("p2");
    expect(entry.entry_date).toBe("2026-04-27");
    expect(entry.title).toBe("Hacer una seccion de Cultura en la Landing Page");
    expect(entry.entry_type).toBe("work_done");
  });
});
