import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function ProductCard({ product }: { product: any }) {
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
            Brand - {product.Brand.Name}
          </h2>
          <h2 className="font-semibold text-sm mt-1">Specification</h2>
          <ul className="text-sm">
            <li>Price- {product.Price}$</li>
          </ul>
        </CardDescription>
        <Button className="bg-background text-primary mt-auto text-sm font-medium">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
