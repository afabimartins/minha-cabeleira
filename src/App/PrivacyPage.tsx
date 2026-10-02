import {
  PrivacySettingsButton,
} from "./PrivacySettingsButton";

const privacyContact =
  (
    import.meta.env
      .VITE_PRIVACY_CONTACT_EMAIL ??
    "contato@minhacabeleira.com.br"
  ).trim() ||
  "contato@minhacabeleira.com.br";

export function PrivacyPage() {
  return (
    <main className="privacy-page">
      <header className="privacy-hero">
        <p>
          Privacidade e cookies
        </p>

        <h1>
          Informação clara sobre
          o que o Minha Cabeleira
          usa — e o que não usa.
        </h1>

        <p>
          Esta página descreve o
          funcionamento atual do
          site. Ela deve acompanhar
          qualquer mudança futura
          de coleta de dados,
          publicidade ou analytics.
        </p>

        <small>
          Última atualização:
          2 de outubro de 2026.
        </small>
      </header>

      <div className="privacy-content">
        <section>
          <span>01</span>
          <div>
            <h2>
              Respostas da análise
            </h2>

            <p>
              As respostas do
              questionário ficam no
              estado local da página
              enquanto a análise está
              em uso. O Minha
              Cabeleira não cria uma
              conta para visitantes
              nem envia essas
              respostas para o banco
              de produtos.
            </p>

            <p>
              Ao recarregar ou
              encerrar a sessão da
              página, essas respostas
              não formam um histórico
              pessoal no site.
            </p>

            <p>
              As respostas do
              questionário e o
              conteúdo individual da
              análise não são
              enviados ao Google
              Analytics.
            </p>
          </div>
        </section>

        <section>
          <span>02</span>
          <div>
            <h2>
              Catálogo e
              administração
            </h2>

            <p>
              O catálogo público de
              produtos é consultado no
              Supabase. A área
              administrativa usa
              autenticação própria e
              permissões restritas
              para manutenção desse
              conteúdo.
            </p>

            <p>
              A recomendação técnica
              não depende de dados de
              publicidade e não é
              alterada por pagamento,
              patrocínio ou posição de
              anúncio.
            </p>
          </div>
        </section>

        <section>
          <span>03</span>
          <div>
            <h2>
              Cloudflare Web
              Analytics
            </h2>

            <p>
              O site usa o Cloudflare
              Web Analytics para
              acompanhar métricas
              agregadas de uso e
              desempenho das páginas,
              como visualizações e
              indicadores de
              carregamento.
            </p>

            <p>
              De acordo com a
              documentação da
              Cloudflare, esse serviço
              não usa cookies nem
              localStorage para
              analytics, não cria
              perfis individuais por
              fingerprinting e foi
              projetado para coletar
              métricas sem rastrear
              pessoas individualmente.
            </p>
          </div>
        </section>

        <section>
          <span>04</span>
          <div>
            <h2>
              Google Analytics
            </h2>

            <p>
              O Minha Cabeleira pode
              usar o Google Analytics
              4 para compreender, de
              forma geral, como as
              páginas públicas do site
              são utilizadas.
            </p>

            <p>
              A tag do Google
              Analytics só é carregada
              quando a visitante
              escolhe aceitar
              analytics. Se a escolha
              for recusar, o site não
              carrega a tag para essa
              finalidade.
            </p>

            <p>
              A preferência entre
              aceitar ou recusar é
              armazenada no navegador
              para que a escolha possa
              ser respeitada em novas
              visitas. Ela pode ser
              alterada posteriormente
              nas configurações de
              privacidade e cookies.
            </p>

            <p>
              Na configuração atual,
              os recursos de Google
              Signals e os sinais de
              personalização de
              publicidade permanecem
              desativados no Google
              Analytics.
            </p>

            <PrivacySettingsButton />
          </div>
        </section>

        <section>
          <span>05</span>
          <div>
            <h2>
              Publicidade
            </h2>

            <p>
              O Google AdSense não
              está ativo na
              experiência pública
              neste momento.
            </p>

            <p>
              Se a publicidade do
              Google AdSense for
              ativada no futuro, ela
              será exibida em áreas
              identificadas como
              “Publicidade”. O Google
              e seus parceiros podem
              usar cookies,
              armazenamento local ou
              outros identificadores,
              conforme a região, as
              escolhas de privacidade
              da pessoa e a
              configuração do
              serviço.
            </p>

            <p>
              Nas regiões em que o
              Google exigir uma
              plataforma de gestão de
              consentimento, a
              ativação da publicidade
              será acompanhada pela
              mensagem de privacidade
              correspondente.
            </p>
          </div>
        </section>

        <section>
          <span>06</span>
          <div>
            <h2>
              Imagens e produtos
            </h2>

            <p>
              As imagens de produtos
              publicadas no catálogo
              ficam no armazenamento
              do projeto e são
              associadas ao cadastro
              público do produto.
              Fotos enviadas para a
              área administrativa não
              fazem parte da análise
              pessoal da visitante.
            </p>
          </div>
        </section>

        <section>
          <span>07</span>
          <div>
            <h2>
              Contato sobre
              privacidade
            </h2>

            <p>
              Para dúvidas sobre
              privacidade ou este
              aviso, escreva para{" "}
              <a
                href={`mailto:${privacyContact}`}
              >
                {privacyContact}
              </a>
              .
            </p>
          </div>
        </section>
      </div>

      <aside className="privacy-note">
        <strong>
          Transparência por desenho
        </strong>

        <p>
          Se o Minha Cabeleira passar
          a usar novos serviços de
          publicidade, contas de
          visitantes, histórico,
          upload de fotos ou novos
          parceiros comerciais, esta
          página deverá ser atualizada
          antes da ativação desses
          recursos.
        </p>
      </aside>
    </main>
  );
}