export interface CartLine {
  id: string;
  size: number;
  qty: number;
}

export interface CatalogItem {
  name: string;
  price: number;
  category: string;
  image: string;
  tile: string;
}

const KEY = "dropshoes-cart";
let catalog: Record<string, CatalogItem> | null = null;

export function getCatalog(): Record<string, CatalogItem> {
  if (!catalog) {
    const node = document.getElementById("catalog");
    catalog = node ? JSON.parse(node.textContent || "{}") : {};
  }
  return catalog!;
}

export function getCart(): CartLine[] {
  try {
    const lines = JSON.parse(localStorage.getItem(KEY) || "[]");
    const known = getCatalog();
    return Array.isArray(lines) ? lines.filter((line) => known[line.id]) : [];
  } catch {
    return [];
  }
}

function save(lines: CartLine[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* storage unavailable: cart lasts for this page only */
  }
  window.dispatchEvent(new CustomEvent("cart:change", { detail: lines }));
}

export function addToCart(id: string, size: number, qty = 1) {
  const lines = getCart();
  const line = lines.find((l) => l.id === id && l.size === size);
  if (line) line.qty += qty;
  else lines.push({ id, size, qty });
  save(lines);
}

export function setQty(id: string, size: number, qty: number) {
  const lines = getCart()
    .map((l) => (l.id === id && l.size === size ? { ...l, qty } : l))
    .filter((l) => l.qty > 0);
  save(lines);
}

export function clearCart() {
  save([]);
}

export const cartCount = (lines = getCart()) =>
  lines.reduce((sum, l) => sum + l.qty, 0);

export const cartTotal = (lines = getCart()) =>
  lines.reduce((sum, l) => sum + l.qty * getCatalog()[l.id].price, 0);

export const money = (value: number) => `$${value.toFixed(0)}`;
