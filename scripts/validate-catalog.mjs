import { readFile } from "node:fs/promises";

const catalog = JSON.parse(await readFile(new URL("../catalog/index.json", import.meta.url), "utf8"));
const failures = [];

if (catalog.schemaVersion !== 1) failures.push("catalog/index.json: schemaVersion must be 1");
if (!Array.isArray(catalog.games)) failures.push("catalog/index.json: games must be an array");

const seen = new Set();
for (const [index, game] of (catalog.games ?? []).entries()) {
  const at = `catalog/index.json games[${index}]`;
  if (!game.id || typeof game.id !== "string") failures.push(`${at}: missing id`);
  if (seen.has(game.id)) failures.push(`${at}: duplicate id ${game.id}`);
  seen.add(game.id);
  if (!game.title || typeof game.title !== "string") failures.push(`${at}: missing title`);
  if (!game.platform || typeof game.platform !== "string") failures.push(`${at}: missing platform`);
  if (typeof game.vimmUrl !== "string" || !/^https:\/\/vimm\.net\/vault\/\d+$/.test(game.vimmUrl)) {
    failures.push(`${at}: vimmUrl must be a verified individual Vault URL`);
  }
  if (game.linkStatus !== "verified") failures.push(`${at}: published games must have linkStatus=verified`);

  if (game.download === "[BRANCO]") {
    if (game.availability?.downloadAvailable !== false || game.availability?.authorizedDownload !== false) {
      failures.push(`${at}: [BRANCO] entries must explicitly disable download availability and authorization`);
    }
  } else {
    if (game.download?.authorized !== true && (game.download?.uris?.length ?? 0) > 0) {
      failures.push(`${at}: unauthorized download entries must not contain URIs`);
    }
    if (game.download?.authorized !== true || !Array.isArray(game.download?.uris) || game.download.uris.length === 0) {
      failures.push(`${at}: download must be [BRANCO] or contain authorized URIs`);
    }
  }
}

const pending = JSON.parse(await readFile(new URL("../catalog/pending/ps1.json", import.meta.url), "utf8"));
if (!Array.isArray(pending.games)) failures.push("catalog/pending/ps1.json: games must be an array");
for (const [index, game] of (pending.games ?? []).entries()) {
  if (game.vimmUrl !== null || game.linkStatus !== "pending_review") {
    failures.push(`catalog/pending/ps1.json games[${index}]: unresolved records must remain pending with vimmUrl=null`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Catalog validation passed: ${catalog.games.length} published, ${pending.games.length} pending review.`);
