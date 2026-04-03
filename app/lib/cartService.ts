/**
 * Cart Service
 * Manages shopping cart state and operations
 */

export interface CartVariation {
  oil: 30 | 50 | 70;
  volume: '3ml' | '85ml';
  price: number;
}

export interface CartItem {
  productId: string;
  productName: string;
  variation: CartVariation;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export const getLocalCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fragranza_cart');
  return stored ? JSON.parse(stored) : [];
};

export const saveCart = (items: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fragranza_cart', JSON.stringify(items));
};

export const addToCart = (
  productId: string,
  productName: string,
  variation: CartVariation,
  image: string,
  quantity: number = 1
): CartItem[] => {
  const items = getLocalCart();
  const existingIndex = items.findIndex(
    (item) =>
      item.productId === productId &&
      item.variation.oil === variation.oil &&
      item.variation.volume === variation.volume
  );

  if (existingIndex > -1) {
    items[existingIndex].quantity += quantity;
  } else {
    items.push({ productId, productName, variation, quantity, image });
  }

  saveCart(items);
  return items;
};

export const removeFromCart = (productId: string, variation: CartVariation): CartItem[] => {
  const items = getLocalCart().filter(
    (item) =>
      !(
        item.productId === productId &&
        item.variation.oil === variation.oil &&
        item.variation.volume === variation.volume
      )
  );
  saveCart(items);
  return items;
};

export const updateQuantity = (
  productId: string,
  variation: CartVariation,
  quantity: number
): CartItem[] => {
  const items = getLocalCart();
  const item = items.find(
    (i) =>
      i.productId === productId &&
      i.variation.oil === variation.oil &&
      i.variation.volume === variation.volume
  );

  if (item) {
    item.quantity = Math.max(1, quantity);
  }

  saveCart(items);
  return items;
};

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.variation.price * item.quantity, 0);
};

export const getCartSummary = (): Cart => {
  const items = getLocalCart();
  return {
    items,
    total: calculateTotal(items),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('fragranza_cart');
};
