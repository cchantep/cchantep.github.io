const fs = require("fs");
const path = require("path");

const JS_DIR = path.resolve("assets/js");

function findLatestJs(baseName) {
  const candidates = fs
    .readdirSync(JS_DIR)
    .filter(file =>
      file.startsWith(`${baseName}.`) &&
      file.endsWith(".js")
    )
    .filter(file =>
      file !== `${baseName}.js`
    );

  if (!candidates.length) {
    console.warn(`No generated file found for ${baseName}`);
    return null;
  }

  return candidates
    .map(file => ({
      file,
      time: fs.statSync(path.join(JS_DIR, file)).mtimeMs
    }))
    .sort((a, b) => b.time - a.time)[0].file;
}

function updateFile(file) {
  let content = fs.readFileSync(file, "utf8");

  const updated = content.replace(
    /\/assets\/js\/([a-zA-Z0-9_-]+)\.[a-zA-Z0-9_-]+\.js/g,
    (match, baseName) => {
      const latest = findLatestJs(baseName);

      if (!latest) {
        return match;
      }

      console.log(`${match} -> /assets/js/${latest}`);

      return `/assets/js/${latest}`;
    }
  );

  if (updated !== content) {
    fs.writeFileSync(file, updated);
    console.log(`Updated ${file}`);
  }
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => !["node_modules", ".git", "_site"].includes(e.name))
    .flatMap(e => {
      const full = path.join(dir, e.name);

      return e.isDirectory()
        ? walk(full)
        : full.endsWith(".html")
          ? [full]
          : [];
    });
}

for (const file of walk(".")) {
  updateFile(file);
}
