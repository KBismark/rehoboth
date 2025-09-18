import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import {
  formatPrice,
  calculateShipping,
  generateOrderNumber,
} from "@/lib/utils";
import { PAYMENT_METHODS } from "@/lib/constants";
import toast from "react-hot-toast";

const checkoutSchema = z.object({
  // Shipping Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please enter a valid state"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
  country: z.string().min(2, "Please enter a valid country"),

  // Payment Information
  cardNumber: z.string().min(16, "Please enter a valid card number"),
  expiryDate: z.string().min(5, "Please enter a valid expiry date"),
  cvv: z.string().min(3, "Please enter a valid CVV"),
  cardName: z.string().min(2, "Please enter the name on the card"),

  // Additional
  saveInfo: z.boolean().optional(),
  newsletter: z.boolean().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit-card");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: "Ghana",
      saveInfo: false,
      newsletter: false,
    },
  });

  const subtotal = getTotal();
  const shipping = calculateShipping(subtotal);
  const tax = 20;
  const total = subtotal + shipping + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order
      const orderNumber = generateOrderNumber();
      const order = {
        id: Date.now().toString(),
        orderNumber,
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.image,
          quantity: item.quantity,
          price: item.product.price,
          total: (item.product.price ?? 0) * item.quantity,
        })),
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        subtotal,
        shipping,
        tax,
        total,
        status: "confirmed" as const,
        paymentMethod: selectedPaymentMethod,
        paymentStatus: "paid" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Clear cart
      clearCart();

      // Navigate to confirmation page
      navigate(`/order-confirmation/${order.id}`);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  function getBasePrice(product: any): number {
    if (typeof product.price === "number") {
      return product.price;
    }
    if (product.prices && typeof product.prices === "object") {
      const values = Object.values(product.prices) as number[];
      return Math.min(...values); // use the smallest price as base
    }
    return 0;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌸</div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">
            Add some beautiful flowers to your cart before checking out.
          </p>
          <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/cart")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
          <h1 className="text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your order to receive your beautiful flowers
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <Card className="border-0 bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <Input
                        {...register("firstName")}
                        placeholder="Enter your first name"
                        className={errors.firstName ? "border-destructive" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <Input
                        {...register("lastName")}
                        placeholder="Enter your last name"
                        className={errors.lastName ? "border-destructive" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        {...register("email")}
                        placeholder="Enter your email"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        {...register("phone")}
                        placeholder="Enter your phone number"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Address *
                    </label>
                    <Input
                      {...register("address")}
                      placeholder="Enter your street address"
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        City *
                      </label>
                      <Input
                        {...register("city")}
                        placeholder="Enter your city"
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        State *
                      </label>
                      <Input
                        {...register("state")}
                        placeholder="Enter your state"
                        className={errors.state ? "border-destructive" : ""}
                      />
                      {errors.state && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        ZIP Code *
                      </label>
                      <Input
                        {...register("zipCode")}
                        placeholder="Enter ZIP code"
                        className={errors.zipCode ? "border-destructive" : ""}
                      />
                      {errors.zipCode && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Country *
                    </label>
                    <Input
                      {...register("country")}
                      placeholder="Enter your country"
                      className={errors.country ? "border-destructive" : ""}
                    />
                    {errors.country && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="border-0 bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {PAYMENT_METHODS.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            selectedPaymentMethod === method.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5" />
                            <div>
                              <div className="font-medium">{method.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {method.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Credit Card Form */}
                  {selectedPaymentMethod === "credit-card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Card Number *
                        </label>
                        <Input
                          {...register("cardNumber")}
                          placeholder="1234 5678 9012 3456"
                          className={
                            errors.cardNumber ? "border-destructive" : ""
                          }
                        />
                        {errors.cardNumber && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.cardNumber.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name on Card *
                        </label>
                        <Input
                          {...register("cardName")}
                          placeholder="Enter name as it appears on card"
                          className={
                            errors.cardName ? "border-destructive" : ""
                          }
                        />
                        {errors.cardName && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.cardName.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Expiry Date *
                          </label>
                          <Input
                            {...register("expiryDate")}
                            placeholder="MM/YY"
                            className={
                              errors.expiryDate ? "border-destructive" : ""
                            }
                          />
                          {errors.expiryDate && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.expiryDate.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            CVV *
                          </label>
                          <Input
                            {...register("cvv")}
                            placeholder="123"
                            className={errors.cvv ? "border-destructive" : ""}
                          />
                          {errors.cvv && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.cvv.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Options */}
              <Card className="border-0 bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        {...register("saveInfo")}
                        className="rounded border-border"
                      />
                      <span className="text-sm">
                        Save my information for future purchases
                      </span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        {...register("newsletter")}
                        className="rounded border-border"
                      />
                      <span className="text-sm">
                        Subscribe to our newsletter for updates and offers
                      </span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-0 bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium">
                          {formatPrice(
                            getBasePrice(item.product) * item.quantity
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="gradient-text">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    type="submit"
                    size="lg"
                    variant="gradient"
                    className="w-full group"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Lock className="mr-2 h-5 w-5" />
                        Place Order
                      </>
                    )}
                  </Button>

                  {/* Security Badge */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4" />
                      <span>Secure checkout guaranteed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
