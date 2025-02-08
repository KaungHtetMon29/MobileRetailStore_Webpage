"use client";
import ProductCard from "@/components/productCard";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        fetch("/api/test").then((data) => data.json());
    }, []);
    return (
        <div className="w-full h-full justify-items-center items-center my-10 ">
            <div className="grid grid-flow-row grid-cols-4 gap-8">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard /><ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    );
}
