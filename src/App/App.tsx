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
  SiteFooter,
} from "./SiteFooter";

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

export function App() {
  const pathname = usePathname();
  const glossarySlug =
    getGlossarySlugFromPath(
      pathname,
    );

  let page = <HomePage />;

  if (pathname === "/analise") {
    page = <AnalysisPage />;
  } else if (
    pathname === "/glossario"
  ) {
    page = <GlossaryPage />;
  } else if (glossarySlug) {
    page = (
      <GlossaryEntryPage
        slug={glossarySlug}
      />
    );
  } else if (pathname === "/sobre") {
    page = <AboutPage />;
  } else if (pathname === "/admin") {
    page = <AdminPage />;
  }

  return (
    <div className="app">
      <SiteHeader
        currentPath={pathname}
      />
      {page}
      <SiteFooter />
    </div>
  );
}
