import { test, expect } from "@playwright/test";

/**
 * E2E smoke + conversion-surface coverage for the marketing site.
 * Maps to the WEBSITE.md ticket work: stats, logos, newsletter, contact form,
 * diligence sample, nav, pricing, beats, receipts. Runs on desktop + mobile.
 */

test.describe("homepage", () => {
  test("renders hero, stats, logos, manifesto, objections, mantra", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "agentic",
    );
    // W-07 stats strip
    await expect(page.getByTestId("stats-strip").first()).toBeVisible();
    // W-08 logo bar
    await expect(page.getByTestId("logo-bar").first()).toBeVisible();
    // W-19 manifesto
    await expect(page.getByText("Our bet is")).toBeVisible();
    // W-33 objections
    await expect(
      page.getByText("Questions worth answering first."),
    ).toBeVisible();
    // W-10 mantra (sitewide line)
    await expect(page.getByTestId("mantra").first()).toBeVisible();
  });

  test("hero ownership line links to /trust (W-04)", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "See our data boundary" }).first();
    await expect(link).toHaveAttribute("href", "/trust");
  });

  test("§10 testimonial CTA points to the diligence sample (W-02/W-15)", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /sample diligence report/i });
    await expect(cta).toHaveAttribute("href", "/diligence");
  });

  test("offering lanes follow the funnel (Products → Skills, Consulting)", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Explore products/i }),
    ).toHaveAttribute("href", "/skills");
    await expect(
      page.getByRole("link", { name: /Work with us/i }).first(),
    ).toHaveAttribute("href", "/consulting");
  });
});

test.describe("navigation", () => {
  test("Trust is in the header nav (W-03)", async ({ page }) => {
    await page.goto("/");
    const trust = page.getByRole("link", { name: "Trust", exact: true });
    // On mobile the nav is behind the hamburger; open it if needed.
    if (!(await trust.first().isVisible())) {
      await page.getByRole("button", { name: /toggle menu/i }).click();
    }
    await expect(trust.first()).toBeVisible();
  });

  test("Products group shows Recoup OS / Skills / Chat in the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /toggle menu/i }).click();
    const menu = page.locator("#site-menu");
    await expect(menu.getByRole("link", { name: "Recoup OS" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Skills", exact: true })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Chat", exact: true })).toBeVisible();
  });
});

test.describe("contact form (W-13/W-14)", () => {
  test("consulting renders the qualified form with disqualifier", async ({ page }) => {
    await page.goto("/consulting");
    await expect(page.getByTestId("contact-form")).toBeVisible();
    await expect(page.getByText(/ready to transform, not experiment/i)).toBeVisible();
    await expect(page.locator("#cf-org")).toBeVisible();
    await expect(page.locator("#cf-size")).toBeVisible();
  });

  test("submitting posts to /api/contact and shows success", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
    });
    await page.goto("/consulting#contact");
    await page.locator("#cf-name").fill("Test Buyer");
    await page.locator("#cf-email").fill("test@label.com");
    await page.getByRole("button", { name: "Talk to us" }).click();
    await expect(page.getByTestId("contact-success")).toBeVisible();
  });

  test("partners and trust also render the form", async ({ page }) => {
    await page.goto("/partners");
    await expect(page.getByTestId("contact-form")).toBeVisible();
    await page.goto("/trust");
    await expect(page.getByTestId("contact-form")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Owned Build", exact: true }),
    ).toBeVisible();
  });
});

test.describe("diligence sample (W-15)", () => {
  test("renders summary, top tracks, flags, memo", async ({ page }) => {
    await page.goto("/diligence");
    await expect(page.getByTestId("stats-strip")).toBeVisible();
    await expect(page.getByText("Top tracks by TTM income")).toBeVisible();
    await expect(page.getByText("IC memo draft (excerpt)")).toBeVisible();
    await expect(page.getByText(/Sample · redacted/)).toBeVisible();
  });
});

test.describe("pricing (W-05)", () => {
  test("Implementation tier shows the $500 anchor", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText("From $500")).toBeVisible();
  });
});

test.describe("products", () => {
  test("skills renders workflow chips (W-30)", async ({ page }) => {
    await page.goto("/skills");
    await expect(page.getByText("/workflow:diligence")).toBeVisible();
  });

  test("skills features Recoup OS", async ({ page }) => {
    await page.goto("/skills");
    await expect(
      page.getByRole("link", { name: /Explore Recoup OS/i }),
    ).toHaveAttribute("href", "/recoup-os");
  });

  test("chat renders the receipts table (W-25)", async ({ page }) => {
    await page.goto("/chat");
    await expect(page.getByTestId("receipts-table")).toBeVisible();
  });

  test("recoup-os renders hero + get CTA", async ({ page }) => {
    await page.goto("/recoup-os");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /operating system/i,
    );
    await expect(
      page.getByRole("link", { name: /Get Recoup OS/i }).first(),
    ).toBeVisible();
  });

  test("/platform redirects to /skills", async ({ page }) => {
    await page.goto("/platform");
    await expect(page).toHaveURL(/\/skills$/);
  });
});

test.describe("blog (W-26)", () => {
  test("cards show editorial beat kickers", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByText("Release Radar").first()).toBeVisible();
  });

  test("post title is not double-suffixed (W-06)", async ({ page }) => {
    await page.goto("/blog/ai-music-marketing");
    const title = await page.title();
    expect(title).not.toMatch(/Recoup \| Recoup|Recoupable \| Recoup/);
  });
});

test.describe("newsletter (W-09)", () => {
  test("footer renders the newsletter signup", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("newsletter-signup").first()).toBeVisible();
  });
});
