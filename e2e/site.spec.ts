import { expect, test, type Page } from "@playwright/test";

async function selectOption(page: Page, optionIndex = 0) {
  const radio = page.getByRole("radio").nth(optionIndex);

  await radio.focus();
  await page.keyboard.press("Space");
  await expect(radio).toBeChecked();
}

async function mockPublicProductCatalog(page: Page) {
  await page.route("**/rest/v1/products*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "[]",
    });
  });
}

test.describe("Minha Cabeleira — fluxo público", () => {
  test("Home, Glossário e Privacidade carregam com SEO básico", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Entenda seu cabelo/i,
      }),
    ).toBeVisible();

    await expect(page).toHaveTitle(/Minha Cabeleira/);

    await page.goto("/glossario");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Entenda os ativos/i,
      }),
    ).toBeVisible();

    const search = page.getByRole("searchbox");
    await search.fill("porosidade");

    await expect(
      page.getByText("Porosidade capilar", { exact: true }),
    ).toBeVisible();

    await page.goto("/privacidade");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Informação clara/i,
      }),
    ).toBeVisible();

    await expect(page).toHaveTitle(/Privacidade e cookies/);
  });

  test("Questionário permanece sem espaços manuais de anúncio", async ({ page }) => {
    await page.goto("/analise");

    await expect(page.locator(".ad-slot")).toHaveCount(0);

    await selectOption(page, 0);

    await page
      .getByRole("button", { name: /Continuar/ })
      .click();

    await expect(page.getByText(/02 \/ 20/)).toBeVisible();
    await expect(page.locator(".ad-slot")).toHaveCount(0);
  });

  test("Análise completa gera resultado e download de PDF", async ({ page }) => {
    await mockPublicProductCatalog(page);
    await page.goto("/analise");

    const optionIndexes = [
      0, // 01 post_wash_roughness: low
      0, // 02 wet_tangling: low
      0, // 03 conditioning_improvement: low
      2, // 04 breakage: high
      0, // 05 wetting_speed: fast
      0, // 06 drying_speed: fast
      0, // 07 water_retention: low
      0, // 08 chemical_processing: low
      0, // 09 heat_exposure: low
      3, // 10 damage_history: severe
      0, // 11 scalp_sensitivity: none
      0, // 12 scalp_burning: none
      0, // 13 scalp_wound: none
      0, // 14 sudden_hair_loss: none
      0, // 15 wash_frequency: rarely
      0, // 16 conditioning_frequency: rarely
      0, // 17 styling_frequency: rarely
      0, // 18 primary_goal: reduce_breakage
      1, // 19 routine_complexity: balanced
      0, // 20 budget_priority: lowest_price
    ];

    for (let index = 0; index < optionIndexes.length; index += 1) {
      await selectOption(page, optionIndexes[index]);

      if (index < optionIndexes.length - 1) {
        await page
          .getByRole("button", { name: /Continuar/ })
          .click();
      } else {
        await page
          .getByRole("button", { name: /Ver minha análise/ })
          .click();
      }
    }

    await expect(
      page.getByText("Análise concluída", { exact: true }),
    ).toBeVisible({ timeout: 20_000 });

    const downloadButton = page.getByRole("button", {
      name: /Baixar resultado em PDF/i,
    });

    await expect(downloadButton).toBeVisible();
    await expect(page.locator(".ad-slot")).toHaveCount(0);

    const downloadPromise = page.waitForEvent("download");
    await downloadButton.click();

    const download = await downloadPromise;

    expect(
      download.suggestedFilename().toLowerCase(),
    ).toContain(".pdf");
  });

  test("não cria rolagem horizontal relevante no mobile", async ({ page }) => {
    await page.goto("/");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );

    expect(overflow).toBeLessThanOrEqual(2);
  });
});
