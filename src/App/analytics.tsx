import {
  useEffect,
} from "react";

import {
  useAnalyticsConsent,
} from "./privacy-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      ...args: unknown[]
    ) => void;
  }
}

const ANALYTICS_SCRIPT_ID =
  "minha-cabeleira-google-analytics";

export const analyticsMeasurementId =
  (
    import.meta.env
      .VITE_GA_MEASUREMENT_ID ??
    ""
  ).trim();

export const analyticsConfigured =
  /^G-[A-Z0-9]+$/i.test(
    analyticsMeasurementId,
  );

function getDisableKey() {
  return `ga-disable-${analyticsMeasurementId}`;
}

function setAnalyticsDisabled(
  disabled: boolean,
) {
  if (!analyticsConfigured) {
    return;
  }

  const runtimeWindow =
    window as unknown as Record<
      string,
      unknown
    >;

  runtimeWindow[
    getDisableKey()
  ] = disabled;
}

function ensureGtag() {
  window.dataLayer =
    window.dataLayer ?? [];

  if (window.gtag) {
    return;
  }

  window.gtag = function gtag(
    ..._args: unknown[]
  ) {
    window.dataLayer?.push(
      arguments,
    );
  };
}

function loadAnalyticsScript() {
  if (
    document.getElementById(
      ANALYTICS_SCRIPT_ID,
    )
  ) {
    return;
  }

  const script =
    document.createElement(
      "script",
    );

  script.id =
    ANALYTICS_SCRIPT_ID;

  script.async = true;

  script.src =
    "https://www.googletagmanager.com/gtag/js?id=" +
    encodeURIComponent(
      analyticsMeasurementId,
    );

  document.head.appendChild(
    script,
  );
}

function clearAnalyticsCookies() {
  const cookieNames =
    document.cookie
      .split(";")
      .map((cookie) =>
        cookie
          .split("=")[0]
          ?.trim(),
      )
      .filter(
        (
          name,
        ): name is string =>
          Boolean(name) &&
          (name === "_ga" ||
            name.startsWith(
              "_ga_",
            )),
      );

  for (const name of cookieNames) {
    document.cookie =
      `${name}=; Max-Age=0; path=/; SameSite=Lax`;

    document.cookie =
      `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}; SameSite=Lax`;

    document.cookie =
      `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
  }
}

export function AnalyticsLoader() {
  const consent =
    useAnalyticsConsent();

  useEffect(() => {
    if (
      !analyticsConfigured ||
      import.meta.env.DEV
    ) {
      return;
    }

    if (
      consent !== "granted"
    ) {
      setAnalyticsDisabled(
        true,
      );

      if (
        consent === "denied"
      ) {
        clearAnalyticsCookies();
      }

      return;
    }

    setAnalyticsDisabled(
      false,
    );

    ensureGtag();
    loadAnalyticsScript();

    window.gtag?.(
      "js",
      new Date(),
    );

    window.gtag?.(
      "config",
      analyticsMeasurementId,
      {
        allow_google_signals:
          false,
        allow_ad_personalization_signals:
          false,
      },
    );
  }, [consent]);

  return null;
}