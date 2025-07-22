/** biome-ignore-all lint/performance/noNamespaceImport: Easier to import */
import * as auth from "./auth";
import * as core from "./core";
import * as relations from "./relations";

export const schema = { ...auth, ...core, ...relations };
