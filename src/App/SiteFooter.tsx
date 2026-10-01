import {
  BrandMark,
} from "./BrandMark";

import {
  InternalLink,
} from "./InternalLink";

import {
  PrivacySettingsButton,
} from "./PrivacySettingsButton";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <BrandMark className="site-footer__mark" compact />
          <div>
            <strong>Minha Cabeleira</strong>
            <p>
              Informação para cuidar do cabelo com mais contexto e menos rótulos.
            </p>
          </div>
        </div>

        <div className="site-footer__links">
          <InternalLink to="/analise">
            Fazer análise
          </InternalLink>
          <InternalLink to="/glossario">
            Glossário
          </InternalLink>
          <InternalLink to="/sobre">
            Sobre
          </InternalLink>

          <InternalLink to="/metodologia">
            Metodologia
          </InternalLink>

          <InternalLink to="/termos">
            Termos
          </InternalLink>

          <InternalLink to="/transparencia">
            Transparência
          </InternalLink>

          <InternalLink to="/privacidade">
            Privacidade
          </InternalLink>

          <PrivacySettingsButton />
        </div>

        <p className="site-footer__note">
          Conteúdo informativo. Não substitui avaliação profissional quando houver sinais de saúde que mereçam investigação.
        </p>
      </div>
    </footer>
  );
}
