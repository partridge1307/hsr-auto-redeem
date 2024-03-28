import { readdirSync } from 'node:fs';
const srcDir = readdirSync('src');

let target: string[] = [];

srcDir.filter((dir) => dir.endsWith(".ts")).forEach((dir) =>
  target.push(`src/${dir}`)
);

await Bun.build({
  entrypoints: target,
  outdir: './out',
  target: 'bun',
  minify: true,
});

