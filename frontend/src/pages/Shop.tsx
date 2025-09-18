import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Grid,
  List,
  Star,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { Product, ProductFilters } from "@/types";
import { formatPrice } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import toast from "react-hot-toast";
import { shopData } from "@/lib/shopData";

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCartStore();
  // const [selectedSizes, setSelectedSizes] = useState<{
  //   [productId: string]: string;
  // }>({});
  // At the top of your component
  const [selectedSizes, setSelectedSizes] = useState<
    Record<string, "small" | "medium" | "large" | "extraLarge">
  >({});

  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get("category") || "",
    search: searchParams.get("search") || "",
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    inStock: searchParams.get("inStock") === "true" ? true : undefined,
    sortBy: (searchParams.get("sortBy") as any) || "name",
    sortOrder: (searchParams.get("sortOrder") as any) || "asc",
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: searchParams.get("category") || "",
      search: searchParams.get("search") || "",
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      inStock: searchParams.get("inStock") === "true" ? true : undefined,
      sortBy: (searchParams.get("sortBy") as any) || prev.sortBy,
      sortOrder: (searchParams.get("sortOrder") as any) || prev.sortOrder,
    }));
  }, [searchParams]);

  function getBasePrice(product: any): number {
    if (typeof product.price === "number") {
      return product.price;
    }
    if (product.prices && typeof product.prices === "object") {
      const values = Object.values(product.prices).map(Number);
      return Math.min(...values);
    }
    return 0;
  }
  const handleSizeChange = (
    productId: string,
    size: "small" | "medium" | "large" | "extraLarge"
  ) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size, // TS now knows this is one of the valid keys
    }));
  };

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      let filteredProducts = [...shopData];

      // Apply filters
      if (filters.category) {
        filteredProducts = filteredProducts.filter(
          (p) => p.category === filters.category
        );
      }
      if (filters.search) {
        filteredProducts = filteredProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
            p.description.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(
          (p) => getBasePrice(p) >= filters.minPrice!
        );
      }
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(
          (p) => getBasePrice(p) <= filters.maxPrice!
        );
      }
      if (filters.inStock) {
        filteredProducts = filteredProducts.filter((p) => p.inStock);
      }

      filteredProducts.sort((a, b) => {
        if (filters.sortBy === "price") {
          return getBasePrice(a) - getBasePrice(b);
        }
        let aValue: any = a[filters.sortBy!];
        let bValue: any = b[filters.sortBy!];
        return aValue > bValue ? 1 : -1;
      });

      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.id] || "small";
    addItem(product, 1, size);
    toast.success(`${product.name} (${size}) added to cart!`);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      search: "",
      minPrice: undefined,
      maxPrice: undefined,
      inStock: undefined,
      sortBy: "name",
      sortOrder: "asc",
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Shop Flowers</h1>
          <p className="text-xl text-muted-foreground">
            Discover our beautiful collection of fresh flowers
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search flowers..."
                    value={filters.search || ""}
                    onChange={(e) =>
                      handleFilterChange({ search: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={!filters.category}
                      onChange={(e) =>
                        handleFilterChange({
                          category: e.target.value || undefined,
                        })
                      }
                      className="mr-2"
                    />
                    All Categories
                  </label>
                  {CATEGORIES.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.name}
                        checked={filters.category === category.name}
                        onChange={(e) =>
                          handleFilterChange({ category: e.target.value })
                        }
                        className="mr-2"
                      />
                      {category.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock || false}
                    onChange={(e) =>
                      handleFilterChange({
                        inStock: e.target.checked || undefined,
                      })
                    }
                    className="mr-2"
                  />
                  In Stock Only
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {products.length} products found
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split("-");
                    handleFilterChange({
                      sortBy: sortBy as any,
                      sortOrder: sortOrder as any,
                    });
                  }}
                  className="px-3 py-2 border rounded-md bg-white cursor-pointer appearance-none  focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  title="Sort products by"
                  aria-label="Sort products by"
                >
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="price-asc">Price Low to High</option>
                  <option value="price-desc">Price High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                </select>

                {/* View Mode */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-square bg-muted"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {product.originalPrice && (
                        <Badge
                          variant="destructive"
                          className="absolute top-4 left-4"
                        >
                          Sale
                        </Badge>
                      )}
                      {/* <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div> */}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({product.rating})
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Price & Size Selector */}
                      <div className="flex flex-col gap-2 mb-4">
                        {product.prices && (
                          <select
                            value={selectedSizes[product.id] || "small"}
                            onChange={(e) =>
                              handleSizeChange(
                                product.id,
                                e.target.value as
                                  | "small"
                                  | "medium"
                                  | "large"
                                  | "extraLarge"
                              )
                            }
                            className="w-full px-3 py-2 border rounded-lg bg-white text-gray-700 
                           focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary 
                           appearance-none cursor-pointer shadow-sm"
                          >
                            {Object.keys(product.prices || {}).map((size) => (
                              <option key={size} value={size}>
                                {size.charAt(0).toUpperCase() + size.slice(1)} -{" "}
                                {formatPrice(
                                  product.prices![
                                    size as keyof typeof product.prices
                                  ]!
                                )}
                              </option>
                            ))}
                          </select>
                        )}
                        <span className="text-xl font-bold gradient-text">
                          {product.prices
                            ? formatPrice(
                                product.prices[
                                  selectedSizes[product.id] || "small"
                                ]! // TS now knows this is valid
                              )
                            : formatPrice(product.price!)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 group"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Link to={`/product/${product.id}`}>
                          <Button
                            variant="outline"
                            size="icon"
                            className="group"
                          >
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
