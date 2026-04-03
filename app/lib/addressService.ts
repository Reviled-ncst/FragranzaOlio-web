/**
 * Address & Checkout Service
 * Manages shipping addresses and order information
 */

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  items: any[];
  shippingAddress: Address;
  billingAddress: Address;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  trackingNumber?: string;
}

// Address Management
export const getAddresses = (): Address[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fragranza_addresses');
  return stored ? JSON.parse(stored) : [];
};

export const saveAddresses = (addresses: Address[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fragranza_addresses', JSON.stringify(addresses));
};

export const addAddress = (address: Omit<Address, 'id' | 'createdAt'>): Address => {
  const newAddress: Address = {
    ...address,
    id: `addr_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  const addresses = getAddresses();
  addresses.push(newAddress);
  saveAddresses(addresses);
  return newAddress;
};

export const updateAddress = (id: string, updates: Partial<Address>): Address | null => {
  const addresses = getAddresses();
  const index = addresses.findIndex((a) => a.id === id);

  if (index === -1) return null;

  addresses[index] = { ...addresses[index], ...updates };
  saveAddresses(addresses);
  return addresses[index];
};

export const deleteAddress = (id: string): boolean => {
  const addresses = getAddresses().filter((a) => a.id !== id);
  saveAddresses(addresses);
  return true;
};

export const setDefaultAddress = (id: string): Address[] => {
  const addresses = getAddresses();
  addresses.forEach((addr) => {
    addr.isDefault = addr.id === id;
  });
  saveAddresses(addresses);
  return addresses;
};

export const getDefaultAddress = (): Address | null => {
  const addresses = getAddresses();
  return addresses.find((a) => a.isDefault) || addresses[0] || null;
};

// Order Management
export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('fragranza_orders');
  return stored ? JSON.parse(stored) : [];
};

export const saveOrders = (orders: Order[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fragranza_orders', JSON.stringify(orders));
};

export const createOrder = (
  items: any[],
  shippingAddress: Address,
  billingAddress: Address,
  total: number
): Order => {
  const newOrder: Order = {
    id: `order_${Date.now()}`,
    items,
    shippingAddress,
    billingAddress,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
    trackingNumber: undefined,
  };

  const orders = getOrders();
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
};

export const updateOrderStatus = (
  orderId: string,
  status: Order['status'],
  trackingNumber?: string
): Order | null => {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);

  if (!order) return null;

  order.status = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;

  saveOrders(orders);
  return order;
};

export const getOrder = (orderId: string): Order | null => {
  const orders = getOrders();
  return orders.find((o) => o.id === orderId) || null;
};
