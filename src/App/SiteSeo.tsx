import {
  useEffect,
} from "react";

import {
  getGlossaryEntry,
} from "./glossary-data";

type SiteSeoProps = {
  pathname: string;
};

type SeoData = {
  title: string;
  description: string;
  robots?: string;
};

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ??
  "https://minhacabeleira.com.br"
)
  .trim()
  .replace(/\/+$/, "");

export const DEFAULT_TITLE =
  "Minha Cabeleira | Análise capilar sem rótulos";

export const DEFAULT_DESCRIPTION =
  "Análise capilar personalizada, glossário técnico e orientações organizadas por sinais, rotina e objetivos — sem reduzir o cabelo a rótulos.";

const OG_IMAGE_URL =
  `${SITE_URL}/og-image.jpg`;

const OG_IMAGE_ALT =
  "Fotografia de cabelo usada na identidade visual do Minha Cabeleira";

function glossarySlugFromPath(
  pathname: string,
): string | null {
  const prefix = "/glossario/";

  if (!pathname.startsWith(prefix)) {
    return null;
  }

  return (
    pathname
      .slice(prefix.length)
      .split("/")[0] || null
  );
}

function cleanGlossaryEntryName(
  name: string,
): string {
  return name
    .trim()
    .replace(/\s*\|+\s*$/, "")
    .trim();
}

export function getSeoData(
  pathname: string,
): SeoData {
  if (pathname === "/") {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    };
  }

  if (pathname === "/analise") {
    return {
      title:
        "Análise capilar personalizada | Minha Cabeleira",
      description:
        "Responda perguntas sobre sinais, rotina e objetivos e receba uma análise capilar organizada sem rótulos de curvatura.",
    };
  }

  if (pathname === "/glossario") {
    return {
      title:
        "Glossário de cabelo e cosméticos | Minha Cabeleira",
      description:
        "Consulte ingredientes, nomes INCI e conceitos de cuidados capilares com função, limitações, termos relacionados e referências.",
    };
  }

  const glossarySlug =
    glossarySlugFromPath(pathname);

  if (glossarySlug) {
    const entry =
      getGlossaryEntry(glossarySlug);

    if (entry) {
      const entryName =
        cleanGlossaryEntryName(
          entry.inciName ?? entry.name,
        );

      return {
        title:
          `${entryName} | Glossário Minha Cabeleira`,
        description:
          entry.summary,
      };
    }
  }

  if (pathname === "/sobre") {
    return {
      title:
        "Sobre o Minha Cabeleira | Cuidado sem rótulos",
      description:
        "Conheça os princípios do Minha Cabeleira: necessidades primeiro, fórmula antes da marca e fontes técnicas visíveis.",
    };
  }

  if (pathname === "/metodologia") {
    return {
      title:
        "Metodologia da análise capilar | Minha Cabeleira",
      description:
        "Entenda como o Minha Cabeleira transforma respostas do questionário em sinais, prioridades, orientações de fórmula e produtos compatíveis.",
    };
  }

  if (pathname === "/termos") {
    return {
      title:
        "Termos de uso | Minha Cabeleira",
      description:
        "Consulte os termos de uso do Minha Cabeleira, incluindo limites da análise, uso do conteúdo, produtos, links comerciais e responsabilidades.",
    };
  }

  if (pathname === "/privacidade") {
    return {
      title:
        "Privacidade e cookies | Minha Cabeleira",
      description:
        "Veja como o Minha Cabeleira trata respostas da análise, catálogo, publicidade do Google AdSense, cookies e preferências de privacidade.",
    };
  }

  if (pathname === "/admin") {
    return {
      title:
        "Administração | Minha Cabeleira",
      description:
        "Área administrativa do Minha Cabeleira.",
      robots:
        "noindex,nofollow,noarchive",
    };
  }

  return {
    title:
      "Página não encontrada | Minha Cabeleira",
    description:
      "O endereço acessado não corresponde a uma página disponível no Minha Cabeleira.",
    robots:
      "noindex,nofollow,noarchive",
  };
}

function getCanonicalUrl(
  pathname: string,
): string {
  return `${SITE_URL}${
    pathname === "/" ? "" : pathname
  }`;
}

function upsertMeta(
  selector: string,
  attributeName:
    | "name"
    | "property",
  attributeValue: string,
  content: string,
) {
  let element =
    document.querySelector(
      selector,
    ) as HTMLMetaElement | null;

  if (!element) {
    element =
      document.createElement(
        "meta",
      );

    element.setAttribute(
      attributeName,
      attributeValue,
    );

    document.head.appendChild(
      element,
    );
  }

  element.content = content;
}

function upsertJsonLd(
  pathname: string,
  data: SeoData,
  canonicalUrl: string,
) {
  const id = "site-jsonld";
  let script =
    document.getElementById(id) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  const payload = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.title,
    description: data.description,
    url: canonicalUrl,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: "Minha Cabeleira",
      url: SITE_URL,
    },
    ...(pathname.startsWith("/glossario/")
      ? {
          about: {
            "@type": "Thing",
            name: data.title.replace(
              " | Glossário Minha Cabeleira",
              "",
            ),
          },
        }
      : {}),
  };

  script.textContent = JSON.stringify(payload);
}

export function SiteSeo({
  pathname,
}: SiteSeoProps) {
  useEffect(() => {
    const data =
      getSeoData(pathname);
    const canonicalUrl =
      getCanonicalUrl(pathname);

    document.documentElement.lang =
      "pt-BR";

    document.title =
      data.title;

    upsertMeta(
      'meta[name="description"]',
      "name",
      "description",
      data.description,
    );

    upsertMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      data.robots ??
        "index,follow",
    );

    upsertMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      data.title,
    );

    upsertMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      data.description,
    );

    upsertMeta(
      'meta[property="og:type"]',
      "property",
      "og:type",
      "website",
    );

    upsertMeta(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name",
      "Minha Cabeleira",
    );

    upsertMeta(
      'meta[property="og:locale"]',
      "property",
      "og:locale",
      "pt_BR",
    );

    upsertMeta(
      'meta[property="og:url"]',
      "property",
      "og:url",
      canonicalUrl,
    );

    upsertMeta(
      'meta[property="og:image"]',
      "property",
      "og:image",
      OG_IMAGE_URL,
    );

    upsertMeta(
      'meta[property="og:image:alt"]',
      "property",
      "og:image:alt",
      OG_IMAGE_ALT,
    );

    upsertMeta(
      'meta[property="og:image:width"]',
      "property",
      "og:image:width",
      "1200",
    );

    upsertMeta(
      'meta[property="og:image:height"]',
      "property",
      "og:image:height",
      "630",
    );

    upsertMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image",
    );

    upsertMeta(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      data.title,
    );

    upsertMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      data.description,
    );

    upsertMeta(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image",
      OG_IMAGE_URL,
    );

    let canonical =
      document.querySelector(
        'link[rel="canonical"]',
      ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical =
        document.createElement(
          "link",
        );

      canonical.rel =
        "canonical";

      document.head.appendChild(
        canonical,
      );
    }

    canonical.href =
      canonicalUrl;

    upsertJsonLd(
      pathname,
      data,
      canonicalUrl,
    );
  }, [pathname]);

  return null;
}