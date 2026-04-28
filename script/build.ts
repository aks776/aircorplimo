import { build as viteBuild } from "vite";
import { rm } from "fs/promises";

// ---------------------------
// Clean build for frontend-only project
// ---------------------------
async function buildAll() {
  // Remove previous build
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("Build complete. No server bundling needed for Google Sheets setup.");
}

// Run build
buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});