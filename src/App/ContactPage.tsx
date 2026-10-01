import {
  useState,
} from "react";

import {
  InternalLink,
} from "./InternalLink";

const CONTACT_EMAIL =
  "contato@minhacabeleira.com.br";

export function ContactPage() {
  const [
    copyStatus,
    setCopyStatus,
  ] = useState<
    "idle" | "copied" | "error"
  >("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(
        CONTACT_EMAIL,
      );

      setCopyStatus("copied");

      window.setTimeout(
        () => setCopyStatus("idle"),
        2500,
      );
    } catch {
      try {
        const textarea =
          document.createElement(
            "textarea",
          );

        textarea.value = CONTACT_EMAIL;
        textarea.setAttribute(
          "readonly",
          "",
        );

        textarea.style.position =
          "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(
          textarea,
        );

        textarea.select();

        const copied =
          document.execCommand("copy");

        textarea.remove();

        if (!copied) {
          throw new Error(
            "Não foi possível copiar.",
          );
        }

        setCopyStatus("copied");

        window.setTimeout(
          () => setCopyStatus("idle"),
          2500,
        );
      } catch {
        setCopyStatus("error");
      }
    }
  }

  return (
    <main className="privacy-page">
      <header className="privacy-hero">
        <p>Contato</p>

        <h1>
          Um canal direto para dúvidas,
          correções e assuntos sobre o
          Minha Cabeleira.
        </h1>

        <p>
          O contato público do projeto é
          feito por e-mail. Assim, a
          mensagem fica registrada e pode
          ser respondida com o contexto
          necessário, sem exigir cadastro
          ou formulário no site.
        </p>

        <small>
          Canal oficial da versão atual do
          site.
        </small>
      </header>

      <div className="privacy-content">
        <section>
          <span>01</span>
          <div>
            <h2>E-mail de contato</h2>

            <p>
              Para falar com o Minha
              Cabeleira, escreva para{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>

            <p>
              Se o seu navegador não abrir
              um aplicativo de e-mail,
              copie o endereço abaixo e
              cole no serviço de e-mail que
              você usa.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                alignItems: "center",
                marginTop: "16px",
              }}
            >
              <button
                type="button"
                className="button button--secondary"
                onClick={copyEmail}
              >
                {copyStatus === "copied"
                  ? "E-mail copiado"
                  : "Copiar e-mail"}
              </button>

              <span
                role="status"
                aria-live="polite"
              >
                {copyStatus === "copied"
                  ? "✓ Endereço copiado para a área de transferência."
                  : copyStatus === "error"
                    ? `Não foi possível copiar automaticamente. Use: ${CONTACT_EMAIL}`
                    : ""}
              </span>
            </div>

            <p>
              Você pode usar esse endereço
              para dúvidas sobre o
              funcionamento do site,
              sugestões, correções de
              conteúdo, problemas técnicos
              e assuntos gerais
              relacionados ao projeto.
            </p>
          </div>
        </section>

        <section>
          <span>02</span>
          <div>
            <h2>
              Dúvidas sobre análise e
              conteúdo
            </h2>

            <p>
              Se a dúvida for sobre como a
              análise é construída,
              consulte também a página de{" "}
              <InternalLink to="/metodologia">
                Metodologia
              </InternalLink>
              .
            </p>

            <p>
              Para apontar uma correção em
              uma entrada do glossário,
              ingrediente, referência ou
              texto técnico, informe na
              mensagem qual página você
              consultou e, se possível, o
              trecho que precisa ser
              revisado.
            </p>
          </div>
        </section>

        <section>
          <span>03</span>
          <div>
            <h2>Privacidade e dados</h2>

            <p>
              Dúvidas relacionadas a
              cookies, publicidade,
              respostas do questionário ou
              tratamento de dados também
              podem ser enviadas para o
              mesmo endereço de contato.
            </p>

            <p>
              Antes de escrever, você pode
              consultar a página de{" "}
              <InternalLink to="/privacidade">
                Privacidade
              </InternalLink>
              , que descreve como a versão
              atual do site trata essas
              informações.
            </p>
          </div>
        </section>

        <section>
          <span>04</span>
          <div>
            <h2>
              Produtos, marcas e relações
              comerciais
            </h2>

            <p>
              Para comunicar link quebrado,
              informação de produto
              desatualizada ou outro
              problema no catálogo, indique
              o nome do produto e o que
              você encontrou.
            </p>

            <p>
              Assuntos sobre publicidade,
              afiliação, patrocínio ou
              outras relações comerciais
              devem respeitar os princípios
              publicados em{" "}
              <InternalLink to="/transparencia">
                Transparência comercial
              </InternalLink>
              .
            </p>
          </div>
        </section>

        <section>
          <span>05</span>
          <div>
            <h2>
              O canal não substitui
              atendimento de saúde
            </h2>

            <p>
              O e-mail do Minha Cabeleira
              não é um serviço de
              emergência, consulta médica,
              dermatológica ou tricológica.
              Questões individuais de saúde
              que exijam diagnóstico,
              tratamento ou avaliação
              clínica devem ser direcionadas
              a profissional habilitado.
            </p>
          </div>
        </section>
      </div>

      <aside className="privacy-note">
        <strong>Contato oficial</strong>

        <p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </aside>
    </main>
  );
}
