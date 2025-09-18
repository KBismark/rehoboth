import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Truck,
  Heart,
  Sparkles,
  Flower,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FEATURES, CATEGORIES } from "@/lib/constants";

const Home: React.FC = () => {
  const featuredProducts = [
    {
      id: "1",
      name: "White Lilies Sympathy Arrangement",
      price: 1500,
      originalPrice: 2000,
      image: "/arrangements-in-vases-boxes/flower10.jpg",
      rating: 4.9,
      reviews: 128,
      badge: "New",
    },
    {
      id: "2",
      name: "Bound by Love",
      price: 3000,
      image: "/arrangements-in-vases-boxes/flower22.jpeg",
      rating: 5,
      reviews: 95,
      badge: "New",
    },
    {
      id: "3",
      name: "Bridal Bliss Bouquet",
      price: 1000,
      image: "/Fresh-Flower/fresh-flower15.jpeg",
      rating: 5,
      reviews: 86,
      badge: "Premium",
    },
    {
      id: "4",
      name: "Colors of Celebration",
      price: 700,
      image: "/bouquets/bouquet-flower19.jpeg",
      rating: 4.7,
      reviews: 112,
      badge: "Popular",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-black/45"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/15 rounded-full blur-lg animate-bounce-gentle"></div>

        {/* Floating Elements */}
        <div className="absolute top-32 right-32 floating-animation">
          <Flower className="h-12 w-12 text-primary/30" />
        </div>
        <div className="absolute bottom-32 left-32 floating-animation animation-delay-2s">
          <Leaf className="h-10 w-10 text-secondary/40" />
        </div>
        <div className="absolute top-1/3 right-1/4 floating-animation animation-delay-4s">
          <Sparkles className="h-8 w-8 text-primary/25" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Rehoboth Florals Shop</span>
              <br />
              <span className="text-white">
                {" "}
                A Perfect Bouquet for Every Occasion
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover the beauty of fresh flowers handcrafted with love to
              bring joy, celebrate milestones, and make every moment
              unforgettable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/shop">
                <Button
                  size="xl"
                  variant="gradient"
                  className="group px-20 py-7"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  size="xl"
                  variant="outline"
                  className="group px-20 py-7"
                >
                  Explore Categories
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold gradient-text">
                  5K+
                </div>
                <div className="text-muted/70 md:text-xl">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold gradient-text">
                  500+
                </div>
                <div className="text-muted/70 md:text-xl">Flower Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold gradient-text">
                  24/7
                </div>
                <div className="text-muted/70 md:text-xl">Fresh Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Rehoboth</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the highest quality flowers and
              exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon =
                feature.icon === "flower"
                  ? Flower
                  : feature.icon === "palette"
                  ? Sparkles
                  : feature.icon === "truck"
                  ? Truck
                  : Heart;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Collections</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our most popular and beautiful flowers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-square flex items-center justify-center">
                    <img
                      src={product.image}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
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
                      ({product.reviews})
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold gradient-text">
                      GH₵{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        GH₵{product.originalPrice}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button size="xl" variant="outline" className="group">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect flowers for any occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.map((category) => (
              <Link key={category.id} to={`/shop?category=${category.slug}`}>
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm overflow-hidden cursor-pointer">
                  <div className="aspect-video flex items-center justify-center relative overflow-hidden">
                    <img
                      src={category.image}
                      className="w-full h-full object-cover"
                    />
                    {/* <Flower className="h-16 w-16 text-primary/40 group-hover:scale-110 transition-transform duration-300" /> */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <p className="text-sm opacity-90">
                        {category.description
                          ? category.description
                          : "Explore our collection"}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Brighten Someone's Day?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              From timeless bouquets to custom creations, we're here to craft
              arrangements that make every moment unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="xl" variant="secondary" className="group">
                  Start Shopping
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

export default Home;
