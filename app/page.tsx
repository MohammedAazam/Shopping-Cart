"use client";

import { useEffect, useState } from "react";
import { MainNav } from "@/components/main-nav";
import { Search, SearchInput } from "@/components/search";
import { UserNav } from "@/components/user-nav";
import { ProductCard } from "@/components/product-card";
import { CheckCheck, ShoppingCart } from "lucide-react";
import { CartSheet } from "@/components/add-cart";
import { OfferBanner } from "@/components/banner";
import { Footer } from "@/components/footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import supabase from "@/lib/supabaseClient";

// Type for a Product
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

// Type for Cart Item (product in cart with quantity)
type CartItem = Product & {
  quantity: number;
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // For search filtering
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showAlert, setShowAlert] = useState(false); // State for controlling the alert visibility

  // Fetch products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, description, price, image_url");

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      const formattedData = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description, // or assign a proper category if available
        price: item.price,
        image: item.image_url,
      }));
      setProducts(formattedData);
      setFilteredProducts(formattedData); // Initialize filtered products
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle search
  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredProducts(products); // Reset to all products if search is empty
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Function to handle adding product to the cart
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);
      if (existingProduct) {
        // If product already exists, increment the quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If product doesn't exist, add it to the cart with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    setShowAlert(true); // Show the alert after adding the product
    setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
  };

  return (
    <>
      {/* Positioning the alert at the top of the page */}
      {showAlert && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 w-2/4 self-center">
          <Alert>
            <CheckCheck className="h-6 w-6 text-white " />
            <AlertTitle>Product Added!</AlertTitle>
            <AlertDescription>
              Your product has been added to the cart.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="fixed top-0 left-0 right-0 w-full bg-white z-50 border-b">
        <div className="flex h-16 items-center px-4">
          <ShoppingCart />
          <h2 className="text-xl font-bold tracking-tight mx-4">Classy Cart</h2>
          <MainNav className="mx-10" />
          <div className="ml-auto flex items-center space-x-4">
            <SearchInput onSearch={handleSearch} />
            <CartSheet cartItems={cartItems} setCartItems={setCartItems} />
            <UserNav />
          </div>
        </div>
      </div>


      <OfferBanner />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mx-0">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}
