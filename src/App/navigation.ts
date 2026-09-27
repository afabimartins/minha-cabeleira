import {
  useEffect,
  useState,
} from "react";

const NAVIGATION_EVENT =
  "minha-cabeleira:navigation";

export function navigateTo(
  path: string,
) {
  if (window.location.pathname === path) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return;
  }

  window.history.pushState(
    {},
    "",
    path,
  );

  window.dispatchEvent(
    new Event(NAVIGATION_EVENT),
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function usePathname(): string {
  const [pathname, setPathname] =
    useState(
      window.location.pathname,
    );

  useEffect(() => {
    function updatePathname() {
      setPathname(
        window.location.pathname,
      );
    }

    window.addEventListener(
      "popstate",
      updatePathname,
    );

    window.addEventListener(
      NAVIGATION_EVENT,
      updatePathname,
    );

    return () => {
      window.removeEventListener(
        "popstate",
        updatePathname,
      );

      window.removeEventListener(
        NAVIGATION_EVENT,
        updatePathname,
      );
    };
  }, []);

  return pathname;
}
