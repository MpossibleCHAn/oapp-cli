import { Command } from "commander";
import build from "./build";

const program = new Command();
program.version(require("../package.json").version);

program.command("start").action(async (options) => {
  console.log(options);
  build();
});

program.parse(process.argv);
