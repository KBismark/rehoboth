import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { APP_CONFIG } from "@/lib/constants";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        "service_b39jt7h",
        "template_y2m51x9",
        {
          name: data.name,
          email: data.email,
          message: data.message,
          subject: data.subject,
        },
        "PiwRVmlBMsq1h1u8k"
      );

      console.log("Email sent:", result.text);
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: APP_CONFIG.phone,
      description: "Call us for immediate assistance",
    },
    {
      icon: Mail,
      title: "Email",
      details: APP_CONFIG.email,
      description: "Send us an email anytime",
    },
    {
      icon: MapPin,
      title: "Address",
      details: APP_CONFIG.address,
      description: "Visit our beautiful store",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Fri: 8AM-8PM, Sat-Sun: 8AM-8PM",
      description: "We're here to help you",
    },
  ];

  const faqs = [
    {
      question: "What if I'm not satisfied with my order?",
      answer:
        "We offer a 100% satisfaction guarantee. If you're not happy with your flowers, we'll make it right.",
    },
    {
      question: "Can I customize my flower arrangement?",
      answer:
        "Absolutely! We love creating custom arrangements. Just let us know your preferences when placing your order.",
    },
    {
      question: "Do you offer corporate services?",
      answer:
        "Yes, we provide corporate flower services including office plants, event decorations, and regular deliveries.",
    },
    {
      question: "How do I care for my flowers?",
      answer:
        "We include care instructions with every order. Generally, keep flowers in cool water and trim stems daily.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0  bg-[url(/bouquets/bouquet-flower7.jpeg)]  bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-black/45"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/20 rounded-full blur-xl animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <MessageCircle className="h-8 w-8 text-primary" />
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="gradient-text">Contact</span>
                <span className="text-white"> Us</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-muted/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you! Whether you have questions about our
              flowers, need help with an order, or just want to say hello, we're
              here to help.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm md:text-xl font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        {...register("name")}
                        placeholder="Enter your name"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm md:text-xl font-medium mb-2">
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
                  </div>

                  <div>
                    <label className="block text-sm md:text-xl font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      {...register("subject")}
                      placeholder="What's this about?"
                      className={errors.subject ? "border-destructive" : ""}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm md:text-xl font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      className={`w-full px-3 py-2 border rounded-md bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                        errors.message ? "border-destructive" : "border-input"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    variant="gradient"
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="border-0 bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 md:text-xl">
                          {info.title}
                        </h3>
                        <p className="text-sm font-medium text-primary mb-1">
                          {info.details}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Response */}
            <Card className="border-0 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We typically respond to all inquiries within 2-4 hours during
                  business hours.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a href="tel:+233559359481">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border-0 bg-white/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="mt-20">
          <Card className="border-0 bg-white/50 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Visit Our Store
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-[url(public/map.png)] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary/50 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Map Location</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Don't hesitate to reach out! We're here to help make your flower
              experience perfect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="gradient" className="group">
                <a href="tel:+233559359481">
                  <Phone className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Call Us Now
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <a href="mailto:rehobothflorals@gmail.com">
                  <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Email Support
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
