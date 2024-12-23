import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation"; // Correct import

export function CartSheet({ cartItems, setCartItems }) {
  const router = useRouter();

  // Function to remove item from the cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to increase item quantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity is 0 or less
    );
  };

  // Function to handle "Proceed to Checkout"
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items to proceed to checkout.");
      return;
    }

    // Navigate to the Checkout page and pass cartItems (if using Next.js)
    const encodedCartItems = encodeURIComponent(JSON.stringify(cartItems));
    router.push(`/checkout?cartItems=₹{encodedCartItems}`);
  };

  // Calculate total after 70% discount
  const discountedTotal = cartItems.reduce((acc, item) => {
    const discountedPrice = item.price * 0.30; // 70% off
    return acc + discountedPrice * item.quantity;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6 max-w-lg overflow-scroll">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Review your items before checkout.</SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        <div className="space-y-4 py-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-muted">Your cart is empty</div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center space-x-4 border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                  </div>
                </div>
                <div className="font-medium">
                  ₹{(item.price * 0.30 * item.quantity).toFixed(2)} {/* Display discounted price */}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => increaseQuantity(item.id)}
                    className="text-green-500"
                  >
                    <Plus size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => decreaseQuantity(item.id)}
                    className="text-green-500"
                  >
                    <Minus size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500"
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total Price with Discount */}
        <div className="flex justify-between items-center font-semibold text-lg mt-4 border-t pt-4">
          <span>Total after 70% discount</span>
          <span>₹{discountedTotal.toFixed(2)}</span>
        </div>

        <SheetFooter className="flex justify-between mt-6">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </SheetClose>
          <Button className="w-full bg-primary text-white" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
