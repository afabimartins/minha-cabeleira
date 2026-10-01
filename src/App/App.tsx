import {
  AboutPage,
} from "./AboutPage";

import {
  AdminPage,
} from "./AdminPage";

import {
  AnalysisPage,
} from "./AnalysisPage";

import {
  GlossaryEntryPage,
} from "./GlossaryEntryPage";

import {
  GlossaryPage,
} from "./GlossaryPage";

import {
  HomePage,
} from "./HomePage";

import {
  MethodologyPage,
} from "./MethodologyPage";

import {
  NotFoundPage,
} from "./NotFoundPage";

import {
  getGlossaryEntry,
} from "./glossary-data";

import {
  SiteFooter,
} from "./SiteFooter";

import {
  AdSenseLoader,
} from "./adsense";

import {
  PrivacyPage,
} from "./PrivacyPage";

import {
  SiteSeo,
} from "./SiteSeo";

import {
  TermsPage,
} from "./TermsPage";

import {
  TransparencyPage,
} from "./TransparencyPage";

import {
  SiteHeader,
} from "./SiteHeader";

import {
  usePathname,
} from "./navigation";

function getGlossarySlugFromPath(
  pathname: string,
): string | null {
  const prefix = "/glossario/";

  if (!pathname.startsWith(prefix)) {
    return null;
  }

  const slug = pathname
    .slice(prefix.length)
    .split("/")[0];

  return slug || null;
}

function pageCanLoadAds(
  pathname: string,
): boolean {
  return (
    pathname === "/" ||
    pathname === "/sobre" ||
    pathname === "/privacidade" ||
    pathname === "/metodologia" ||
    pathname === "/transparencia" ||
    pathname === "/glossario" ||
    pathname.startsWith(
      "/glossario/",
    )
  );
}

export function App() {
  const pathname = usePathname();
  const glossarySlug =
    getGlossarySlugFromPath(
      pathname,
    );

  let page = <NotFoundPage />;

  if (pathname === "/") {
    page = <HomePage />;
  } else if (pathname === "/analise") {
    page = <AnalysisPage />;
  } else if (
    pathname === "/glossario"
  ) {
    page = <GlossaryPage />;
  } else if (
    glossarySlug &&
    getGlossaryEntry(glossarySlug)
  ) {
    page = (
      <GlossaryEntryPage
        slug={glossarySlug}
      />
    );
  } else if (pathname === "/sobre") {
    page = <AboutPage />;
  } else if (pathname === "/metodologia") {
    page = <MethodologyPage />;
  } else if (pathname === "/termos") {
    page = <TermsPage />;
  } else if (pathname === "/transparencia") {
    page = <TransparencyPage />;
  } else if (
    pathname ===
    "/privacidade"
  ) {
    page = <PrivacyPage />;
  } else if (pathname === "/admin") {
    page = <AdminPage />;
  }

  return (
    <div className="app">
      <SiteSeo
        pathname={pathname}
      />

      <AdSenseLoader
        active={pageCanLoadAds(
          pathname,
        )}
      />

      <SiteHeader
        currentPath={pathname}
      />

      {page}

      <SiteFooter />
    </div>
  );
}
