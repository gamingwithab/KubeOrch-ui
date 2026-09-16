import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readRepoFile = (path: string) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const roadmapAnchor =
  "https://github.com/KubeOrch/community/blob/main/ROADMAP.md#what-counts-as-an-integration";

describe("extension documentation claims", () => {
  it("keeps unsupported marketplace claims out of the active README", () => {
    const readme = readRepoFile("README.md");

    for (const unsupportedClaim of [
      "Plugin Marketplace",
      "One-Click Plugins",
      "Auto-Integration",
      "Zero Configuration",
    ]) {
      expect(readme).not.toContain(unsupportedClaim);
    }

    expect(readme).toContain("Extensions Catalog");
    expect(readme).toContain(roadmapAnchor);
  });

  it("labels old concept documents as historical and links the current contract", () => {
    for (const path of ["docs/idea.md", "docs/component-palette.md"]) {
      const document = readRepoFile(path);

      expect(document).toContain("Historical concept document");
      expect(document).toContain(roadmapAnchor);
    }
  });
});
