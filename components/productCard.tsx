"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useCart } from "@/lib/contexts/CartContext";
import { useState } from "react";
import { Check } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = () => {
    // Validate product has an ID property before adding to cart
    if (!product || (!product.ID && !product.id)) {
      console.error("Product missing required ID", product);
      setError("Cannot add product to cart (missing ID)");
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Ensure the product has all required properties
    if (!product.Name || !product.Price || !product.ImageURL) {
      console.error("Product missing required properties", product);
      setError("Cannot add product to cart (invalid product)");
      setTimeout(() => setError(null), 3000);
      return;
    }

    // If product uses ID instead of id, make sure we're consistent with our cart context
    const productWithCorrectId = {
      ...product,
      id: product.id || product.ID, // Use lowercase id for consistency in cart
    };

    addToCart(productWithCorrectId);
    setIsAdded(true);

    // Reset the button state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <Card className="w-[350px] h-[500px] rounded-lg border-0 flex flex-col">
      <div className="h-[250px] w-full flex justify-center items-center p-4">
        <Image
          src={product.ImageURL}
          alt="product"
          width={200}
          height={200}
          className="object-contain h-full w-auto"
        />
      </div>
      <CardContent className="flex flex-col gap-3 flex-1 justify-between bg-primary rounded-b-lg p-4">
        <CardTitle className="text-background pt-3 text-xl leading-tight">
          {product.Name}
        </CardTitle>
        <CardDescription className="flex flex-col gap-1 text-background text-base">
          <h2 className="font-semibold text-sm">
            Brand - {product.Brand?.Name || "Unknown"}
          </h2>
          <h2 className="font-semibold text-sm mt-1">Specification</h2>
          <ul className="text-sm">
            <li>Price- {product.Price}$</li>
          </ul>
        </CardDescription>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        <Button
          className={`${
            isAdded ? "bg-green-500" : "bg-background"
          } text-primary mt-auto text-sm font-medium transition-colors`}
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {isAdded ? (
            <span className="flex items-center gap-2">
              <Check size={16} /> Added to Cart
            </span>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
