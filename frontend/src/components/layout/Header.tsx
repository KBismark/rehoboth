import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { cn } from "@/lib/utils";
import { shopData } from "@/lib/shopData";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCartStore();
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const filteredProducts = shopData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <header className="sticky top-0 z-50 w-full py-5 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <img
                src="/icons/rehoboth-icon2.jpeg"
                alt="Rehoboth"
                className="md:w-16 md:h-16 h-10 w-10 rounded-full md:block"
              />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-secondary rounded-full animate-bounce-gentle"></div>
            </div>
            <span className="text-xl italic md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Rehoboth Florals
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-xl font-medium transition-colors hover:text-primary relative group",
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"></div>
                )}
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center md:space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getItemCount() > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
                  >
                    {getItemCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                type="text"
                placeholder="Search for flowers..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {searchTerm && (
              <div className="mt-2 bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/shop?category=${encodeURIComponent(
                        product.category
                      )}&search=${encodeURIComponent(product.name)}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      {product.name}
                      <span className="text-xs text-muted-foreground">
                        ({product.category})
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-2 text-sm text-muted-foreground">
                    No products found
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t animate-fade-in">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
