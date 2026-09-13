#!/usr/bin/env node
/**
 * Builds the Claude Artifact version of the app from index.html.
 *
 * index.html is a complete standalone page (open it from disk, or host it
 * anywhere). The Artifact host supplies its own <!doctype>/<head>/<body>
 * wrapper, so this strips ours and keeps the marked head + body content.
 *
 *   node tools/build-artifact.mjs [outfile]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(resolve(root, "index.html"), "utf8");

function between(open, close) {
  const a = src.indexOf(open);
  const b = src.indexOf(close);
  if (a === -1 || b === -1) throw new Error(`missing marker ${open}`);
  return src.slice(a + open.length, b).trim();
}

const out = [
  between("<!-- ARTIFACT:HEAD -->", "<!-- /ARTIFACT:HEAD -->"),
  "",
  between("<!-- ARTIFACT:BODY -->", "<!-- /ARTIFACT:BODY -->"),
  "",
].join("\n");

const dest = process.argv[2] || resolve(root, "dist/artifact.html");
writeFileSync(dest, out);
console.log(`wrote ${dest} (${(out.length / 1024).toFixed(1)} KB)`);
