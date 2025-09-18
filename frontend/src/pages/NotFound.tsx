import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-0 bg-white/50 backdrop-blur-sm">
            <CardContent className="p-12">
              {/* 404 Animation */}
              <div className="mb-8">
                <div className="text-6xl font-bold gradient-text mb-2">404</div>
                <div className="text-2xl font-semibold text-muted-foreground">
                  Page Not Found
                </div>
              </div>

              {/* Error Message */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">
                  Oops! Something went wrong
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  The page you're looking for doesn't exist or has been moved.
                  Don't worry, even the most beautiful flowers sometimes get
                  lost in the garden!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link to="/">
                  <Button size="lg" variant="gradient" className="group">
                    <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Go Home
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="group"
                >
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  Go Back
                </Button>
              </div>

              {/* Search Suggestion */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Looking for something specific?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try searching for flowers, categories, or browse our popular
                  pages:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link to="/shop">
                    <Button variant="outline" size="sm">
                      Shop Flowers
                    </Button>
                  </Link>
                  <Link to="/categories">
                    <Button variant="outline" size="sm">
                      Categories
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="sm">
                      About Us
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Help Text */}
              <div className="mt-8 text-sm text-muted-foreground">
                <p>
                  If you believe this is an error, please{" "}
                  <Link to="/contact" className="text-primary hover:underline">
                    contact our support team
                  </Link>{" "}
                  and we'll help you find what you're looking for.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
