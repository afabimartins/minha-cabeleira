import {
  useEffect,
  useState,
} from "react";

export type AnalyticsConsent =
  | "granted"
  | "denied"
  | "unset";

const ANALYTICS_CONSENT_STORAGE_KEY =
  "minha-cabeleira-analytics-consent-v1";

const ANALYTICS_CONSENT_CHANGE_EVENT =
  "minha-cabeleira:analytics-consent-change";

const PRIVACY_SETTINGS_OPEN_EVENT =
  "minha-cabeleira:privacy-settings-open";

function readStoredAnalyticsConsent(): AnalyticsConsent {
  if (
    typeof window === "undefined"
  ) {
    return "unset";
  }

  try {
    const stored =
      window.localStorage.getItem(
        ANALYTICS_CONSENT_STORAGE_KEY,
      );

    if (
      stored === "granted" ||
      stored === "denied"
    ) {
      return stored;
    }
  } catch {
    // Se o navegador bloquear localStorage,
    // a preferência continua funcionando
    // durante a sessão atual.
  }

  return "unset";
}

export function setAnalyticsConsent(
  consent: Exclude<
    AnalyticsConsent,
    "unset"
  >,
) {
  try {
    window.localStorage.setItem(
      ANALYTICS_CONSENT_STORAGE_KEY,
      consent,
    );
  } catch {
    // O evento abaixo ainda atualiza
    // a interface da sessão atual.
  }

  window.dispatchEvent(
    new CustomEvent<AnalyticsConsent>(
      ANALYTICS_CONSENT_CHANGE_EVENT,
      {
        detail: consent,
      },
    ),
  );
}

export function openPrivacySettings() {
  window.dispatchEvent(
    new Event(
      PRIVACY_SETTINGS_OPEN_EVENT,
    ),
  );
}

export function useAnalyticsConsent() {
  const [
    consent,
    setConsent,
  ] = useState<AnalyticsConsent>(
    readStoredAnalyticsConsent,
  );

  useEffect(() => {
    function handleConsentChange(
      event: Event,
    ) {
      const customEvent =
        event as CustomEvent<AnalyticsConsent>;

      if (
        customEvent.detail ===
          "granted" ||
        customEvent.detail ===
          "denied"
      ) {
        setConsent(
          customEvent.detail,
        );

        return;
      }

      setConsent(
        readStoredAnalyticsConsent(),
      );
    }

    function handleStorage(
      event: StorageEvent,
    ) {
      if (
        event.key !==
        ANALYTICS_CONSENT_STORAGE_KEY
      ) {
        return;
      }

      setConsent(
        readStoredAnalyticsConsent(),
      );
    }

    window.addEventListener(
      ANALYTICS_CONSENT_CHANGE_EVENT,
      handleConsentChange,
    );

    window.addEventListener(
      "storage",
      handleStorage,
    );

    return () => {
      window.removeEventListener(
        ANALYTICS_CONSENT_CHANGE_EVENT,
        handleConsentChange,
      );

      window.removeEventListener(
        "storage",
        handleStorage,
      );
    };
  }, []);

  return consent;
}

export function PrivacyConsentManager() {
  const consent =
    useAnalyticsConsent();

  const [
    settingsOpen,
    setSettingsOpen,
  ] = useState(false);

  useEffect(() => {
    function handleOpenSettings() {
      setSettingsOpen(true);
    }

    window.addEventListener(
      PRIVACY_SETTINGS_OPEN_EVENT,
      handleOpenSettings,
    );

    return () => {
      window.removeEventListener(
        PRIVACY_SETTINGS_OPEN_EVENT,
        handleOpenSettings,
      );
    };
  }, []);

  const visible =
    consent === "unset" ||
    settingsOpen;

  if (!visible) {
    return null;
  }

  function chooseConsent(
    nextConsent: "granted" | "denied",
  ) {
    setAnalyticsConsent(
      nextConsent,
    );

    setSettingsOpen(false);
  }

  function closeSettings() {
    if (consent === "unset") {
      return;
    }

    setSettingsOpen(false);
  }

  return (
    <div
      className="privacy-consent"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-consent-title"
      aria-describedby="privacy-consent-description"
    >
      <div className="privacy-consent__panel">
        {consent !== "unset" ? (
          <button
            className="privacy-consent__close"
            type="button"
            onClick={
              closeSettings
            }
            aria-label="Fechar configurações de privacidade"
          >
            ×
          </button>
        ) : null}

        <div className="privacy-consent__content">
          <p className="privacy-consent__eyebrow">
            Privacidade
          </p>

          <h2 id="privacy-consent-title">
            Analytics sob sua escolha
          </h2>

          <p
            id="privacy-consent-description"
          >
            O Minha Cabeleira pode
            usar o Google Analytics
            para medir visitas e o
            uso das páginas. O
            Analytics só é carregado
            se você aceitar.
          </p>

          <p>
            As respostas do
            questionário e o
            conteúdo da sua análise
            não são enviados ao
            Google Analytics.
          </p>

          {consent !== "unset" ? (
            <p className="privacy-consent__status">
              Preferência atual:{" "}
              <strong>
                {consent ===
                "granted"
                  ? "Analytics aceito"
                  : "Analytics recusado"}
              </strong>
              .
            </p>
          ) : null}
        </div>

        <div className="privacy-consent__actions">
          <button
            className="privacy-consent__button privacy-consent__button--secondary"
            type="button"
            onClick={() =>
              chooseConsent(
                "denied",
              )
            }
          >
            Recusar analytics
          </button>

          <button
            className="privacy-consent__button privacy-consent__button--primary"
            type="button"
            onClick={() =>
              chooseConsent(
                "granted",
              )
            }
          >
            Aceitar analytics
          </button>
        </div>
      </div>
    </div>
  );
}