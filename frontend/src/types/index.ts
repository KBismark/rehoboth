export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  prices?: {
    small?: number;
    medium?: number;
    large?: number;
    extraLarge?: number;
  };
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  inStock: boolean;
  stock: number;
  rating: number;
  tags: string[];
  careInstructions?: string;
  season?: string;
  color?: string;
  size?: string;
  createdAt: Date;
  updatedAt: Date;
  selectedSize?: string;
  selectedPrice?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: "small" | "medium" | "large" | "extraLarge";
  selectedPrice: number;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  productCount: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscription {
  email: string;
  subscribedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: "name" | "price" | "rating" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface CartStore {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity?: number,
    size?: "small" | "medium" | "large" | "extraLarge"
  ) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export interface AppStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}
