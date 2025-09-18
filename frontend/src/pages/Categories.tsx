import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flower, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants";

const Categories: React.FC = () => {
  const categoryStats = {
    "sympathy-and-condolence": {
      count: 45,
      rating: 5,
      featured: "Red Rose Bouquet",
    },
    "love-and-romance": {
      count: 32,
      rating: 5,
      featured: "Spring Tulip Mix",
    },
    everyday: { count: 38, rating: 4.9, featured: "Elegant White Lilies" },
    congratulations: {
      count: 48,
      rating: 4.9,
      featured: "Sunny Sunflower Bundle",
    },
    "event-and-decor": {
      count: 22,
      rating: 5,
      featured: "Exotic Purple Orchids",
    },
    birthday: { count: 67, rating: 4.9, featured: "Birthday Blossoms" },
    "get-well-soon": { count: 27, rating: 4.9, featured: "Healing Blooms" },
    bridal: { count: 50, rating: 5, featured: "Bridal Bliss Bouquet" },
  } as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url(/Fresh-Flower/fresh-flower13.jpg)] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-black/45"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/20 rounded-full blur-xl animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Flower</span>
              <br />
              <span className="text-white">Categories</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated collections of beautiful flowers.
              Each category offers unique varieties perfect for any occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.map((category) => {
              const stats =
                categoryStats[category.id as keyof typeof categoryStats];
              return (
                <Link key={category.id} to={`/shop?category=${category.slug}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm overflow-hidden cursor-pointer h-full">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                      {category.image ? (
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-6xl text-muted-foreground">
                          <Flower />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-bold mb-1">
                          {category.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm">{stats.rating}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        {category.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Featured Product:
                          </span>
                          <span className="font-medium">{stats.featured}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Total Varieties:
                          </span>
                          <span className="font-medium">{stats.count}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Average Rating:
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="font-medium">{stats.rating}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full mt-6 group" variant="outline">
                        Explore {category.name}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Collections</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our most popular categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Romantic Roses",
                description: "Perfect for love and romance",
                count: 25,
                image: "🌹",
                color: "from-red-500/20 to-pink-500/20",
              },
              {
                title: "Spring Tulips",
                description: "Bright and cheerful blooms",
                count: 18,
                image: "🌷",
                color: "from-yellow-500/20 to-orange-500/20",
              },
              {
                title: "Elegant Lilies",
                description: "Pure and sophisticated",
                count: 15,
                image: "🌺",
                color: "from-white/20 to-purple-500/20",
              },
              {
                title: "Bouquet Sunflowers",
                description: "Bringing warmth and joy",
                count: 12,
                image: "🌻",
                color: "from-yellow-500/20 to-orange-500/20",
              },
            ].map((collection, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${collection.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-3xl">{collection.image}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {collection.description}
                  </p>
                  <Badge variant="outline" className="text-xs text-black">
                    {collection.count} varieties
                  </Badge>
                </CardContent>
              </Card>
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
              Find Your Perfect Flowers
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Browse our complete collection and discover the perfect flowers
              for any occasion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="xl" variant="secondary" className="group">
                  Browse All Flowers
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="xl"
                  variant="outline"
                  className="group border-white text-primary hover:bg-white hover:text-primary"
                >
                  Need Help Choosing?
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

export default Categories;
