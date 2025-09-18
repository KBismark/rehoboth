import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CheckCircle } from "lucide-react";
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
import { usePaystackPayment } from "react-paystack";
import toast from "react-hot-toast";

const checkoutSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  //   state: z.string().min(2),
  zipCode: z.string().min(5),
  country: z.string().min(2),
  saveInfo: z.boolean().optional(),
  newsletter: z.boolean().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout1: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    watch,
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

  const getBasePrice = (product: any) => {
    if (typeof product.price === "number") return product.price;
    if (product.prices && typeof product.prices === "object") {
      return Math.min(...(Object.values(product.prices) as number[]));
    }
    return 0;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">
            Add some beautiful flowers to your cart before checking out.
          </p>
          <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const publicKey = "pk_test_8d670be854a83d437e452e5a0aab6954cd448242"; // Replace with your Paystack public key
  const amountInKobo = total * 100; // Paystack expects amount in kobo (smallest currency unit)
  const componentProps = {
    email: watch("email"),
    amount: amountInKobo,
    currency: "GHS",
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: `${watch("firstName")} ${watch("lastName")}`,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: watch("phone"),
        },
      ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (response: any) => handleOrderCreation(response),
    onClose: () => toast("Payment was not completed!"),
  };
  const initializePayment = usePaystackPayment(componentProps);

  const handleOrderCreation = (paymentResponse: any) => {
    const orderNumber = generateOrderNumber();
    const order = {
      id: Date.now().toString(),
      orderNumber,
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.quantity,
        price: getBasePrice(item.product),
        total: getBasePrice(item.product) * item.quantity,
      })),
      shippingAddress: {
        firstName: watch("firstName"),
        lastName: watch("lastName"),
        email: watch("email"),
        phone: watch("phone"),
        address: watch("address"),
        city: watch("city"),
        // state: watch("state"),
        zipCode: watch("zipCode"),
        country: watch("country"),
      },
      subtotal,
      //   shipping,
      tax,
      total,
      status: "confirmed" as const,
      paymentMethod: "paystack" as const,
      paymentStatus: "paid" as const,
      paystackResponse: paymentResponse,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    localStorage.setItem(`order-${order.id}`, JSON.stringify(order));
    navigate(`/order-confirmation/${order.id}`);

    clearCart();
    toast.success("Order placed successfully!");
  };

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

        <form>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Info Card */}
              <Card className="border-0 bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Order Information</CardTitle>
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
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-0 bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0">
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
                          {formatPrice(item.selectedPrice * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
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

                  {/* Paystack Button */}
                  <Button
                    type="button"
                    size="lg"
                    variant="gradient"
                    className="w-full mt-4"
                    onClick={handleSubmit(() => {
                      initializePayment(componentProps); // opens Paystack modal after form validation
                    })}
                  >
                    Pay Now
                  </Button>

                  <div className="text-center mt-3">
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

export default Checkout1;
