"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/contexts/CartContext";
import { CartItem } from "@/lib/contexts/CartContext";
import { Fragment } from "react";

export default function Page() {
  // Use the cart items directly from the context
  const { items, clearCart } = useCart();

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Shopping Cart</h2>
        {items.length > 0 && (
          <Button
            variant="destructive"
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600"
          >
            Clear Cart
          </Button>
        )}
      </div>
      <div className="flex justify-between w-full gap-5">
        <div className="w-4/5 flex flex-col gap-5 overflow-y-scroll h-[70vh] py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
              <Link href="/product">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <Fragment>
              {items.map((item) => (
                <CartItemComponent key={item.id} item={item} />
              ))}
            </Fragment>
          )}
        </div>
        <div className="w-1/5">
          <OrderSummary />
        </div>
      </div>
    </>
  );
}

const CartItemComponent = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <Card className="flex justify-between items-center h-32 px-10">
      <div className="flex gap-4 items-center">
        <div className="w-28 h-28 flex items-center justify-center">
          <Image
            src={item.ImageURL}
            alt={item.Name}
            width={100}
            height={100}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2>{item.Name}</h2>
          <p>${item.Price}</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant={"outline"} onClick={handleDecrease}>
          <Minus size={12} />
        </Button>
        <p>{item.quantity}</p>
        <Button variant={"outline"} onClick={handleIncrease}>
          <Plus size={12} />
        </Button>
        <Button onClick={handleRemove}>
          <Trash size={12} />
        </Button>
      </div>
    </Card>
  );
};

const OrderSummary = () => {
  const { totalItems, totalPrice } = useCart();
  const shippingFee = totalItems > 0 ? 20 : 0;
  const total = totalPrice + shippingFee;

  return (
    <Card className="w-full">
      <CardHeader className="font-bold text-xl">Order Summary</CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p>Items ({totalItems})</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>${shippingFee.toFixed(2)}</p>
        </div>
      </CardContent>
      <hr />
      <CardFooter className="w-full flex flex-col gap-3 pt-5">
        <div className="flex justify-between w-full">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>

        <Link
          href={"/checkout"}
          className={`${
            totalItems === 0 ? "opacity-50 pointer-events-none" : ""
          } bg-black text-white w-full items-center justify-center flex py-3 rounded-lg`}
        >
          Checkout
        </Link>
      </CardFooter>
    </Card>
  );
};
