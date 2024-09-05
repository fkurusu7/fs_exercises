import { test, describe, expect, beforeEach } from "@playwright/test";

describe("Blog App - Log in", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3001");
  });

  test("should show login form", async ({ page }) => {
    const loginText = "Log in to application";
    const locator = await page.getByText(loginText);
    await expect(locator).toBeVisible();
    await expect(page.getByRole("button")).toBeVisible();
  });
});
