import {
  BrandMark,
} from "./BrandMark";

import {
  InternalLink,
} from "./InternalLink";

type SiteHeaderProps = {
  currentPath: string;
};

const navItems = [
  { label: "Início", to: "/" },
  { label: "Análise", to: "/analise" },
  { label: "Glossário", to: "/glossario" },
  { label: "Sobre", to: "/sobre" },
];

export function SiteHeader({
  currentPath,
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <InternalLink
          className="site-brand"
          to="/"
          aria-label="Minha Cabeleira — início"
        >
          <BrandMark className="site-brand__mark" compact />

          <span className="site-brand__copy">
            <strong>Minha Cabeleira</strong>
            <small>Cuidado sem rótulos</small>
          </span>
        </InternalLink>

        <nav
          className="site-nav"
          aria-label="Navegação principal"
        >
          {navItems.map((item) => {
            const active =
              item.to === "/"
                ? currentPath === "/"
                : currentPath.startsWith(
                    item.to,
                  );

            return (
              <InternalLink
                className={`site-nav__link${
                  active
                    ? " site-nav__link--active"
                    : ""
                }`}
                to={item.to}
                key={item.to}
              >
                {item.label}
              </InternalLink>
            );
          })}
        </nav>

        <InternalLink
          className="site-header__cta"
          to="/analise"
        >
          Fazer minha análise
          <span aria-hidden="true">→</span>
        </InternalLink>
      </div>
    </header>
  );
}
