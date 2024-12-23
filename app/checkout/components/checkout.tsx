"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import supabase from "@/lib/supabaseClient";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CheckoutProps {
    cartItems: CartItem[];
}

export function Checkout({ cartItems = [] }: CheckoutProps) {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [isLoading, setIsLoading] = useState(false);

    // Calculate original subtotal
    const originalSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Apply 70% discount
    const discountRate = 0.70; // 70% off
    const discountAmount = originalSubtotal * discountRate;
    const subtotal = originalSubtotal - discountAmount;

    // Rest of the calculations
    const shippingCost = 10.0;
    const total = subtotal + shippingCost;

    // Optional: For displaying the savings
    const savedAmount = originalSubtotal * discountRate;
    const validateInputs = () => {
        if (!userName.trim() || !userEmail.trim() || !userAddress.trim()) {
            setErrorMessage("Please fill in all required fields: name, email, and address.");
            return false;
        }

        if (!userEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+₹/)) {
            setErrorMessage("Please enter a valid email address.");
            return false;
        }

        return true;
    };

    const placeOrder = async () => {
        if (!validateInputs()) return;
        if (cartItems.length === 0) {
            setErrorMessage("Your cart is empty.");
            return;
        }

        setIsLoading(true);
        setErrorMessage("");

        try {
            const { data: authData, error: signUpError } = await supabase.auth.signUp({
                email: userEmail,
                password: crypto.randomUUID(),
                options: {
                    data: {
                        full_name: userName
                    }
                }
            });

            if (signUpError) throw signUpError;
            if (!authData.user?.id) throw new Error("Failed to create user");

            const { data: orderData, error: orderError } = await supabase
                .from("orders")
                .insert([{
                    user_id: authData.user.id,
                    total_price: total,
                    status: "pending"
                    // created_at and updated_at will be automatically set by database defaults
                }])
                .select()
                .single();

            if (orderError) throw orderError;
            if (!orderData) throw new Error("Failed to create order");

            const { error: itemsError } = await supabase
                .from("order_items")
                .insert(cartItems.map(item => ({
                    order_id: orderData.id,
                    product_id: item.id,
                    quantity: item.quantity,
                    price: total
                })));

            if (itemsError) throw itemsError;

            setSuccessMessage("Order placed successfully! Check your email for details.");
            // Clear form
            setUserName("");
            setUserEmail("");
            setUserAddress("");
            setCardNumber("");
            setCardExpiry("");
            setCardCVV("");
        } catch (error) {
            console.error("Order error:", error);
            setErrorMessage(error instanceof Error ? error.message : "Failed to place order. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-5">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Billing Details */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Billing Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">
                                Full Name *
                            </label>
                            <Input
                                id="name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email Address *
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium">
                                Shipping Address *
                            </label>
                            <Input
                                id="address"
                                value={userAddress}
                                onChange={(e) => setUserAddress(e.target.value)}
                                placeholder="Enter your shipping address"
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Options */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Payment Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <RadioGroup
                            value={paymentMethod}
                            onValueChange={setPaymentMethod}
                            className="space-y-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="credit-card" id="credit-card" />
                                <label htmlFor="credit-card" className="text-sm font-medium">
                                    Credit/Debit Card
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="upi" id="upi" />
                                <label htmlFor="upi" className="text-sm font-medium">
                                    UPI
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cod" id="cod" />
                                <label htmlFor="cod" className="text-sm font-medium">
                                    Cash on Delivery
                                </label>
                            </div>
                        </RadioGroup>

                        {paymentMethod === "credit-card" && (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="card-number" className="block text-sm font-medium">
                                        Card Number
                                    </label>
                                    <Input
                                        id="card-number"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={16}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="expiry" className="block text-sm font-medium">
                                            Expiry Date
                                        </label>
                                        <Input
                                            id="expiry"
                                            value={cardExpiry}
                                            onChange={(e) => setCardExpiry(e.target.value)}
                                            placeholder="MM/YY"
                                            maxLength={5}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cvv" className="block text-sm font-medium">
                                            CVV
                                        </label>
                                        <Input
                                            id="cvv"
                                            value={cardCVV}
                                            onChange={(e) => setCardCVV(e.target.value)}
                                            placeholder="123"
                                            maxLength={3}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {paymentMethod === "upi" && (
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    UPI QR Code
                                </label>
                                <div className="border p-4 flex justify-center items-center">
                                    <img src="/api/placeholder/200/200" alt="UPI QR Code" />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Order Summary */}
            <Card className="shadow-lg mt-8">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm border-b pb-4">
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                <div>
                                    <span className="font-medium">{item.name}</span>
                                    <div className="text-gray-500">x{item.quantity}</div>
                                </div>
                            </div>
                            <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}

                    <div className="space-y-2 pt-4">
                        <div className="flex justify-between text-sm">
                            <span>Original Subtotal:</span>
                            <span>₹{originalSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-green-600">
                            <span>Discount (70% off):</span>
                            <span>-₹{savedAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Subtotal after discount:</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Shipping:</span>
                            <span>₹{shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                            <span>Total:</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <Button
                        onClick={placeOrder}
                        className="w-full bg-primary text-white mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Place Order"}
                    </Button>

                    {successMessage && (
                        <div className="flex items-center p-4 mt-4 text-green-700 bg-green-100 border border-green-300 rounded-lg">
                            <span className="text-xl mr-3">✔</span>
                            <p>{successMessage}</p>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="flex items-center p-4 mt-4 text-red-700 bg-red-100 border border-red-300 rounded-lg">
                            <span className="text-xl mr-3">❌</span>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        try {
            const queryParams = new URLSearchParams(window.location.search);
            const cartItemsParam = queryParams.get('cartItems');

            if (cartItemsParam) {
                const decodedCartItems = JSON.parse(decodeURIComponent(cartItemsParam));
                setCartItems(decodedCartItems);
            }
        } catch (error) {
            console.error("Error parsing cart items:", error);
        }
    }, []);

    return <Checkout cartItems={cartItems} />;
}