import {
  describe,
  expect,
  it,
} from "vitest";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  getSeoData,
  SITE_URL,
} from "./SiteSeo";

describe("SiteSeo", () => {
  it("uses the production site URL as the canonical base", () => {
    expect(SITE_URL).toBe(
      "https://minhacabeleira.com.br",
    );
  });

  it("defines indexable SEO for the home page", () => {
    expect(getSeoData("/")).toEqual({
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    });
  });

  it("defines specific SEO for public pages", () => {
    expect(
      getSeoData("/analise").title,
    ).toBe(
      "Análise capilar personalizada | Minha Cabeleira",
    );

    expect(
      getSeoData("/glossario").title,
    ).toBe(
      "Glossário de cabelo e cosméticos | Minha Cabeleira",
    );

    expect(
      getSeoData("/metodologia").title,
    ).toBe(
      "Metodologia da análise capilar | Minha Cabeleira",
    );
  });

  it("uses the glossary entry in an ingredient page title", () => {
    const data = getSeoData(
      "/glossario/glycerin",
    );

    expect(data.title).toBe(
      "Glycerin | Glossário Minha Cabeleira",
    );
    expect(data.description).toContain(
      "Umectante",
    );
  });

  it("keeps the admin route out of search results", () => {
    expect(
      getSeoData("/admin").robots,
    ).toBe(
      "noindex,nofollow,noarchive",
    );
  });

  it("keeps unknown routes out of search results", () => {
    expect(
      getSeoData("/nao-existe").robots,
    ).toBe(
      "noindex,nofollow,noarchive",
    );
  });
});
