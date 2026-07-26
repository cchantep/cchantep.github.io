const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { minify } = require("terser");

const JS_DIR = path.resolve("assets/js");
const HASH_LENGTH = 12;

function sha(content) {
  return crypto
    .createHash("sha256")
    .update(content)
    .digest("hex")
    .slice(0, HASH_LENGTH);
}

async function processFile(file) {
  const filename = path.basename(file);

  // Ignore generated hashed files
  if (new RegExp(`\\.[a-f0-9]{${HASH_LENGTH}}\\.js$`).test(filename)) {
    return;
  }

  const baseName = path.basename(file, ".js");
  const source = fs.readFileSync(file, "utf8");

  const hash = sha(source);
  const outputName = `${baseName}.${hash}.js`;
  const outputPath = path.join(JS_DIR, outputName);

  // Remove previous generated files only
  const generatedPattern = new RegExp(
    `^${baseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.[a-f0-9]{${HASH_LENGTH}}\\.js$`
  );

  for (const existing of fs.readdirSync(JS_DIR)) {
    if (generatedPattern.test(existing)) {
      fs.unlinkSync(path.join(JS_DIR, existing));
      console.log(`Removed ${existing}`);
    }
  }

  const result = await minify(source, {
    compress: true,
    mangle: true,
  });

  fs.writeFileSync(outputPath, result.code);

  console.log(`Created ${outputName}`);
}

async function main() {
  const files = fs
    .readdirSync(JS_DIR)
    .filter((f) => f.endsWith(".js"))
    .map((f) => path.join(JS_DIR, f));

  for (const file of files) {
    await processFile(file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
