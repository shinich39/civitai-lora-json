import pkg from "./package.json" assert { type: "json" };
import fs from "node:fs";
import * as esbuild from "esbuild";

function camelize(str) {
  return str.replace(/[_.-](\w|$)/g, function (_, x) {
    return x.toUpperCase();
  });
}

(async function () {
  const MODULE_NAME = pkg.name.replace(/\W/g, "-").replace(/-?js$/, "");
  const MODULE_VERSION = pkg.version;
  const GLOBAL_NAME = camelize(MODULE_NAME); // iife

  if (fs.existsSync("./dist")) {
    fs.rmSync("./dist", { recursive: true });
  }

  // ESM
  await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    minify: false,
    platform: "node",
    format: "esm",
    outfile: `dist/${MODULE_NAME}.mjs`,
  });

  // Minify ESM
  await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    minify: true,
    platform: "node",
    format: "esm",
    outfile: `dist/${MODULE_NAME}.min.mjs`,
  });

  // CommonJS
  await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    minify: false,
    platform: "node",
    format: "cjs",
    outfile: `dist/${MODULE_NAME}.cjs`,
  });

  // Minify CJS
  await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    minify: true,
    platform: "node",
    format: "cjs",
    outfile: `dist/${MODULE_NAME}.min.cjs`,
  });

  // Browser
  await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    minify: false,
    platform: "browser",
    format: "iife",
    globalName: GLOBAL_NAME,
    outfile: `dist/${MODULE_NAME}.js`,
  });

  // Minify Browser
  await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    minify: true,
    platform: "browser",
    format: "iife",
    globalName: GLOBAL_NAME,
    outfile: `dist/${MODULE_NAME}.min.js`,
  });
})();
