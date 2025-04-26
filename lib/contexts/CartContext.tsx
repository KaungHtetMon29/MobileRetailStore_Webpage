"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Add this import for NextAuth session

// Define the cart item type
export interface CartItem {
  id: string | number;
  Name: string;
  Price: number;
  ImageURL: string;
  Brand: { Name: string };
  quantity: number;
}

// Define the cart context type
interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkout: (
    shippingInfo: ShippingInfo,
    paymentInfo: PaymentInfo,
    shippingFee?: number
  ) => Promise<CheckoutResult>;
  isCheckingOut: boolean;
}

// Define shipping information type
export interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  email?: string;
  phone: string; // Changed from optional to required
}

// Define payment information type
export interface PaymentInfo {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvc: string;
  billingAddressSameAsShipping: boolean;
  billingAddress?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// Define checkout result type
export interface CheckoutResult {
  success: boolean;
  orderId?: string;
  error?: string;
  message?: string;
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { data: session } = useSession(); // Add this line to get the user session

  // Load cart from localStorage when component mounts (client-side only)
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Only set items if the parsed cart is an array and has items
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setItems(parsedCart);
        } else {
          // If cart is empty or invalid, clear localStorage
          localStorage.removeItem("cart");
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        // Clear invalid cart data
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // Update localStorage based on cart state
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    } else {
      // Clear localStorage when cart is empty
      localStorage.removeItem("cart");
    }

    // Calculate total items and price
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const price = items.reduce(
      (total, item) => total + item.Price * item.quantity,
      0
    );

    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);

  // Add a product to cart
  const addToCart = (product: any) => {
    // Ensure the product has a valid ID
    if (!product || !product.id) {
      console.error("Cannot add product without an ID to cart");
      return;
    }

    setItems((prevItems) => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        // If item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove a product from cart
  const removeFromCart = (id: string | number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update quantity of a product
  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  // Checkout function
  const checkout = async (
    shippingInfo: ShippingInfo,
    paymentInfo: PaymentInfo,
    shippingFee?: number
  ): Promise<CheckoutResult> => {
    setIsCheckingOut(true);
    try {
      // Get user information from session with proper logging
      console.log("Session user data:", session?.user);

      const userData = session?.user
        ? {
            userId: session.user.id || "", // This should now contain the MongoDB _id
            userName: session.user.name || "",
            userEmail: session.user.email || "",
          }
        : null;

      console.log("User data being sent to API:", userData);

      // Prepare order data to send to API
      const checkoutData = {
        user: userData, // Add user data from Prisma
        shipping: shippingInfo,
        payment: {
          // Send only necessary payment info, excluding sensitive data like CVC
          cardholderName: paymentInfo.cardholderName,
          cardNumberLast4: paymentInfo.cardNumber.slice(-4),
          expiryDate: paymentInfo.expiryDate,
        },
        order: {
          items: items.map((item) => ({
            id: item.id,
            name: item.Name,
            price: item.Price,
            quantity: item.quantity,
          })),
          totalItems,
          subtotal: totalPrice,
          shippingFee: shippingFee || 0,
          total: totalPrice + (shippingFee || 0),
        },
      };
      console.log("Checkout data:");
      console.log(checkoutData);
      // Send checkout data to API
      const response = await fetch("http://localhost:8080/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        throw new Error(`Checkout failed with status: ${response.status}`);
      }

      const result = await response.json();

      // Clear the cart after successful checkout
      clearCart();

      return {
        success: true,
        orderId: result.orderId || `ORD-${Date.now()}`,
        message: "Checkout successful!",
      };
    } catch (error) {
      console.error("Checkout failed:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Checkout failed. Please try again.",
      };
    } finally {
      setIsCheckingOut(false);
    }
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    checkout,
    isCheckingOut,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
