import { expect, test } from "@playwright/test";

test.describe("Happy path", () => {
  test("full flow: home → page1 → page2 → recommendation", async ({ page }) => {
    // 1. Home page — click "Inspire me!"
    await page.goto("/");
    await page.getByRole("link", { name: "Inspire me!" }).click();
    await expect(page).toHaveURL("/page1");

    // 2. Page1 — select Category
    await expect(
      page.getByRole("heading", { name: "What's on your mind's menu?" }),
    ).toBeVisible();
    await page.getByLabel("Category").selectOption("Italian");
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(page).toHaveURL("/page2");

    await expect(
      page.getByRole("heading", { name: "Where are you cooking from?" }),
    ).toBeVisible();
    await page.getByLabel("Area").selectOption("Italian");
    await page.getByRole("button", { name: "Complete", exact: true }).click();
    await expect(page).toHaveURL("/recommendation");

    // 4. Recommendation — verify the meal card
    await expect(page.locator("section.card article h1")).toHaveText(
      "Pizza Margherita",
    );
    await expect(page.getByText("Italian — Italian")).toBeVisible();
    await expect(
      page.locator('section.card img[alt="Pizza Margherita"]'),
    ).toBeVisible();
  });

  test("search page shows results when typing a query", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Search" }).click();
    await expect(page).toHaveURL("/search");

    await expect(
      page.getByRole("heading", { name: "Search page" }),
    ).toBeVisible();

    await page.getByLabel("Recipe name").fill("Pizza");

    await expect(page.getByText("Pizza Margherita")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("Fish pie")).toBeVisible();
  });

  test("history shows viewed recipes and supports empty state", async ({
    page,
  }) => {
    await page.goto("/history");
    await expect(page.locator("h1")).toContainText("History");
    await expect(page.getByText("No history yet.")).toBeVisible();

    await page.goto("/recommendation/99999");
    await expect(page.locator("section.card article h1")).toHaveText(
      "Pizza Margherita",
    );

    await page.goto("/history");
    await expect(page.locator("ul li").first()).toContainText(
      "Pizza Margherita",
    );
    await expect(page.getByText("Italian — Italian")).toBeVisible();
  });

  test("back from page2 to page1 preserves selected category", async ({
    page,
  }) => {
    await page.goto("/page1");
    await expect(
      page.getByRole("heading", { name: "What's on your mind's menu?" }),
    ).toBeVisible();
    await page.getByLabel("Category").selectOption("Italian");
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(page).toHaveURL("/page2");

    await page.getByRole("link", { name: "Back" }).click();
    await expect(page).toHaveURL("/page1");

    await expect(
      page.getByRole("heading", { name: "What's on your mind's menu?" }),
    ).toBeVisible();
    await expect(page.getByLabel("Category")).toHaveValue("Italian");
  });
});
