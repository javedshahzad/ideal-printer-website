/**
 * @deprecated Use scripts/global-version.js + node tools/sync-global-version.mjs
 * Replaces dynamic ipLoadScript/ipLoadStylesheet with static tags versioned from GLOBAL_VERSION.
 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const syncScript = path.join(path.dirname(fileURLToPath(import.meta.url)), "sync-global-version.mjs");
const result = spawnSync(process.execPath, [syncScript], { stdio: "inherit" });
process.exit(result.status ?? 1);
