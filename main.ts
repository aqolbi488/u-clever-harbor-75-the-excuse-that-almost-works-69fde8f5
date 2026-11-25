import { mkdirSync, writeFileSync } from "node:fs";

const EXCUSE =
  "cant get in, my badge is in my coat and my coat is locked in the office";

function validateEntry(text: string): void {
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be empty or whitespace-only");
  }
  if (text.length < 1 || text.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r") || text.includes("\t")) {
    throw new Error("entry must be a single line with plain spaces");
  }
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0 || words.length > 20) {
    throw new Error(`entry must be 1-20 words, got ${words.length}`);
  }
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    throw new Error("entry must round-trip as UTF-8");
  }
}

validateEntry(EXCUSE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");
console.log(`wrote ${EXCUSE.length} chars to /output/entry.txt`);
