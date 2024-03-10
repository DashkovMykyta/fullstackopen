// @ts-ignore
import { test, expect, beforeEach, describe } from "@playwright/test";
// const baseURL = "http://localhost:5173";

describe("Blogs app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await page.goto(`/`);
    await registerUser(page);
  });

  test("login form is visible", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    const loginForm = page.getByText("Login");
    await expect(loginForm).toBeVisible();
  });

  test("user cannot login with wrong credentials", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await page.fill('input[name="username"]', "qweeeeeeee");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.getByRole("button", { name: "submit" }).click();
    const error = await page.locator(".error");
    await expect(error).toContainText("Wrong username or password");
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginUser(page);
    });

    test("app has title", async ({ page }) => {
      const title = page.getByText("My app");
      await expect(title).toBeVisible();
    });

    test("user can login", async ({ page }) => {
      const welcomeMessage = page.getByText("hellowmuuu logged in");
      await expect(welcomeMessage).toBeVisible();
    });

    test("user can create a blog", async ({ page }) => {
      await createBlog(page, "test title");

      const blog = page.getByText("test title");
      await expect(blog).toBeVisible();
    });

    test("user can like a blog", async ({ page }) => {
      await createBlog(page, "test like");
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();
      const likes = page.getByText("likes 1");
      await expect(likes).toBeVisible();
    });

    test("user can delete a blog", async ({ page }) => {
      await createBlog(page, "test delete");
      await page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("confirm");
        expect(dialog.message()).toContain("Remove blog");
        await dialog.accept();
      });
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "remove" }).click();
      await expect(page.locator('text="test delete"')).toHaveCount(0);
    });

    test("most liked blog is at the top", async ({ page }) => {
      await createBlog(page, "test 1");
      await createBlog(page, "test 2");
      await createBlog(page, "test 3");
      await page.getByRole("button", { name: "view" }).first().click();
      await page.getByRole("button", { name: "like" }).first().click();
      await page.getByRole("button", { name: "view" }).last().click();
      await page.getByRole("button", { name: "like" }).last().click();
      await page.getByRole("button", { name: "view" }).last().click();
      await page.getByRole("button", { name: "like" }).last().click();
      await page.reload();
      await page.getByRole("button", { name: "view" }).first().click();
      const likes = await page.getByText("likes 2");
      await expect(likes).toBeVisible();
    });
  });
});

//? Helper functions

const loginUser = async (page) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page.fill('input[name="username"]', "hellowmuuu");
  await page.fill('input[name="password"]', "hellowmuuu");
  await page.getByRole("button", { name: "submit" }).click();
};

const registerUser = async (page) => {
  await page.getByRole("button", { name: "Register" }).click();
  await page.fill('input[name="username"]', "hellowmuuu");
  await page.fill('input[name="name"]', "hellowmuuu");
  await page.fill('input[name="password"]', "hellowmuuu");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Close" }).click();
};

const createBlog = async (page, name) => {
  await page.getByRole("button", { name: "Create New" }).click();
  await page.fill('input[name="title"]', name);
  await page.fill('input[name="url"]', name);
  await page.fill('input[name="author"]', name);
  await page.getByRole("button", { name: "submit" }).click();
  await page.getByRole("button", { name: "close" }).click();
};
