import en from "../i18n/en.json";
import es from "../i18n/es.json";
import type { Language } from "../types";

const dictionaries = { en, es };

export function translate(language: Language, key: string): string {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionaries[language]);

  return typeof value === "string" ? value : key;
}
