import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function ProductCard() {
    return (
        <Card className="w-[350px] h-[400px] rounded-lg">
            <div className="h-1/2 w-full flex justify-center">
                <Image
                    src="https://www.istudio.store/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_TH_1.jpg?v=1725929129"
                    alt="product"
                    width={300}
                    height={300}
                    className="object-contain"
                />
            </div>
            <CardContent className="flex flex-col gap-3 h-max justify-between bg-primary rounded-b-lg">
                <CardTitle className="text-background pt-3">IPhone 16 pro</CardTitle>
                <CardDescription className="flex flex-col gap-1 text-background">
                    <h2 className="font-semibold">Specification</h2>
                    <ul>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                    </ul>
                </CardDescription>
                <Button className="bg-background text-primary">Add to Cart</Button>
            </CardContent>
        </Card>
    );
}
