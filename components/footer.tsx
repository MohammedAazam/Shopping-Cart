import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About ClassyCart */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About ClassyCart</h3>
          <p className="text-sm text-gray-400">
            ClassyCart is your one-stop solution for stylish and high-quality products. Shop with us and experience the best in online shopping.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/shipping" className="hover:underline">
                Shipping & Delivery
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:underline">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="/support" className="hover:underline">
                Support Center
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <div className="flex items-center space-x-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className=" border-gray-700 text-white"
            />
            <Button >Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ClassyCart. All rights reserved.
      </div>
    </footer>
  );
}
