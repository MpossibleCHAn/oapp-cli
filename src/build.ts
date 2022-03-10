import path from "path";
import chokidar from "chokidar";
import esbuild from "esbuild";
import { paths } from "./utils";
import debounce from "lodash/debounce";

const watchPattern = `${paths.src}/**/*.(ts|tsx)`;
const clientEntryPoints = [path.resolve(paths.src, "client", "main.tsx")];
const serverEntryPoints = [path.resolve(paths.src, "server", "index.ts")];
const workerEntryPoints = [path.resolve(paths.src, "client", "worker.ts")]

export async function esbuildWatch() {
  const changePaths: Set<string> = new Set();
  async function build() {
    console.log(changePaths);
  }
  const debounceRebuild = () =>
    debounce(
      () => {
        console.log("debounce ....");
        console.log(Array.from(changePaths));
      },
      300,
      { leading: false }
    );

  const watcher = chokidar.watch(watchPattern, { ignoreInitial: true });
  watcher.on("all", async (event, path) => {
    console.log(`rebuild: ${event} - ${path}`);
    changePaths.add(path);
    _build()
    // debounceRebuild();
  });
}

const build = async () => {
  await _build();
  await esbuildWatch();
};

const _build = async function () {
  console.log("Run _build ...");
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

  esbuild
    .build({
      entryPoints: workerEntryPoints,
      bundle: true,
      platform: "browser",
      outfile: path.resolve(paths.dist, "client", "worker.js"),
    })
    .catch((e) => {
      console.log("build worker error:", e);
      process.exit(1);
    });
};

export default build;
