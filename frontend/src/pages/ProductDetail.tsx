import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";
import { shopData } from "@/lib/shopData";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState<
    "small" | "medium" | "large" | "extraLarge"
  >("small");

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const selectedProduct = shopData.find((item) => item.id === id);
      setProduct(selectedProduct || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const size = selectedSize; // use the single selectedSize state
    addItem(product, quantity, size);

    toast.success(`${product.name} (${size}) added to cart!`);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p className="text-muted-foreground mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">
            Shop
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-8xl">
                <img
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.image.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-2xl">
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating})
                </span>
              </div>
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
              {["small", "medium", "large", "extraLarge"].map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() =>
                    setSelectedSize(
                      size as "small" | "medium" | "large" | "extraLarge"
                    )
                  }
                  disabled={
                    !product.prices?.[size as keyof typeof product.prices]
                  }
                >
                  {size} -{" "}
                  {formatPrice(
                    product.prices?.[size as keyof typeof product.prices] || 0
                  )}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold gradient-text">
                {product.prices
                  ? formatPrice(product.prices[selectedSize]!)
                  : formatPrice(product.price!)}
              </span>
              {product.prices && (
                <span className="text-sm text-muted-foreground">
                  ({selectedSize})
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Category:</span>
                <span className="ml-2 capitalize">{product.category}</span>
              </div>
              <div>
                <span className="font-medium">Color:</span>
                <span className="ml-2 capitalize">{product.color}</span>
              </div>
              <div>
                <span className="font-medium">Size:</span>
                <span className="ml-2 capitalize">{product.size}</span>
              </div>
              <div>
                <span className="font-medium">Season:</span>
                <span className="ml-2 capitalize">{product.season}</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm">
                {product.inStock ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div>
              <span className="font-medium mb-2 block">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-x text-black"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Care Instructions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Care Instructions
                </h3>
                <p className="text-muted-foreground">
                  {product.careInstructions}
                </p>
              </CardContent>
            </Card>

            {/* Guarantee */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Our Guarantee</h3>
                <p className="text-muted-foreground text-sm">
                  We guarantee the freshness and quality of all our flowers. If
                  you're not completely satisfied, we'll make it right.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
