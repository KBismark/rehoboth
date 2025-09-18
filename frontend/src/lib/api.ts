import { Product, Order, Category, ContactForm, ApiResponse, PaginatedResponse, ProductFilters } from '@/types';

const API_BASE_URL = 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.message || 'An error occurred');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, 'Network error occurred');
  }
}

// Products API
export const productsApi = {
  getAll: async (filters?: ProductFilters, page: number = 1, limit: number = 12): Promise<PaginatedResponse<Product>> => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.inStock !== undefined) params.append('inStock', filters.inStock.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    return fetchApi<PaginatedResponse<Product>>(`/products?${params.toString()}`);
  },

  getById: async (id: string): Promise<Product> => {
    return fetchApi<Product>(`/products/${id}`);
  },

  getFeatured: async (): Promise<Product[]> => {
    return fetchApi<Product[]>('/products/featured');
  },

  getByCategory: async (category: string, page: number = 1, limit: number = 12): Promise<PaginatedResponse<Product>> => {
    return fetchApi<PaginatedResponse<Product>>(`/products/category/${category}?page=${page}&limit=${limit}`);
  },

  search: async (query: string, page: number = 1, limit: number = 12): Promise<PaginatedResponse<Product>> => {
    return fetchApi<PaginatedResponse<Product>>(`/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
  }
};

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    return fetchApi<Category[]>('/categories');
  },

  getById: async (id: string): Promise<Category> => {
    return fetchApi<Category>(`/categories/${id}`);
  }
};

// Orders API
export const ordersApi = {
  create: async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    return fetchApi<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getById: async (id: string): Promise<Order> => {
    return fetchApi<Order>(`/orders/${id}`);
  },

  getByOrderNumber: async (orderNumber: string): Promise<Order> => {
    return fetchApi<Order>(`/orders/number/${orderNumber}`);
  }
};

// Contact API
export const contactApi = {
  submitForm: async (formData: ContactForm): Promise<ApiResponse<null>> => {
    return fetchApi<ApiResponse<null>>('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }
};

// Newsletter API
export const newsletterApi = {
  subscribe: async (email: string): Promise<ApiResponse<null>> => {
    return fetchApi<ApiResponse<null>>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
};

export { ApiError };
