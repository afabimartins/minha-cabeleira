import {
  useEffect,
  useState,
} from "react";

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

const mobileNavItems = [
  ...navItems,
  { label: "Privacidade", to: "/privacidade" },
];

function isNavItemActive(
  currentPath: string,
  to: string,
): boolean {
  return to === "/"
    ? currentPath === "/"
    : currentPath.startsWith(to);
}

export function SiteHeader({
  currentPath,
}: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [mobileMenuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <InternalLink
          className="site-brand"
          to="/"
          aria-label="Minha Cabeleira — início"
          onClick={() =>
            setMobileMenuOpen(false)
          }
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
              isNavItemActive(
                currentPath,
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
          onClick={() =>
            setMobileMenuOpen(false)
          }
        >
          Fazer minha análise
          <span aria-hidden="true">→</span>
        </InternalLink>

        <button
          className={`site-header__menu-button${
            mobileMenuOpen
              ? " site-header__menu-button--open"
              : ""
          }`}
          type="button"
          aria-label={
            mobileMenuOpen
              ? "Fechar menu"
              : "Abrir menu"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="site-mobile-nav"
          onClick={() =>
            setMobileMenuOpen(
              (open) => !open,
            )
          }
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="site-mobile-nav"
          className={`site-mobile-nav${
            mobileMenuOpen
              ? " site-mobile-nav--open"
              : ""
          }`}
          aria-label="Navegação principal no celular"
        >
          {mobileNavItems.map((item) => {
            const active =
              isNavItemActive(
                currentPath,
                item.to,
              );

            return (
              <InternalLink
                className={`site-mobile-nav__link${
                  active
                    ? " site-mobile-nav__link--active"
                    : ""
                }`}
                to={item.to}
                key={item.to}
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                <span>{item.label}</span>
                <span aria-hidden="true">→</span>
              </InternalLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
