import type { Product } from "../domain/product";

// O catálogo público deixou de ser mantido no código.
// Produtos reais são carregados pelo product-store e administrados em /admin.
// Fixtures fictícias continuam apenas nos testes de domínio.
export const productCatalog: Product[] = [];
