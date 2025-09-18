import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle,
  Download,
  Mail,
  Calendar,
  MapPin,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";
import emailjs from "emailjs-com";

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      if (orderId) {
        const savedOrder = localStorage.getItem(`order-${orderId}`);
        if (savedOrder) {
          const parsed = JSON.parse(savedOrder);

          // 🔹 Convert date strings back to Date objects
          parsed.createdAt = new Date(parsed.createdAt);
          parsed.updatedAt = new Date(parsed.updatedAt);

          setOrder(parsed);
          if (parsed.shippingAddress && parsed.shippingAddress.email) {
            sendEmailConfirmation(parsed);
          } else {
            console.warn("Order missing shippingAddress or email:", parsed);
          }
          // sendEmailConfirmation(parsed);
        } else {
          console.warn("No saved order found!");
        }
      }
      setLoading(false);
    }, 500);
  }, [orderId]);

  const downloadInvoice = () => {
    if (!order) {
      toast.error("Order data not ready yet!");
      return;
    }

    const element = document.getElementById("invoice-content");
    if (!element) {
      toast.error("Invoice content not found!");
      return;
    }

    const options = {
      margin: 10,
      filename: `invoice-${order.orderNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        toast.success("Invoice downloaded successfully!");
      })
      .catch((error: any) => {
        console.error("Error generating PDF:", error);
        toast.error("Failed to download invoice");
      });
  };

  const sendEmailConfirmation = (order: any) => {
    emailjs
      .send(
        "service_b39jt7h",
        "template_gyevdlq",
        {
          to_email: order.shippingAddress.email,
          name: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
          order_number: order.orderNumber,
          total: order.total,
          address: order.shippingAddress.address,
          city: order.shippingAddress.city,
          country: order.shippingAddress.country,
        },
        "PiwRVmlBMsq1h1u8k"
      )
      .then(() => {
        toast.success("Confirmation email sent!");
      })
      .catch((error) => {
        console.error("Email send error:", error);
        toast.error("Failed to send email");
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Order not found</h2>
          <p className="text-muted-foreground mb-4">
            The order you're looking for doesn't exist.
          </p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Thank you for your order. We'll send you a confirmation email
            shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={downloadInvoice}
              variant="outline"
              className="group"
            >
              <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              Download Invoice
            </Button>
            <Button
              onClick={sendEmailConfirmation}
              variant="outline"
              className="group"
            >
              <Mail className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              Send Email
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card className="border-0 bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Summary</span>
                  <Badge variant="gradient">{order.orderNumber}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{item.productName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Price: {formatPrice(item.price)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {formatPrice(item.total)}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="border-0 bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.email}
                  </p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="border-0 bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium capitalize">
                      {order.paymentMethod.replace("-", " ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Payment Status: {order.paymentStatus}
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.paymentStatus === "paid" ? "default" : "destructive"
                    }
                  >
                    {order.paymentStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Status & Actions */}
          <div className="space-y-6">
            {/* Order Status */}
            <Card className="border-0 bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                {order.estimatedDelivery && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.estimatedDelivery)}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Total */}
            <Card className="border-0 bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Order Total</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="gradient-text">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-0 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <Link to="/shop" className="block">
                  <Button variant="outline" className="w-full group">
                    Continue Shopping
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  onClick={downloadInvoice}
                  variant="gradient"
                  className="w-full group"
                >
                  <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  Download Receipt
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hidden Invoice Content for PDF Generation */}
        <div id="invoice-content" className="bg-white py-8 max-w-4xl mx-auto">
          <div className="bg-white px-5 max-w-4xl mx-auto">
            {/* Invoice Header */}
            <div className="text-center mb-8 flex flex-col items-center">
              <div>
                <img
                  src="/icons/rehoboth-icon2.jpeg"
                  alt="Rehoboth"
                  className="md:w-16 md:h-16 h-10 w-10 rounded-full md:block"
                />
              </div>
              <p className="text-muted-foreground mt-4">Flower Delivery</p>
              <p className="text-sm text-muted-foreground">New Achimota</p>
              <p className="text-sm text-muted-foreground">
                rehobothflorals@gmail.com | (055) 935-9481
              </p>
            </div>

            <Separator className="mb-8" />

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
                <p className="font-medium">
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="text-muted-foreground break-words">
                  {order.shippingAddress.email}
                </p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.phone}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Invoice Details:</h3>
                <p>
                  <strong>Invoice Number:</strong> {order.orderNumber}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(order.createdAt)}
                </p>
                <p>
                  <strong>Payment Method:</strong>{" "}
                  {order.paymentMethod.replace("-", " ")}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Item</th>
                    <th className="text-center py-3 px-4">Quantity</th>
                    <th className="text-right py-3 px-4">Price</th>
                    <th className="text-right py-3 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{item.productName}</p>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">{item.quantity}</td>
                      <td className="text-right py-3 px-4">
                        {formatPrice(item.price)}
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        {formatPrice(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="max-w-xs md:ml-0 ml-12 flex flex-col justify-center">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-sm text-muted-foreground">
              <p>Thank you for choosing Rehoboth Florals!</p>
              <p>
                For any questions about this order, please contact us at
                rehobothflorals@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
