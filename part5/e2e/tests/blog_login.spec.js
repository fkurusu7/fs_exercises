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
  await request.post(`${BASE_URL}/api/users`, {
    data: {
      name: "post user",
      username: "postuser",
      password: "password",
    },
  });
}

async function loginUser(page, username, password) {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "Log in" }).click();
}

async function createPostWithLoggedInUser(page) {
  // Login with another user
  await loginUser(page, "postuser", "password");
  await page.getByRole("button", { name: "New Post" }).click();

  // populate textboxes
  const title = "a blog post from diff user";
  const author = "Gabriel Garcia";
  await page.getByTestId("title").fill(title);
  await page.getByTestId("author").fill(author);
  await page.getByTestId("url").fill("url://url.com");
  // click create post button
  await page.getByRole("button", { name: "create post" }).click();
  // Log out
  await page.getByTestId("logout").click();
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

  describe("When Logged in", () => {
    beforeEach(async ({ page, request }) => {
      await setupTestEnvironment(request);

      await loginUser(page, "testeruser", "password");
    });

    test("should create a new post", async ({ page }) => {
      // open post form
      await page.getByRole("button", { name: "New Post" }).click();

      // populate textboxes
      const title = "a blog post from e2e";
      const author = "Octavio Paz";
      await page.getByTestId("title").fill(title);
      await page.getByTestId("author").fill(author);
      await page.getByTestId("url").fill("url://url.com");
      // click create post button
      await page.getByRole("button", { name: "create post" }).click();

      // expect success message
      const successMsg = `A new Post "${title}" by ${author} added`;
      await expect(page.getByText(successMsg)).toBeVisible();

      // expect post title is present in page (list)
      const titlePgh = await page.locator(".title");
      await expect(titlePgh).toContainText(title);
    });

    test("should like a post", async ({ page }) => {
      // open post form
      await page.getByRole("button", { name: "New Post" }).click();

      // populate textboxes
      const title = "a blog post from e2e";
      const author = "Octavio Paz";
      await page.getByTestId("title").fill(title);
      await page.getByTestId("author").fill(author);
      await page.getByTestId("url").fill("url://url.com");
      // click create post button
      await page.getByRole("button", { name: "create post" }).click();

      // click "view" button
      await page.getByRole("button", { name: "view" }).click();

      // expect no likes
      await expect(page.getByText("Likes: 0")).toBeVisible();

      // click like button
      await page.getByRole("button", { name: "like" }).click();

      // expect likes text changes to Likes: 1
      await expect(page.getByText("Likes: 1")).toBeVisible();
    });

    test("should delete a post", async ({ page }) => {
      // open post form
      await page.getByRole("button", { name: "New Post" }).click();

      // populate textboxes
      const title = "a blog post from e2e";
      const author = "Octavio Paz";
      await page.getByTestId("title").fill(title);
      await page.getByTestId("author").fill(author);
      await page.getByTestId("url").fill("url://url.com");
      // click create post button
      await page.getByRole("button", { name: "create post" }).click();

      // click "view" button
      await page.getByRole("button", { name: "view" }).click();

      // click "delete" button
      await page.getByRole("button", { name: "remove" }).click();
      page.on("dialog", (dialog) => dialog.accept());
      // await expect(page.getByText("a blog post from e2e")).not.toBeVisible();
      expect(await page.getByText("a blog post from e2e").isVisible()).toBe(
        false
      );
    });

    test.only("should see remove button if post was created by logged in user", async ({
      page,
    }) => {
      // Log out
      await page.getByTestId("logout").click();
      await createPostWithLoggedInUser();
      await loginUser(page, "postuser", "password");

      // click "view" button
      await page.getByRole("button", { name: "view" }).click();

      // click "delete" button
      expect(await page.getByRole("button", { name: "remove" }).isVisible());
    });
  });
});
