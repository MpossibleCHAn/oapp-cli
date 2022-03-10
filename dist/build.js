"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esbuildWatch = void 0;
const path_1 = __importDefault(require("path"));
const chokidar_1 = __importDefault(require("chokidar"));
const esbuild_1 = __importDefault(require("esbuild"));
const utils_1 = require("./utils");
const debounce_1 = __importDefault(require("lodash/debounce"));
const watchPattern = `${utils_1.paths.src}/**/*.(ts|tsx)`;
const clientEntryPoints = [path_1.default.resolve(utils_1.paths.src, "client", "main.tsx")];
const serverEntryPoints = [path_1.default.resolve(utils_1.paths.src, "server", "index.ts")];
const workerEntryPoints = [path_1.default.resolve(utils_1.paths.src, "client", "worker.ts")];
async function esbuildWatch() {
    const changePaths = new Set();
    async function build() {
        console.log(changePaths);
    }
    const debounceRebuild = () => (0, debounce_1.default)(() => {
        console.log("debounce ....");
        console.log(Array.from(changePaths));
    }, 300, { leading: false });
    const watcher = chokidar_1.default.watch(watchPattern, { ignoreInitial: true });
    watcher.on("all", async (event, path) => {
        console.log(`rebuild: ${event} - ${path}`);
        changePaths.add(path);
        _build();
        // debounceRebuild();
    });
}
exports.esbuildWatch = esbuildWatch;
const build = async () => {
    await _build();
    await esbuildWatch();
};
const _build = async function () {
    console.log("Run _build ...");
    esbuild_1.default
        .build({
        entryPoints: clientEntryPoints,
        bundle: true,
        platform: "browser",
        outfile: path_1.default.resolve(utils_1.paths.dist, "client", "index.js"),
    })
        .catch((e) => {
        console.log("build client error:", e);
        process.exit(1);
    });
    esbuild_1.default
        .build({
        entryPoints: serverEntryPoints,
        bundle: true,
        platform: "node",
        outfile: path_1.default.resolve(utils_1.paths.dist, "server", "index.js"),
    })
        .catch((e) => {
        console.log("build server error:", e);
        process.exit(1);
    });
    esbuild_1.default
        .build({
        entryPoints: workerEntryPoints,
        bundle: true,
        platform: "browser",
        outfile: path_1.default.resolve(utils_1.paths.dist, "client", "worker.js"),
    })
        .catch((e) => {
        console.log("build worker error:", e);
        process.exit(1);
    });
};
exports.default = build;
