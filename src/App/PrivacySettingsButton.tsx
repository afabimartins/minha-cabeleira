import {
  useState,
} from "react";

import {
  adsenseConfigured,
} from "./adsense";

declare global {
  interface Window {
    googlefc?: {
      callbackQueue?: Array<
        () => void
      >;
      showRevocationMessage?: () => void;
    };
  }
}

export function PrivacySettingsButton() {
  const [
    feedback,
    setFeedback,
  ] = useState("");

  if (!adsenseConfigured) {
    return null;
  }

  function openPrivacySettings() {
    const googlefc =
      window.googlefc;

    if (
      googlefc
        ?.callbackQueue &&
      googlefc
        .showRevocationMessage
    ) {
      googlefc.callbackQueue.push(
        googlefc
          .showRevocationMessage,
      );

      setFeedback("");
      return;
    }

    setFeedback(
      "As configurações do Google ainda não estão disponíveis nesta página. Tente novamente depois que a mensagem de privacidade do AdSense estiver ativa.",
    );
  }

  return (
    <span className="privacy-settings">
      <button
        className="privacy-settings__button"
        type="button"
        onClick={
          openPrivacySettings
        }
      >
        Configurações de privacidade e cookies
      </button>

      {feedback ? (
        <small
          className="privacy-settings__feedback"
          role="status"
        >
          {feedback}
        </small>
      ) : null}
    </span>
  );
}
