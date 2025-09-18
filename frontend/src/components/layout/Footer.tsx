import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "All Flowers", href: "/shop" },
      { name: "Love Flower", href: "/shop?category=Love and Romance" },
      {
        name: "Sympathy Flowers",
        href: "/shop?category=Sympathy and Condolence",
      },
      { name: "Everyday Flowers", href: "/shop?category=Everyday" },
      {
        name: "Congratulation Flowers",
        href: "/shop?category=Congratulations",
      },
      { name: "Bridal", href: "/shop?category=Bridal" },
      { name: "Event and Decor", href: "/shop?category=Event and Decor" },
      { name: "Get Well Soon", href: "/shop?category=Get Well Soon" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Size Guide", href: "/size-guide" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { name: "WhatsApp", icon: MessageCircle, href: SOCIAL_LINKS.whatsapp },
    { name: "Instagram", icon: Instagram, href: SOCIAL_LINKS.instagram },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img
                src="/icons/background-logo.jpeg"
                alt="Rehoboth"
                className="w-16 h-16"
              />
              <h3 className="text-2xl font-bold">Stay in Rehoboth</h3>
            </div>
            <p className="text-gray-400 md:text-xl mb-6 max-w-2xl mx-auto">
              Follow us on Instagram and stay inspired with our latest floral
              designs, behind-the-scenes moments, and seasonal collections
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto justify-center">
              <a
                href="https://instagram.com/rehobothfloral"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="gradient"
                  className="md:px-8 whitespace-nowrap"
                >
                  Follow on Instagram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/icons/background-logo.jpeg"
                alt="Rehoboth"
                className="w-16 h-16"
              />
              <span className="text-xl md:text-2xl font-bold">
                Rehoboth Florals
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Creating beautiful floral arrangements for life's most precious
              moments. From weddings to sympathy flowers, we bring nature's
              beauty to your special occasions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm md:text-xl">{APP_CONFIG.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm md:text-xl">{APP_CONFIG.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm md:text-xl">{APP_CONFIG.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-lg hover:bg-primary transition-colors"
                    title={`Visit our ${social.name} page`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4 md:text-2xl">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm md:text-xl"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 md:text-2xl">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm md:text-xl"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4 md:text-2xl">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm md:text-xl"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm md:text-xl">
              © {currentYear} Rehoboth Florals. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-400 hover:text-primary transition-colors text-sm md:text-xl"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
