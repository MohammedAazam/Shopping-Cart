import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"; // Import ShadCN Dialog components

export function ProductCard({
  product,
  onAddToCart,
}: {
  product: any;
  onAddToCart: () => void;
}) {

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(); // Proceed with adding the product to the cart
    setDialogOpen(false); // Close the dialog after adding to the cart
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-40 object-cover mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg line-through text-gray-500">₹{product.price}</span> {/* Original price */}
        <span className="text-xl font-bold text-red-500 ml-2">₹{(product.price * 0.30).toFixed(2)}</span> {/* Discounted price */}
        <span className="text-sm text-green-500 ml-2">70% OFF</span> {/* 70% Off tag */}

        <Button
          onClick={() => setDialogOpen(true)} // Open dialog when clicked
          className=" text-white rounded"
        >
          Add to Cart
        </Button>

      </div>


      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogTitle>Confirm Add to Cart</DialogTitle>
          <DialogDescription>
            Are you sure you want to add {product.name} to your cart?
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)} // Close dialog without action
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToCart} // Proceed with adding to the cart
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
