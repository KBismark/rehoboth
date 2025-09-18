export const APP_CONFIG = {
  name: "Rehoboth Florals",
  description: "Premium Flower Delivery Service",
  url: "https://bloomandblossom.com",
  email: "rehobothflorals@gmail.com",
  phone: "(055) 935-9481",
  address: "New Achimota",
} as const;

export const COLORS = {
  primary: "#F83600",
  secondary: "#FACC22",
  background: "#FEFEFE",
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
} as const;

export const CATEGORIES = [
  {
    id: "sympathy-and-condolence",
    name: "Sympathy and Condolence",
    description: "Beautiful flowers to express sympathy and condolences",
    image: "/arrangements-in-vases-boxes/flower30.jpeg",
    slug: "Sympathy and Condolence",
  },
  {
    id: "love-and-romance",
    name: "Love and Romance",
    description: "Flowers to celebrate love and romance",
    image: "/arrangements-in-vases-boxes/flower20.jpeg",
    slug: "Love and Romance",
  },
  {
    id: "birthday",
    name: "Birthday",
    description: "Fresh and vibrant flowers perfect for birthdays",
    image: "/arrangements-in-vases-boxes/flower40.JPG",
    slug: "Birthday",
  },
  {
    id: "everyday",
    name: "Everyday",
    description: "Lovely flowers to brighten everyday moments",
    image: "/bouquets/bouquet-flower9.jpeg",
    slug: "Everyday",
  },
  {
    id: "congratulations",
    name: "Congratulations",
    description: "Elegant flowers to celebrate achievements",
    image: "/bouquets/bouquet-flower5.jpeg",
    slug: "Congratulations",
  },
  {
    id: "event-and-decor",
    name: "Event and Decor",
    description: "Beautiful arrangements for events and decorations",
    image: "/arrangements-in-vases-boxes/flower39.jpeg",
    slug: "Event and Decor",
  },
  {
    id: "get-well-soon",
    name: "Get Well Soon",
    description: "Thoughtful flowers to brighten someone's recovery",
    image: "/arrangements-in-vases-boxes/flower13.jpeg",
    slug: "Get Well Soon",
  },
  {
    id: "bridal",
    name: "Bridal",
    description: "Elegant floral arrangements perfect for weddings",
    image: "/Fresh-Flower/fresh-flower1.jpg",
    slug: "Bridal",
  },
] as const;

export const PAYMENT_METHODS = [
  {
    id: "credit-card",
    name: "Credit Card",
    description: "Visa, MasterCard, American Express",
    icon: "credit-card",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay with your PayPal account",
    icon: "paypal",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    description: "Quick and secure payment",
    icon: "smartphone",
  },
] as const;

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/233559359481",
  instagram: "https://instagram.com/rehobothfloral",
} as const;

export const FEATURES = [
  {
    title: "Fresh Daily",
    description: "We source the freshest flowers daily from local farms",
    icon: "flower",
  },
  {
    title: "Expert Arrangement",
    description: "Our florists create stunning arrangements with care",
    icon: "palette",
  },
  {
    title: "Fast Delivery",
    description: "Same-day and express delivery options available",
    icon: "truck",
  },
  {
    title: "Satisfaction Guaranteed",
    description: "100% satisfaction guarantee on all our products",
    icon: "heart",
  },
] as const;
