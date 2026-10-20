import { execFileSync, spawnSync } from "node:child_process";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import posts from "../../content/blog/posts.json";
import { renderPublishedPostsIndex } from "../build-post-index.mjs";

const script = join(process.cwd(), "scripts/build-post-index.mjs");

describe("published editorial inventory", () => {
  it("matches the complete source used by the website without duplicate article links", () => {
    execFileSync(process.execPath, [script, "--check"]);
    const index = readFileSync("content/posts/INDEX.md", "utf8");
    const links = [...index.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)].map(
      (match) => match[1],
    );
    expect(links.sort()).toEqual(posts.map((post) => post.slug).sort());
    expect(new Set(links).size).toBe(posts.length);
  });

  it("rejects duplicate source slugs rather than hiding them", () => {
    expect(() => renderPublishedPostsIndex([posts[0], posts[0]])).toThrow(
      "Duplicate published slug",
    );
  });

  it("escapes table and link syntax without changing canonical article paths", () => {
    const output = renderPublishedPostsIndex([
      { ...posts[0], title: "A | B [review]\nnext" },
    ]);
    expect(output).toContain("[A \\| B \\[review\\] next](/blog/");
  });

  it.each(["missing", "duplicate", "stale title"])(
    "fails the read-only check for a %s inventory entry",
    (defect) => {
      const root = mkdtempSync(join(tmpdir(), "post-index-"));
      try {
        mkdirSync(join(root, "scripts"));
        mkdirSync(join(root, "content/blog"), { recursive: true });
        mkdirSync(join(root, "content/posts"));
        copyFileSync(script, join(root, "scripts/build-post-index.mjs"));
        writeFileSync(
          join(root, "content/blog/posts.json"),
          JSON.stringify([posts[0]]),
        );
        const output = renderPublishedPostsIndex([posts[0]]);
        const row = output
          .split("\n")
          .find((line) => line.includes(`](/blog/${posts[0].slug})`))!;
        const broken =
          defect === "missing"
            ? output.replace(row, "")
            : defect === "duplicate"
              ? output.replace(row, `${row}\n${row}`)
              : output.replace(posts[0].title, "Obsolete title");
        const destination = join(root, "content/posts/INDEX.md");
        writeFileSync(destination, broken);
        const result = spawnSync(
          process.execPath,
          [join(root, "scripts/build-post-index.mjs"), "--check"],
          { encoding: "utf8" },
        );
        expect(result.status).not.toBe(0);
        expect(result.stderr).toContain("inventory is stale");
        expect(readFileSync(destination, "utf8")).toBe(broken);
      } finally {
        rmSync(root, { recursive: true, force: true });
      }
    },
  );
});
