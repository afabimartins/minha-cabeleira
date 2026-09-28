import {
  useEffect,
  useRef,
} from "react";

declare global {
  interface Window {
    adsbygoogle?: Array<
      Record<string, unknown>
    >;
  }
}

const ADSENSE_SCRIPT_ID =
  "minha-cabeleira-adsense";

const adsenseEnabled =
  import.meta.env
    .VITE_ADSENSE_ENABLED ===
  "true";

const adsensePreview =
  import.meta.env
    .VITE_ADSENSE_PREVIEW ===
  "true";

export const adsenseClient =
  (
    import.meta.env
      .VITE_ADSENSE_CLIENT ?? ""
  ).trim();

export const adsenseConfigured =
  adsenseEnabled &&
  /^ca-pub-\d+$/.test(
    adsenseClient,
  );

export const adSlots = {
  homeContent:
    (
      import.meta.env
        .VITE_ADSENSE_SLOT_HOME_CONTENT ??
      ""
    ).trim(),

  glossaryList:
    (
      import.meta.env
        .VITE_ADSENSE_SLOT_GLOSSARY_LIST ??
      ""
    ).trim(),

  glossaryEntry:
    (
      import.meta.env
        .VITE_ADSENSE_SLOT_GLOSSARY_ENTRY ??
      ""
    ).trim(),

  aboutContent:
    (
      import.meta.env
        .VITE_ADSENSE_SLOT_ABOUT_CONTENT ??
      ""
    ).trim(),
} as const;

type AdSenseLoaderProps = {
  active: boolean;
};

export function AdSenseLoader({
  active,
}: AdSenseLoaderProps) {
  useEffect(() => {
    if (
      !active ||
      !adsenseConfigured ||
      import.meta.env.DEV
    ) {
      return;
    }

    if (
      document.getElementById(
        ADSENSE_SCRIPT_ID,
      )
    ) {
      return;
    }

    const script =
      document.createElement(
        "script",
      );

    script.id =
      ADSENSE_SCRIPT_ID;
    script.async = true;
    script.crossOrigin =
      "anonymous";
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
      encodeURIComponent(
        adsenseClient,
      );

    document.head.appendChild(
      script,
    );
  }, [active]);

  return null;
}

type AdSlotProps = {
  slot: string;
  placement: string;
};

export function AdSlot({
  slot,
  placement,
}: AdSlotProps) {
  const initialized =
    useRef(false);

  const showPreview =
    import.meta.env.DEV &&
    adsensePreview;

  const showRealAd =
    import.meta.env.PROD &&
    adsenseConfigured &&
    Boolean(slot);

  useEffect(() => {
    if (
      !showRealAd ||
      initialized.current
    ) {
      return;
    }

    initialized.current = true;

    try {
      window.adsbygoogle =
        window.adsbygoogle ?? [];

      window.adsbygoogle.push(
        {},
      );
    } catch {
      // Falha de anúncio nunca deve quebrar
      // o conteúdo principal do site.
    }
  }, [
    showRealAd,
    slot,
  ]);

  if (
    !showPreview &&
    !showRealAd
  ) {
    return null;
  }

  return (
    <aside
      className="ad-slot"
      aria-label="Publicidade"
      data-ad-placement={
        placement
      }
    >
      <span className="ad-slot__label">
        Publicidade
      </span>

      {showPreview ? (
        <div className="ad-slot__preview">
          <strong>
            Prévia de anúncio
          </strong>
          <small>
            Este espaço só exibe
            AdSense real em produção,
            quando o bloco estiver
            configurado.
          </small>
        </div>
      ) : (
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
          }}
          data-ad-client={
            adsenseClient
          }
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </aside>
  );
}
