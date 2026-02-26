#!/usr/bin/env -S deno run -A --watch=static/,routes/,islands/,components/
import { Builder } from "fresh/dev";

const builder = new Builder();

if (Deno.args.includes("build")) {
  await builder.build();
} else {
  await builder.listen(() => import("./main.ts"));
}
