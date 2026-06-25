import { test, expect } from "@playwright/test";

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
});
