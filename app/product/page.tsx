"use client";

import ProductCard from "@/components/productCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Get the current URL search params
        const params = new URLSearchParams();

        // Add filter parameters if they exist
        const brand = searchParams.get("brand");
        const category = searchParams.get("category");
        const minPrice = searchParams.get("min_price");
        const maxPrice = searchParams.get("max_price");

        if (brand) params.append("brand", brand);
        if (category) params.append("category", category);
        if (minPrice) params.append("min_price", minPrice);
        if (maxPrice) params.append("max_price", maxPrice);

        // Build the URL with query parameters if any
        const url = params.toString()
          ? `http://localhost:8080/products/filter?${params.toString()}`
          : "http://localhost:8080/products";

        const res = await fetch(url);
        const data = await res.json();

        if (data.status === "success") {
          setProducts(data.data);
        } else {
          console.error("Failed to fetch products:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center my-10">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center my-10">
        No products match your filters. Try adjusting filter.
      </div>
    );
  }

  return (
    <div className="w-full h-full justify-items-center items-center my-10">
      <div className="grid grid-flow-row grid-cols-4 gap-8">
        {products.map((product: any) => (
          <ProductCard key={product.ID} product={product} />
        ))}
      </div>
    </div>
  );
}
