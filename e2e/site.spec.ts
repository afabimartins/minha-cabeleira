import { expect, test, type Page } from "@playwright/test";

async function selectOption(page: Page, optionIndex = 0) {
  const radio = page.getByRole("radio").nth(optionIndex);

  await radio.focus();
  await page.keyboard.press("Space");
  await expect(radio).toBeChecked();
}

async function mockPublicProductCatalog(page: Page) {
  const rows = [
    {
      id: "fixture-shampoo",
      slug: "fixture-shampoo",
      brand: "Fixture",
      name: "Shampoo Hidratação",
      category: "shampoo",
      size: "350 ml",
      image_url: null,
      image_path: null,
      image_source_url: null,
      image_credit: null,
      price: 12.9,
      currency: "BRL",
      retailer: "Fixture",
      product_url: "https://example.com/shampoo",
      price_checked_at: "2026-09-29",
      ingredients_raw: "Glicerol",
      attributes: ["moisture_support"],
      availability: "active",
      source_url: "https://example.com/shampoo",
      verified_at: "2026-09-29",
      link_type: "editorial",
    },
    {
      id: "fixture-conditioner",
      slug: "fixture-conditioner",
      brand: "Fixture",
      name: "Condicionador Hidratação",
      category: "conditioner",
      size: "200 ml",
      image_url: null,
      image_path: null,
      image_source_url: null,
      image_credit: null,
      price: 14.9,
      currency: "BRL",
      retailer: "Fixture",
      product_url: "https://example.com/conditioner",
      price_checked_at: "2026-09-29",
      ingredients_raw: "Glicerol; Álcool cetearílico",
      attributes: ["conditioning", "moisture_support"],
      availability: "active",
      source_url: "https://example.com/conditioner",
      verified_at: "2026-09-29",
      link_type: "editorial",
    },
    {
      id: "fixture-mask",
      slug: "fixture-mask",
      brand: "Fixture",
      name: "Máscara Reparadora",
      category: "mask",
      size: "250 g",
      image_url: null,
      image_path: null,
      image_source_url: null,
      image_credit: null,
      price: 18.9,
      currency: "BRL",
      retailer: "Fixture",
      product_url: "https://example.com/mask",
      price_checked_at: "2026-09-29",
      ingredients_raw: "Glicerol; Proteína hidrolisada",
      attributes: ["conditioning", "moisture_support", "damage_support"],
      availability: "active",
      source_url: "https://example.com/mask",
      verified_at: "2026-09-29",
      link_type: "editorial",
    },
    {
      id: "fixture-leave-in",
      slug: "fixture-leave-in",
      brand: "Fixture",
      name: "Leave-in Protetor",
      category: "leave_in",
      size: "100 ml",
      image_url: null,
      image_path: null,
      image_source_url: null,
      image_credit: null,
      price: 20.9,
      currency: "BRL",
      retailer: "Fixture",
      product_url: "https://example.com/leave-in",
      price_checked_at: "2026-09-29",
      ingredients_raw: "Glicerol; Amodimeticona",
      attributes: ["conditioning", "moisture_support", "damage_support"],
      availability: "active",
      source_url: "https://example.com/leave-in",
      verified_at: "2026-09-29",
      link_type: "editorial",
    },
    {
      id: "fixture-oil",
      slug: "fixture-oil",
      brand: "Fixture",
      name: "Óleo Finalizador",
      category: "oil",
      size: "90 ml",
      image_url: null,
      image_path: null,
      image_source_url: null,
      image_credit: null,
      price: 22.9,
      currency: "BRL",
      retailer: "Fixture",
      product_url: "https://example.com/oil",
      price_checked_at: "2026-09-29",
      ingredients_raw: "Dimeticona; Óleo vegetal",
      attributes: ["conditioning", "moisture_support", "damage_support"],
      availability: "active",
      source_url: "https://example.com/oil",
      verified_at: "2026-09-29",
      link_type: "editorial",
    },
  ];

  await page.route("**/rest/v1/products*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(rows),
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

    await expect(page.getByText(/02 \/ 22/)).toBeVisible();
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
      0, // 11 scalp_oiliness: none
      0, // 12 scalp_dryness: none
      0, // 13 scalp_sensitivity: none
      0, // 14 scalp_burning: none
      0, // 15 scalp_wound: none
      0, // 16 sudden_hair_loss: none
      0, // 17 wash_frequency: rarely
      0, // 18 conditioning_frequency: rarely
      0, // 19 styling_frequency: rarely
      0, // 20 primary_goal: reduce_breakage
      1, // 21 routine_complexity: balanced
      0, // 22 budget_priority: lowest_price
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

    await expect(
      page.getByRole("heading", {
        level: 4,
        name: /Uma indicação por tipo de produto/i,
      }),
    ).toBeVisible();

    for (const category of [
      "Shampoo",
      "Condicionador",
      "Máscara / tratamento",
      "Finalizador / leave-in",
      "Óleo / sérum",
    ]) {
      await expect(
        page.getByText(category, { exact: true }),
      ).toBeVisible();
    }

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
