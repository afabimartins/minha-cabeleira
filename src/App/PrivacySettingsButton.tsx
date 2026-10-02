import {
  openPrivacySettings,
} from "./privacy-consent";

export function PrivacySettingsButton() {
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
    </span>
  );
}