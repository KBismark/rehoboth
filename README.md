# Rehoboth Floral Website

A full-stack flower e-commerce application with React frontend and Express backend, designed to be deployed on Vercel.

## Project Structure

- `frontend/` - React application built with Vite
- `src/` - Express server (TypeScript)
- `public/` - Static files served by Express (auto-generated during build)
- `dist/` - Compiled JavaScript server (auto-generated during build)

## Prerequisites

- Node.js 18+
- npm (recommended) or pnpm

## Installation

1. Install root dependencies:
   ```bash
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend && npm install
   ```

## Running the Application

### 🚀 Development Modes

#### 1. Full Development (Recommended)
Runs both frontend and backend with hot reload:
```bash
npm run dev:full
```
- **Frontend**: `http://localhost:5173` (Vite dev server with hot reload)
- **Backend**: `http://localhost:3001` (Express server with hot reload)
- **Features**: Hot reload, images accessible, full development experience

#### 2. Server Development Only
Runs only the Express server (frontend must be built first):
```bash
npm run dev
```
- **Process**: Builds frontend → Copies to public → Starts server with hot reload
- **Server**: `http://localhost:3001`
- **Features**: Serves built frontend + images, server hot reload

#### 3. Frontend Development Only
Runs only the Vite development server:
```bash
npm run dev:frontend
```
- **Frontend**: `http://localhost:5173`
- **Features**: Hot reload, images accessible via Vite configuration

#### 4. Server Only (No Hot Reload)
Runs the Express server without hot reload:
```bash
npm run dev:server
```
- **Server**: `http://localhost:3001`
- **Note**: Requires frontend to be built first

### 🏭 Production Modes

#### 1. Production Build
Builds the application for production:
```bash
npm run build
```
**Process:**
1. Builds React frontend (`frontend/dist/`)
2. Copies frontend files to `public/` directory
3. Compiles TypeScript server (`src/` → `dist/`)

#### 2. Production Start
Starts the application with compiled JavaScript:
```bash
npm start
```
- **Server**: `http://localhost:3001`
- **Features**: Serves built frontend + images, production-ready

#### 3. Vercel Simulation (Recommended for Testing)
Mimics the exact Vercel deployment process:
```bash
npm run vercel:dev
```
**Process:**
1. `npm run vercel:build` - Builds frontend and server
2. `npm run vercel:start` - Starts with compiled JavaScript

**Individual Vercel Commands:**
```bash
npm run vercel:build  # Build only
npm run vercel:start  # Start only
```

### 🔧 Build Commands

#### Frontend Build
```bash
npm run build:frontend
```
- Builds only the React frontend
- Output: `frontend/dist/`

#### Server Build
```bash
npm run build:server
```
- Compiles TypeScript server
- Output: `dist/index.js`

## Environment Configuration

The application uses environment variables for configuration:

### `.env` File
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Server URL (for CORS and other configurations)
SERVER_URL=http://localhost:3001

# Frontend URL (for CORS configuration)
FRONTEND_URL=http://localhost:5173
```

### Environment Variables
- **PORT**: Server port (default: 3001)
- **NODE_ENV**: Environment mode (development/production)
- **SERVER_URL**: Backend server URL
- **FRONTEND_URL**: Frontend development server URL

## API Endpoints

### Health Check
```bash
GET /api/health
```
Returns server status and uptime information.

### Static Files
All static files are served from the `public/` directory:
- **Images**: `/bouquets/`, `/arrangements-in-vases-boxes/`, etc.
- **Frontend**: `/index.html`, `/assets/`

## Security Features

- **Helmet.js**: Security headers protection
- **CORS**: Cross-origin resource sharing configuration
- **Content Security Policy**: XSS protection
- **Environment Variables**: Secure configuration management

## Deployment on Vercel

The application is configured to deploy on Vercel with the following setup:

### Build Process
1. **Frontend Build**: `cd frontend && npm run build`
2. **Server Build**: `npm run build:server` (compiles TypeScript + copies frontend files)
3. **Static Files**: Served from `public/` directory by Vercel CDN
4. **API Routes**: Express server handles `/api/*` routes
5. **SPA Routing**: All other routes serve the React app for client-side routing

### Vercel Configuration

The `vercel.json` file configures:
- **Build Command**: `cd frontend && npm run build && cd .. && npm run build:server`
- **Install Command**: `npm install && cd frontend && npm install`
- **Output Directory**: `public`
- **Server Function**: Express server as a Vercel Function
- **Routing**: API routes and SPA routing

### Deployment Steps
1. Connect your Git repository to Vercel
2. Vercel will automatically detect the configuration
3. Build and deploy using the configured commands
4. Static files served via Vercel CDN
5. API routes handled by serverless functions

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution**: Kill the process using port 3001 or change the PORT in `.env`

#### Images Not Loading
**Development**: Ensure Vite is configured to serve from `public/` directory
**Production**: Verify images are in the `public/` directory

#### CORS Errors
**Solution**: Check that `FRONTEND_URL` and `SERVER_URL` are correctly set in `.env`

#### Build Failures
**Solution**: Ensure all dependencies are installed:
```bash
npm install
cd frontend && npm install
```

## Current Features

- ✅ React frontend with modern UI components
- ✅ Express server with TypeScript
- ✅ Static file serving (images, built frontend)
- ✅ Health check API endpoint
- ✅ Security headers (Helmet.js)
- ✅ CORS configuration
- ✅ Environment variable configuration
- ✅ Vercel deployment configuration
- ✅ Multiple development modes
- ✅ Production build simulation

## Future Enhancements

- API endpoints for products, orders, contact forms
- Database integration
- Payment processing
- Admin dashboard
- User authentication
- Email notifications
- Image optimization
- Performance monitoring
