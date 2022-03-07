import path from "path";
import chokidar from "chokidar";
import esbuild from "esbuild";
import { paths } from "./utils";
import debounce from "lodash/debounce";

const watchPattern = `${paths.src}/**/*.(ts|tsx)`;
const clientEntryPoints = [path.resolve(paths.src, "client", "main.tsx")];
const serverEntryPoints = [path.resolve(paths.src, "server", "index.ts")];

export async function esbuildWatch() {
  const changePaths: Set<string> = new Set();
  async function build() {
    console.log(changePaths);
  }
  const debounceRebuild = () => debounce(_build, 300, { leading: true });

  const watcher = chokidar.watch(watchPattern, { ignoreInitial: true });
  watcher.on("all", async (event, path) => {
    console.log(event, path);
    changePaths.add(path);
    // debounceRebuild();
    console.log("rebuild....");
    await _build();
  });
}

const build = async () => {
  await esbuildWatch();
};

const _build = async function () {
  console.log("_build ...");

  esbuild
    .build({
      entryPoints: clientEntryPoints,
      bundle: true,
      platform: "browser",
      outfile: path.resolve(paths.dist, "client", "index.js"),
    })
    .catch((e) => {
      console.log("build client error:", e);
      process.exit(1);
    });

  esbuild
    .build({
      entryPoints: serverEntryPoints,
      bundle: true,
      platform: "node",
      outfile: path.resolve(paths.dist, "server", "index.js"),
    })
    .catch((e) => {
      console.log("build server error:", e);
      process.exit(1);
    });
};

export default build;
