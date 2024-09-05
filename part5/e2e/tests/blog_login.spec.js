import { test, describe, expect, beforeEach } from "@playwright/test";

const BASE_URL = "http://localhost:3001";

// Empties the DB. Creates a user for the Backend
async function setupTestEnvironment(request) {
  await request.post(`${BASE_URL}/api/testing/reset`);
  await request.post(`${BASE_URL}/api/users`, {
    data: {
      name: "test user",
      username: "testeruser",
      password: "password",
    },
  });
}

async function loginUser(page, username, password) {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "Log in" }).click();
}

describe("Blog App - Log in", () => {
  beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("should show login form", async ({ page }) => {
    const loginText = "Log in to application";
    const locator = await page.getByText(loginText);
    await expect(locator).toBeVisible();
    await expect(page.getByRole("button")).toBeVisible();
  });

  describe("Log in Process", () => {
    beforeEach(async ({ page, request }) => {
      await setupTestEnvironment(request);
    });

    test("should succeed with correct credentials", async ({ page }) => {
      const name = "test user";
      await loginUser(page, "testeruser", "password");
      const successMsg = `Welcome, ${name}. You are logged in.`;

      await expect(page.getByText(successMsg)).toBeVisible();
    });

    test("should fail with incorrect credentials", async ({ page }) => {
      await loginUser(page, "testeruser", "wrong_password");
      const errorMsg = "Wrong credentials";
      const errorElement = await page.locator(".error");
      await expect(errorElement).toContainText(errorMsg);
    });
  });
});
