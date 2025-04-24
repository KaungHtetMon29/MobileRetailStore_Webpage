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

export default function Page() {
  return (
    <>
      <div>
        <h2 className="text-3xl font-bold">Shopping Cart</h2>
      </div>
      <div className="flex justify-between w-full gap-5">
        <div className="w-4/5 flex flex-col gap-5 overflow-y-scroll h-[70vh] py-5">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
        <div className="w-1/5 ">
          <OrderSummary />
        </div>
      </div>
    </>
  );
}

const Item = () => {
  return (
    <Card className="flex justify-between items-center h-32 px-10 ">
      <div className="flex gap-4 items-center">
        <div className="w-28">
          <Image
            src="https://www.istudio.store/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_TH_1.jpg?v=1725929129"
            alt="product"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2>Iphone 15</h2>
          <p>$999</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant={"outline"}>
          <Minus size={12} />
        </Button>
        <p>10</p>
        <Button variant={"outline"}>
          <Plus size={12} />
        </Button>
        <Button>
          <Trash size={12} />
        </Button>
      </div>
    </Card>
  );
};

const OrderSummary = () => {
  return (
    <Card className="w-full">
      <CardHeader className="font-bold text-xl">Order Summary</CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p>Total</p>
          <p>$999</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>$999</p>
        </div>
      </CardContent>
      <hr />
      <CardFooter className="w-full flex flex-col gap-3 pt-5">
        <div className="flex justify-between w-full">
          <p>Total</p>
          <p>$999</p>
        </div>

        <Link
          href={"/checkout"}
          className="bg-black text-white w-full items-center justify-center flex py-3 rounded-lg"
        >
          Checkout
        </Link>
      </CardFooter>
    </Card>
  );
};
