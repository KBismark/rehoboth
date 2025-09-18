import React from "react";
import {
  Heart,
  Flower,
  Users,
  Award,
  Leaf,
  Sparkles,
  Truck,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About: React.FC = () => {
  const stats = [
    { number: "5K+", label: "Happy Customers", icon: Users },
    { number: "500+", label: "Flower Varieties", icon: Flower },
    { number: "New", label: "Freshly Launched", icon: Award },
    { number: "24/7", label: "Fresh Delivery", icon: Truck },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Beauty",
      description:
        "We believe every moment deserves to be celebrated with the perfect flowers. Our passion drives us to curate the most beautiful arrangements.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We work with local farms and sustainable practices to ensure our flowers are not only beautiful but also environmentally responsible.",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description:
        "Every flower is carefully selected and handled with care. We guarantee freshness and quality, or we make it right.",
    },
    {
      icon: Sparkles,
      title: "Expert Craftsmanship",
      description:
        "Our skilled florists bring years of experience and artistic vision to create stunning arrangements that exceed expectations.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-black/45"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/20 rounded-full blur-xl animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">About</span>
              <br />
              <span className="text-white">Rehoboth Florals</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              At Rehoboth Florals, we're a fresh and passionate floral brand,
              dedicated to crafting arrangements that brighten moments and
              create lasting memories. Though new, our mission is simple
              bringing nature's beauty to every occasion, big or small.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed md:text-xl">
                <p>
                  Rehoboth Florals was founded with a simple belief: flowers
                  have the power to transform moments into memories. Though we
                  are a young and growing business, our passion for creating
                  breathtaking arrangements shines through every design.
                </p>
                <p>
                  From weddings and celebrations to heartfelt gifts, our mission
                  is to craft floral creations that reflect elegance, love, and
                  beauty. At Rehoboth Florals, every bloom is thoughtfully
                  chosen and every arrangement is made with care because your
                  special moments deserve nothing less.
                </p>
                <p>
                  Today, we're proud to serve customers across the country,
                  delivering not just flowers, but joy, love, and beautiful
                  memories. Every arrangement is crafted with care, every
                  delivery is handled with precision, and every customer
                  interaction is treated with the warmth and attention they
                  deserve.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/bouquets/floral-work.jpeg"
                alt="Floral work done"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Vision, Our Craft
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              From unique designs to tailored services, we're here to bring your
              ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="xl" variant="secondary" className="group">
                  Shop Our Collection
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="xl"
                  variant="outline"
                  className="group border-white text-primary hover:bg-white hover:text-primary"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
