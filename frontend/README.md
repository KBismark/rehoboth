# Rehoboth Florals - Flower E-commerce Application

A beautiful, modern flower e-commerce application built with React, TypeScript, and Express.js. Features a compelling landing page, product catalog, shopping cart, checkout process, and invoice generation.

## 🌸 Features

- **Modern UI/UX**: Beautiful, responsive design with custom theme colors (#F83600, #FACC22, #FEFEFE)
- **Product Catalog**: Browse flowers by category with filtering and search
- **Shopping Cart**: Add/remove items with quantity management
- **Checkout Process**: Complete order flow with form validation
- **Invoice Generation**: Download PDF receipts for completed orders
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Blur effects, transitions, and floating animations
- **No Authentication**: Simplified user experience without sign-up/sign-in

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **Zustand** for state management
- **React Hook Form** with Zod validation
- **Lucide React** for icons
- **jsPDF** for invoice generation

### Backend

- **Express.js** with TypeScript
- **CORS** for cross-origin requests
- **Helmet** for security
- **Morgan** for logging
- **Zod** for validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd flower-ecommerce
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Start the development servers**

   ```bash
   # Start both frontend and backend
   npm run dev:full

   # Or start them separately:
   # Frontend only
   npm run dev

   # Backend only
   npm run server
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
flower-ecommerce/
├── src/                          # Frontend source code
│   ├── components/               # Reusable components
│   │   ├── ui/                  # Base UI components (shadcn/ui)
│   │   └── layout/              # Layout components (Header, Footer)
│   ├── pages/                   # Page components
│   ├── stores/                  # Zustand stores
│   ├── types/                   # TypeScript type definitions
│   ├── lib/                     # Utility functions and constants
│   └── App.tsx                  # Main app component
├── server/                      # Backend source code
│   └── src/
│       ├── routes/              # API routes
│       ├── types.ts             # Backend type definitions
│       └── index.ts             # Server entry point
├── public/                      # Static public
└── package.json                 # Frontend dependencies
```

## 🎨 Design System

### Colors

- **Primary**: #F83600 (Orange-red)
- **Secondary**: #FACC22 (Yellow)
- **Background**: #FEFEFE (Off-white)
- **Gradients**: Linear gradients using primary and secondary colors

### Typography

- Clean, modern font stack
- Responsive text sizing
- Gradient text effects for headings

### Components

- Glass morphism effects with backdrop blur
- Smooth transitions and hover effects
- Floating animations for decorative elements
- Custom button variants with gradients

## 🛒 E-commerce Features

### Product Management

- Product catalog with categories
- Search and filtering
- Product detail pages
- Stock management
- Rating system

### Shopping Experience

- Add to cart functionality
- Quantity management
- Cart persistence (localStorage)
- Order summary
- Shipping calculations

### Checkout Process

- Multi-step checkout form
- Form validation with Zod
- Payment method selection
- Order confirmation
- Invoice generation and download

## 📱 Pages

1. **Home** - Compelling landing page with hero section
2. **Shop** - Product catalog with filtering
3. **Product Detail** - Individual product pages
4. **Cart** - Shopping cart management
5. **Checkout** - Order placement
6. **Order Confirmation** - Success page with invoice
7. **About** - Company information
8. **Contact** - Contact form and information
9. **Categories** - Browse by flower categories

## 🔧 API Endpoints

### Products

- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search` - Search products

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/number/:orderNumber` - Get order by order number
- `PATCH /api/orders/:id/status` - Update order status

### Contact & Newsletter

- `POST /api/contact` - Submit contact form
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Railway/Heroku)

```bash
cd server
npm run build
# Deploy with start script: npm start
```

## 🎯 Future Enhancements

- [ ] User authentication and accounts
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Payment gateway integration
- [ ] Inventory management
- [ ] Order tracking
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, email patriciashilohkanneh12@gmail.com or create an issue in the repository.

---

Made with ❤️ and 🌸 by shekinahwebdev
