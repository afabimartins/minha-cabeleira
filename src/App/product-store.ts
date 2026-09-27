import type { Product } from "../domain/product";

import {
  catalogProductToDomainProduct,
} from "./catalog-product";

import type {
  CatalogProduct,
  ProductLinkType,
} from "./catalog-product";

const LOCAL_STORAGE_KEY =
  "minha-cabeleira-admin-products-v1";

const SESSION_STORAGE_KEY =
  "minha-cabeleira-admin-session-v2";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL?.replace(
    /\/$/,
    "",
  );

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY;

export type ProductStoreMode =
  | "supabase"
  | "local";

export type AdminSession = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  email?: string;
  userId?: string;
  mode: ProductStoreMode;
};

type SupabaseProductRow = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: string;
  size: string | null;
  image_url: string | null;
  price: number | null;
  currency: string | null;
  retailer: string | null;
  product_url: string | null;
  price_checked_at: string | null;
  ingredients_raw: string | null;
  attributes: string[] | null;
  availability: "active" | "paused";
  source_url: string | null;
  verified_at: string | null;
  link_type: ProductLinkType | null;
};

type AuthTokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  user?: {
    id?: string;
    email?: string;
  };
};

function isSupabaseConfigured(): boolean {
  return Boolean(
    SUPABASE_URL && SUPABASE_ANON_KEY,
  );
}

export function getProductStoreMode(): ProductStoreMode {
  return isSupabaseConfigured()
    ? "supabase"
    : "local";
}

function rowToCatalogProduct(
  row: SupabaseProductRow,
): CatalogProduct {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    name: row.name,
    category: row.category,
    size: row.size ?? undefined,
    imageUrl: row.image_url ?? undefined,
    price: row.price ?? undefined,
    currency: row.currency ?? "BRL",
    retailer: row.retailer ?? undefined,
    productUrl: row.product_url ?? undefined,
    priceCheckedAt:
      row.price_checked_at ?? undefined,
    ingredientsRaw:
      row.ingredients_raw ?? "",
    attributes: row.attributes ?? [],
    availability: row.availability,
    sourceUrl: row.source_url ?? undefined,
    verifiedAt: row.verified_at ?? undefined,
    linkType: row.link_type ?? "editorial",
  };
}

function catalogProductToRow(
  product: CatalogProduct,
): SupabaseProductRow {
  return {
    id: product.id,
    slug: product.slug,
    brand: product.brand,
    name: product.name,
    category: product.category,
    size: product.size ?? null,
    image_url: product.imageUrl ?? null,
    price: product.price ?? null,
    currency: product.currency || "BRL",
    retailer: product.retailer ?? null,
    product_url: product.productUrl ?? null,
    price_checked_at:
      product.priceCheckedAt ?? null,
    ingredients_raw:
      product.ingredientsRaw || null,
    attributes: product.attributes,
    availability: product.availability,
    source_url: product.sourceUrl ?? null,
    verified_at: product.verifiedAt ?? null,
    link_type: product.linkType,
  };
}

function loadLocalProducts(): CatalogProduct[] {
  const stored = localStorage.getItem(
    LOCAL_STORAGE_KEY,
  );

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);

    return Array.isArray(parsed)
      ? (parsed as CatalogProduct[])
      : [];
  } catch {
    return [];
  }
}

function saveLocalProducts(
  products: CatalogProduct[],
): void {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(products),
  );
}

async function supabaseRequest<T>(
  path: string,
  options: RequestInit = {},
  accessToken?: string,
): Promise<T> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase não configurado.",
    );
  }

  const response = await fetch(
    `${SUPABASE_URL}${path}`,
    {
      ...options,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${
          accessToken ?? SUPABASE_ANON_KEY
        }`,
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    },
  );

  if (!response.ok) {
    let message =
      "Não foi possível concluir a operação.";

    try {
      const body = await response.json();
      message =
        body?.message ??
        body?.error_description ??
        body?.error ??
        message;
    } catch {
      // Mantém a mensagem genérica.
    }

    if (response.status === 401) {
      message =
        "Sua sessão administrativa expirou. Entre novamente.";
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function persistAdminSession(
  session: AdminSession,
): void {
  sessionStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
}

async function refreshAdminSession(
  session: AdminSession,
): Promise<AdminSession> {
  if (
    session.mode === "local" ||
    !session.refreshToken
  ) {
    return session;
  }

  const now = Math.floor(Date.now() / 1000);

  if (
    session.expiresAt &&
    session.expiresAt > now + 60
  ) {
    return session;
  }

  const result = await supabaseRequest<AuthTokenResponse>(
    "/auth/v1/token?grant_type=refresh_token",
    {
      method: "POST",
      body: JSON.stringify({
        refresh_token: session.refreshToken,
      }),
    },
  );

  const refreshed: AdminSession = {
    ...session,
    accessToken: result.access_token,
    refreshToken:
      result.refresh_token ?? session.refreshToken,
    expiresAt:
      Math.floor(Date.now() / 1000) +
      (result.expires_in ?? 3600),
    email: result.user?.email ?? session.email,
    userId: result.user?.id ?? session.userId,
  };

  persistAdminSession(refreshed);
  return refreshed;
}

async function assertAdminAccess(
  session: AdminSession,
): Promise<AdminSession> {
  const fresh =
    await refreshAdminSession(session);

  if (fresh.mode === "local") {
    return fresh;
  }

  if (!fresh.userId) {
    throw new Error(
      "Não foi possível identificar a conta administrativa.",
    );
  }

  const rows = await supabaseRequest<
    Array<{ role: string }>
  >(
    `/rest/v1/profiles?select=role&user_id=eq.${encodeURIComponent(
      fresh.userId,
    )}`,
    {},
    fresh.accessToken,
  );

  if (rows[0]?.role !== "admin") {
    throw new Error(
      "Esta conta está autenticada, mas ainda não possui permissão de administradora.",
    );
  }

  return fresh;
}

function isPublishableProduct(
  product: CatalogProduct,
): boolean {
  return Boolean(
    product.availability === "active" &&
      product.verifiedAt &&
      product.sourceUrl &&
      product.productUrl &&
      product.ingredientsRaw.trim() &&
      product.attributes.length > 0,
  );
}

export async function getActiveAnalysisProducts(): Promise<
  Product[]
> {
  const products =
    await listPublicCatalogProducts();

  return products.map(
    catalogProductToDomainProduct,
  );
}

export async function listPublicCatalogProducts(): Promise<
  CatalogProduct[]
> {
  if (!isSupabaseConfigured()) {
    return loadLocalProducts().filter(
      isPublishableProduct,
    );
  }

  const rows = await supabaseRequest<
    SupabaseProductRow[]
  >(
    "/rest/v1/products?select=*&availability=eq.active&verified_at=not.is.null&source_url=not.is.null&product_url=not.is.null&order=brand.asc,name.asc",
  );

  return rows
    .map(rowToCatalogProduct)
    .filter(isPublishableProduct);
}

export async function signInAdmin(
  email: string,
  password: string,
): Promise<AdminSession> {
  if (!isSupabaseConfigured()) {
    if (!import.meta.env.DEV) {
      throw new Error(
        "O admin precisa do Supabase configurado em produção.",
      );
    }

    const session: AdminSession = {
      accessToken: "local-development",
      email: email || "admin-local",
      mode: "local",
    };

    persistAdminSession(session);
    return session;
  }

  const result =
    await supabaseRequest<AuthTokenResponse>(
      "/auth/v1/token?grant_type=password",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

  const session: AdminSession = {
    accessToken: result.access_token,
    refreshToken: result.refresh_token,
    expiresAt:
      Math.floor(Date.now() / 1000) +
      (result.expires_in ?? 3600),
    email: result.user?.email ?? email,
    userId: result.user?.id,
    mode: "supabase",
  };

  const verified =
    await assertAdminAccess(session);

  persistAdminSession(verified);
  return verified;
}

export function getStoredAdminSession(): AdminSession | null {
  const stored = sessionStorage.getItem(
    SESSION_STORAGE_KEY,
  );

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as AdminSession;
  } catch {
    return null;
  }
}

export function signOutAdmin(): void {
  sessionStorage.removeItem(
    SESSION_STORAGE_KEY,
  );
}

export async function listAdminCatalogProducts(
  session: AdminSession,
): Promise<CatalogProduct[]> {
  if (session.mode === "local") {
    return loadLocalProducts().sort(
      (a, b) =>
        `${a.brand} ${a.name}`.localeCompare(
          `${b.brand} ${b.name}`,
          "pt-BR",
        ),
    );
  }

  const fresh = await assertAdminAccess(session);

  const rows = await supabaseRequest<
    SupabaseProductRow[]
  >(
    "/rest/v1/products?select=*&order=brand.asc,name.asc",
    {},
    fresh.accessToken,
  );

  return rows.map(rowToCatalogProduct);
}

export async function saveAdminCatalogProduct(
  session: AdminSession,
  product: CatalogProduct,
): Promise<CatalogProduct> {
  if (session.mode === "local") {
    const products = loadLocalProducts();
    const existingIndex = products.findIndex(
      (item) => item.id === product.id,
    );

    if (existingIndex >= 0) {
      products[existingIndex] = product;
    } else {
      products.push(product);
    }

    saveLocalProducts(products);
    return product;
  }

  const fresh = await assertAdminAccess(session);
  const row = catalogProductToRow(product);

  const existing = await supabaseRequest<
    SupabaseProductRow[]
  >(
    `/rest/v1/products?id=eq.${encodeURIComponent(
      product.id,
    )}&select=id`,
    {},
    fresh.accessToken,
  );

  const path = existing.length
    ? `/rest/v1/products?id=eq.${encodeURIComponent(
        product.id,
      )}`
    : "/rest/v1/products";

  const savedRows = await supabaseRequest<
    SupabaseProductRow[]
  >(
    path,
    {
      method: existing.length ? "PATCH" : "POST",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify(row),
    },
    fresh.accessToken,
  );

  return rowToCatalogProduct(
    savedRows[0] ?? row,
  );
}

export async function deleteAdminCatalogProduct(
  session: AdminSession,
  productId: string,
): Promise<void> {
  if (session.mode === "local") {
    saveLocalProducts(
      loadLocalProducts().filter(
        (product) => product.id !== productId,
      ),
    );
    return;
  }

  const fresh = await assertAdminAccess(session);

  await supabaseRequest<void>(
    `/rest/v1/products?id=eq.${encodeURIComponent(
      productId,
    )}`,
    {
      method: "DELETE",
    },
    fresh.accessToken,
  );
}
