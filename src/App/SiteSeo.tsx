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

const DEFAULT_TITLE =
  "Minha Cabeleira | Análise capilar sem rótulos";

const DEFAULT_DESCRIPTION =
  "Análise capilar personalizada, glossário técnico e orientações organizadas por sinais, rotina e objetivos — sem reduzir o cabelo a rótulos.";

function glossarySlugFromPath(
  pathname: string,
): string | null {
  const prefix =
    "/glossario/";

  if (
    !pathname.startsWith(
      prefix,
    )
  ) {
    return null;
  }

  return (
    pathname
      .slice(prefix.length)
      .split("/")[0] || null
  );
}

function getSeoData(
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
        "Responda 22 perguntas sobre sinais, rotina e objetivos e receba uma análise capilar organizada sem rótulos de curvatura.",
    };
  }

  if (
    pathname === "/glossario"
  ) {
    return {
      title:
        "Glossário de cabelo e cosméticos | Minha Cabeleira",
      description:
        "Consulte ingredientes, nomes INCI e conceitos de cuidados capilares com função, limitações, termos relacionados e referências.",
    };
  }

  const glossarySlug =
    glossarySlugFromPath(
      pathname,
    );

  if (glossarySlug) {
    const entry =
      getGlossaryEntry(
        glossarySlug,
      );

    if (entry) {
      return {
        title:
          `${entry.name} | Glossário Minha Cabeleira`,
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

  if (
    pathname ===
    "/privacidade"
  ) {
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
      "noindex,nofollow",
  };
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

export function SiteSeo({
  pathname,
}: SiteSeoProps) {
  useEffect(() => {
    const data =
      getSeoData(pathname);

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

    const rawSiteUrl =
      (
        import.meta.env
          .VITE_SITE_URL ??
        ""
      )
        .trim()
        .replace(/\/+$/, "");

    let canonical =
      document.querySelector(
        'link[rel="canonical"]',
      ) as HTMLLinkElement | null;

    if (rawSiteUrl) {
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
        `${rawSiteUrl}${
          pathname === "/"
            ? ""
            : pathname
        }`;

      upsertMeta(
        'meta[property="og:url"]',
        "property",
        "og:url",
        canonical.href,
      );
    } else if (canonical) {
      canonical.remove();
    }
  }, [pathname]);

  return null;
}
