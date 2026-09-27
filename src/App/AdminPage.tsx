import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  deleteAdminCatalogProduct,
  getProductStoreMode,
  getStoredAdminSession,
  listAdminCatalogProducts,
  saveAdminCatalogProduct,
  signInAdmin,
  signOutAdmin,
} from "./product-store";

import type {
  AdminSession,
} from "./product-store";

import type {
  CatalogProduct,
  ProductLinkType,
} from "./catalog-product";

const TECHNICAL_ATTRIBUTES = [
  {
    value: "conditioning",
    label: "Condicionamento",
  },
  {
    value: "conditioning_support",
    label: "Suporte de condicionamento",
  },
  {
    value: "moisture_support",
    label: "Suporte à retenção de umidade",
  },
  {
    value: "damage_support",
    label: "Proteção da fibra",
  },
];

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


function getPublicationIssues(
  product: CatalogProduct,
): string[] {
  const issues: string[] = [];

  if (!product.sourceUrl?.trim()) {
    issues.push("fonte oficial ou confiável");
  }

  if (!product.verifiedAt) {
    issues.push("data de verificação técnica");
  }

  if (!product.productUrl?.trim()) {
    issues.push("link real do produto");
  }

  if (!product.ingredientsRaw.trim()) {
    issues.push("lista de ingredientes / INCI");
  }

  if (product.attributes.length === 0) {
    issues.push("ao menos um critério técnico de compatibilidade");
  }

  if (product.price !== undefined) {
    if (!product.retailer?.trim()) {
      issues.push("varejista do preço informado");
    }

    if (!product.priceCheckedAt) {
      issues.push("data de verificação do preço");
    }
  }

  return issues;
}

function createEmptyProduct(): CatalogProduct {
  return {
    id: crypto.randomUUID(),
    slug: "",
    brand: "",
    name: "",
    category: "conditioner",
    size: "",
    imageUrl: "",
    price: undefined,
    currency: "BRL",
    retailer: "",
    productUrl: "",
    priceCheckedAt: "",
    ingredientsRaw: "",
    attributes: [],
    availability: "paused",
    sourceUrl: "",
    verifiedAt: "",
    linkType: "editorial",
  };
}

export function AdminPage() {
  const [session, setSession] =
    useState<AdminSession | null>(() =>
      getStoredAdminSession(),
    );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<
    CatalogProduct[]
  >([]);
  const [selectedProduct, setSelectedProduct] =
    useState<CatalogProduct | null>(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const mode = getProductStoreMode();

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLocaleLowerCase("pt-BR");

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) =>
      `${product.brand} ${product.name} ${product.category}`
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedQuery),
    );
  }, [products, query]);

  async function refreshProducts(
    currentSession = session,
  ) {
    if (!currentSession) return;

    setIsLoading(true);
    setError("");

    try {
      const items =
        await listAdminCatalogProducts(
          currentSession,
        );
      setProducts(items);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Não foi possível carregar o catálogo.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (session) {
      void refreshProducts(session);
    }
  }, [session]);

  async function handleLogin() {
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const newSession = await signInAdmin(
        email,
        password,
      );
      setSession(newSession);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Não foi possível entrar.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    signOutAdmin();
    setSession(null);
    setProducts([]);
    setSelectedProduct(null);
  }

  function startNewProduct() {
    setSelectedProduct(
      createEmptyProduct(),
    );
    setMessage("");
    setError("");
  }

  function editProduct(
    product: CatalogProduct,
  ) {
    setSelectedProduct({ ...product });
    setMessage("");
    setError("");
  }

  function updateSelectedProduct(
    patch: Partial<CatalogProduct>,
  ) {
    setSelectedProduct((current) =>
      current
        ? {
            ...current,
            ...patch,
          }
        : current,
    );
  }

  function toggleAttribute(
    attribute: string,
  ) {
    if (!selectedProduct) return;

    const next = selectedProduct.attributes.includes(
      attribute,
    )
      ? selectedProduct.attributes.filter(
          (item) => item !== attribute,
        )
      : [
          ...selectedProduct.attributes,
          attribute,
        ];

    updateSelectedProduct({
      attributes: next,
    });
  }

  async function handleSave() {
    if (!session || !selectedProduct) {
      return;
    }

    if (
      !selectedProduct.brand.trim() ||
      !selectedProduct.name.trim()
    ) {
      setError(
        "Informe pelo menos marca e nome do produto.",
      );
      return;
    }

    if (selectedProduct.availability === "active") {
      const publicationIssues =
        getPublicationIssues(selectedProduct);

      if (publicationIssues.length > 0) {
        setError(
          `Para publicar este produto, complete: ${publicationIssues.join(
            ", ",
          )}.`,
        );
        return;
      }
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const normalizedProduct: CatalogProduct = {
        ...selectedProduct,
        slug:
          selectedProduct.slug.trim() ||
          slugify(
            `${selectedProduct.brand}-${selectedProduct.name}`,
          ),
      };

      const saved =
        await saveAdminCatalogProduct(
          session,
          normalizedProduct,
        );

      setSelectedProduct(saved);
      setMessage("Produto salvo.");
      await refreshProducts(session);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Não foi possível salvar o produto.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!session || !selectedProduct) {
      return;
    }

    const confirmed = window.confirm(
      `Excluir ${selectedProduct.brand} ${selectedProduct.name}?`,
    );

    if (!confirmed) return;

    setIsLoading(true);
    setError("");

    try {
      await deleteAdminCatalogProduct(
        session,
        selectedProduct.id,
      );
      setSelectedProduct(null);
      setMessage("Produto excluído.");
      await refreshProducts(session);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Não foi possível excluir o produto.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (!session) {
    return (
      <main className="admin-page">
        <section className="admin-login">
          <p className="admin-eyebrow">
            Administração
          </p>
          <h1>Catálogo Minha Cabeleira</h1>
          <p>
            Cadastre e mantenha os produtos reais que podem aparecer nas análises.
          </p>

          {mode === "local" ? (
            <div className="admin-mode-note">
              <strong>Modo local de desenvolvimento</strong>
              <span>
                O Supabase ainda não está configurado. Os produtos ficarão apenas neste navegador e não devem ser usados em produção.
              </span>
            </div>
          ) : null}

          <label className="admin-field">
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
            />
          </label>

          {mode === "supabase" ? (
            <label className="admin-field">
              <span>Senha</span>
              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
              />
            </label>
          ) : null}

          {error ? (
            <p className="admin-feedback admin-feedback--error">
              {error}
            </p>
          ) : null}

          <button
            className="admin-primary-button"
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {mode === "local"
              ? "Entrar no admin local"
              : "Entrar"}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page admin-page--dashboard">
      <header className="admin-toolbar">
        <div>
          <p className="admin-eyebrow">
            Administração
          </p>
          <h1>Produtos</h1>
          <p>
            A análise continua baseada em critérios técnicos; o catálogo só fornece opções compatíveis.
          </p>
        </div>

        <div className="admin-toolbar__actions">
          <span className="admin-session-pill">
            {session.mode === "local"
              ? "Local"
              : session.email ?? "Admin"}
          </span>
          <button
            type="button"
            className="admin-secondary-button"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </header>

      <div className="admin-layout">
        <aside className="admin-catalog-panel">
          <div className="admin-catalog-panel__header">
            <div>
              <strong>{products.length}</strong>
              <span> produtos cadastrados</span>
            </div>

            <button
              type="button"
              className="admin-primary-button admin-primary-button--small"
              onClick={startNewProduct}
            >
              + Novo produto
            </button>
          </div>

          <input
            className="admin-search"
            type="search"
            placeholder="Buscar marca, produto ou categoria"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />

          <div className="admin-product-list">
            {isLoading && products.length === 0 ? (
              <p className="admin-empty">
                Carregando catálogo…
              </p>
            ) : filteredProducts.length === 0 ? (
              <p className="admin-empty">
                Nenhum produto cadastrado ainda.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <button
                  className={`admin-product-row${
                    selectedProduct?.id === product.id
                      ? " admin-product-row--selected"
                      : ""
                  }`}
                  type="button"
                  key={product.id}
                  onClick={() => editProduct(product)}
                >
                  <span>
                    <strong>{product.name}</strong>
                    <small>{product.brand}</small>
                  </span>
                  <em
                    className={`admin-status admin-status--${product.availability}`}
                  >
                    {product.availability === "active"
                      ? "Ativo"
                      : "Pausado"}
                  </em>
                </button>
              ))
            )}
          </div>
        </aside>

        <section className="admin-editor">
          {!selectedProduct ? (
            <div className="admin-editor__placeholder">
              <span aria-hidden="true">✦</span>
              <h2>Selecione ou crie um produto</h2>
              <p>
                O catálogo público só exibirá produtos ativos com fonte, verificação e critérios técnicos completos.
              </p>
            </div>
          ) : (
            <>
              <div className="admin-editor__heading">
                <div>
                  <p className="admin-eyebrow">
                    Ficha do produto
                  </p>
                  <h2>
                    {selectedProduct.name || "Novo produto"}
                  </h2>
                </div>

                <div className="admin-editor__actions">
                  <button
                    type="button"
                    className="admin-danger-button"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    className="admin-primary-button"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    Salvar produto
                  </button>
                </div>
              </div>

              <div className={`admin-publication-readiness ${
                selectedProduct.availability === "active" &&
                getPublicationIssues(selectedProduct).length === 0
                  ? "admin-publication-readiness--ready"
                  : ""
              }`}>
                <strong>Pronto para o catálogo público</strong>
                {getPublicationIssues(selectedProduct).length === 0 ? (
                  <span>Dados técnicos e fonte mínimos conferidos.</span>
                ) : (
                  <span>
                    Antes de ativar: {getPublicationIssues(selectedProduct).join(", ")}.
                  </span>
                )}
              </div>

              {message ? (
                <p className="admin-feedback admin-feedback--success">
                  {message}
                </p>
              ) : null}

              {error ? (
                <p className="admin-feedback admin-feedback--error">
                  {error}
                </p>
              ) : null}

              <div className="admin-form-grid">
                <section className="admin-form-section">
                  <h3>Produto</h3>
                  <div className="admin-grid-two">
                    <label className="admin-field">
                      <span>Marca *</span>
                      <input
                        value={selectedProduct.brand}
                        onChange={(event) =>
                          updateSelectedProduct({
                            brand: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="admin-field">
                      <span>Nome *</span>
                      <input
                        value={selectedProduct.name}
                        onChange={(event) =>
                          updateSelectedProduct({
                            name: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="admin-field">
                      <span>Categoria</span>
                      <select
                        value={selectedProduct.category}
                        onChange={(event) =>
                          updateSelectedProduct({
                            category: event.target.value,
                          })
                        }
                      >
                        <option value="shampoo">Shampoo</option>
                        <option value="conditioner">Condicionador</option>
                        <option value="mask">Máscara</option>
                        <option value="leave_in">Leave-in</option>
                        <option value="serum">Sérum</option>
                        <option value="oil">Óleo</option>
                        <option value="styler">Finalizador</option>
                        <option value="treatment">Tratamento</option>
                      </select>
                    </label>
                    <label className="admin-field">
                      <span>Tamanho</span>
                      <input
                        placeholder="Ex.: 300 ml"
                        value={selectedProduct.size ?? ""}
                        onChange={(event) =>
                          updateSelectedProduct({
                            size: event.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <label className="admin-field">
                    <span>URL da imagem</span>
                    <input
                      type="url"
                      value={selectedProduct.imageUrl ?? ""}
                      onChange={(event) =>
                        updateSelectedProduct({
                          imageUrl: event.target.value,
                        })
                      }
                    />
                  </label>
                </section>

                <section className="admin-form-section">
                  <h3>Comercial</h3>
                  <div className="admin-grid-two">
                    <label className="admin-field">
                      <span>Preço de referência</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={selectedProduct.price ?? ""}
                        onChange={(event) =>
                          updateSelectedProduct({
                            price: event.target.value
                              ? Number(event.target.value)
                              : undefined,
                          })
                        }
                      />
                    </label>
                    <label className="admin-field">
                      <span>Moeda</span>
                      <select
                        value={selectedProduct.currency}
                        onChange={(event) =>
                          updateSelectedProduct({
                            currency: event.target.value,
                          })
                        }
                      >
                        <option value="BRL">BRL</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </label>
                    <label className="admin-field">
                      <span>Loja / varejista</span>
                      <input
                        value={selectedProduct.retailer ?? ""}
                        onChange={(event) =>
                          updateSelectedProduct({
                            retailer: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="admin-field">
                      <span>Preço verificado em</span>
                      <input
                        type="date"
                        value={selectedProduct.priceCheckedAt ?? ""}
                        onChange={(event) =>
                          updateSelectedProduct({
                            priceCheckedAt: event.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <label className="admin-field">
                    <span>URL do produto</span>
                    <input
                      type="url"
                      value={selectedProduct.productUrl ?? ""}
                      onChange={(event) =>
                        updateSelectedProduct({
                          productUrl: event.target.value,
                        })
                      }
                    />
                  </label>

                  <label className="admin-field">
                    <span>Tipo de link</span>
                    <select
                      value={selectedProduct.linkType}
                      onChange={(event) =>
                        updateSelectedProduct({
                          linkType: event.target.value as ProductLinkType,
                        })
                      }
                    >
                      <option value="editorial">Editorial</option>
                      <option value="affiliate">Afiliado</option>
                      <option value="sponsored">Patrocinado</option>
                    </select>
                  </label>
                </section>

                <section className="admin-form-section admin-form-section--wide">
                  <h3>Formulação</h3>
                  <label className="admin-field">
                    <span>Lista INCI / ingredientes do rótulo</span>
                    <textarea
                      rows={6}
                      placeholder="Cole a lista do rótulo, separada por vírgulas"
                      value={selectedProduct.ingredientsRaw}
                      onChange={(event) =>
                        updateSelectedProduct({
                          ingredientsRaw: event.target.value,
                        })
                      }
                    />
                  </label>

                  <div className="admin-attribute-grid">
                    {TECHNICAL_ATTRIBUTES.map((attribute) => (
                      <label
                        className="admin-checkbox"
                        key={attribute.value}
                      >
                        <input
                          type="checkbox"
                          checked={selectedProduct.attributes.includes(
                            attribute.value,
                          )}
                          onChange={() =>
                            toggleAttribute(attribute.value)
                          }
                        />
                        <span>{attribute.label}</span>
                      </label>
                    ))}
                  </div>

                  <p className="admin-helper">
                    Marque apenas características verificadas pela composição e pelo posicionamento técnico do produto. Marca, patrocínio e comissão não entram na compatibilidade.
                  </p>
                </section>

                <section className="admin-form-section">
                  <h3>Verificação</h3>
                  <label className="admin-field">
                    <span>Fonte das informações</span>
                    <input
                      type="url"
                      placeholder="Página oficial ou fonte confiável"
                      value={selectedProduct.sourceUrl ?? ""}
                      onChange={(event) =>
                        updateSelectedProduct({
                          sourceUrl: event.target.value,
                        })
                      }
                    />
                  </label>
                  <label className="admin-field">
                    <span>Verificado em</span>
                    <input
                      type="date"
                      value={selectedProduct.verifiedAt ?? ""}
                      onChange={(event) =>
                        updateSelectedProduct({
                          verifiedAt: event.target.value,
                        })
                      }
                    />
                  </label>
                </section>

                <section className="admin-form-section">
                  <h3>Publicação</h3>
                  <label className="admin-field">
                    <span>Status</span>
                    <select
                      value={selectedProduct.availability}
                      onChange={(event) =>
                        updateSelectedProduct({
                          availability:
                            event.target.value as CatalogProduct["availability"],
                        })
                      }
                    >
                      <option value="active">Ativo</option>
                      <option value="paused">Pausado</option>
                    </select>
                  </label>
                  <p className="admin-helper">
                    Novos produtos começam pausados. Só ative após conferir fonte, INCI, link e critérios técnicos.
                  </p>
                  <label className="admin-field">
                    <span>Slug</span>
                    <input
                      value={selectedProduct.slug}
                      onChange={(event) =>
                        updateSelectedProduct({
                          slug: event.target.value,
                        })
                      }
                      placeholder="Gerado automaticamente se ficar vazio"
                    />
                  </label>
                </section>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
