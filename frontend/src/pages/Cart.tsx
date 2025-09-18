import React from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, calculateShipping } from "@/lib/utils";
import toast from "react-hot-toast";

const Cart: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotal,
    getItemCount,
  } = useCartStore();

  const subtotal = getTotal();
  const shipping = calculateShipping(subtotal);
  const tax = 20;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      toast.success("Item removed from cart");
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any flowers to your cart yet. Start
              shopping to fill it with beautiful blooms!
            </p>
            <Link to="/shop">
              <Button size="lg" variant="gradient" className="group">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {getItemCount()} {getItemCount() === 1 ? "item" : "items"} in your
            cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="border-0 bg-white/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24  rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold truncate">
                            {item.product.name}
                            <div>
                              Size:{" "}
                              <span className="gradient-text ">
                                {item.selectedSize ?? "N/A"}
                              </span>
                            </div>
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.product.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 min-w-[2rem] text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-lg font-semibold gradient-text">
                              {formatPrice(item.selectedPrice * item.quantity)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-muted-foreground">
                                {formatPrice(item.selectedPrice)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Cart Actions */}
            <div className="flex justify-between items-center pt-4">
              <Link to="/shop">
                <Button variant="outline" className="group">
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleClearCart}
                className="text-muted-foreground hover:text-destructive"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 bg-white/50 z-10 backdrop-blur-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="gradient-text">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link to="/checkout" className="block mt-6">
                  <Button size="lg" variant="gradient" className="w-full group">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                {/* Security Badge */}
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
