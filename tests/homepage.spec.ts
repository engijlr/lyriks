import { test, expect } from "@playwright/test";

test("logos render", async ({ page, viewport }) => {
  await page.goto("http://localhost:3000/");

  if (viewport?.width && viewport?.width <= 768) {
    await page.getByTestId("hamburger-menu").click();

    await expect(page.getByTestId("logo-mobile")).toBeVisible();
  } else {
    await expect(page.getByAltText("logo").first()).toBeVisible();
  }
});

test("Discover genre text", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("combobox").click();

  const optionValueToSelect = "Latin";
  await page.getByRole("combobox").selectOption(optionValueToSelect);

  page.getByRole("heading", { name: "Discover Latin" });
});
