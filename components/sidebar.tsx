"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { useRouter } from "next/navigation";

// Interface for brand and category types
interface Brand {
  ID: number;
  Name: string;
}

interface Category {
  ID: number;
  Name: string;
}

export function AppSidebar() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch brands and categories
    const fetchFilters = async () => {
      try {
        setLoading(true);

        // Fetch brands
        const brandsResponse = await fetch("http://localhost:8080/brands");
        const brandsData = await brandsResponse.json();

        // Fetch categories
        const categoriesResponse = await fetch(
          "http://localhost:8080/categories"
        );
        const categoriesData = await categoriesResponse.json();

        if (brandsData.status === "success") {
          setBrands(brandsData.data);
        }

        if (categoriesData.status === "success") {
          setCategories(categoriesData.data);
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  // Handle brand selection
  const handleBrandChange = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  // Handle category selection
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle price range changes
  const handlePriceChange = (type: "min" | "max", value: string) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Apply filters and navigate to filtered results
  const applyFilters = () => {
    try {
      // Construct query parameters based on selected filters
      const params = new URLSearchParams();

      // Add brand filter if any brands are selected
      if (selectedBrands.length > 0) {
        // Find the selected brand names
        const selectedBrandNames = brands
          .filter((brand) => selectedBrands.includes(brand.ID))
          .map((brand) => brand.Name);

        if (selectedBrandNames.length > 0) {
          params.append("brand", selectedBrandNames.join(","));
        }
      }

      // Add category filter if any categories are selected
      if (selectedCategories.length > 0) {
        // Find the selected category names
        const selectedCategoryNames = categories
          .filter((category) => selectedCategories.includes(category.ID))
          .map((category) => category.Name);

        if (selectedCategoryNames.length > 0) {
          params.append("category", selectedCategoryNames.join(","));
        }
      }

      // Add price range filters if specified
      if (priceRange.min) {
        params.append("min_price", priceRange.min);
      }

      if (priceRange.max) {
        params.append("max_price", priceRange.max);
      }

      // Create the URL with query parameters
      const queryString = params.toString();
      const url = `/product${queryString ? `?${queryString}` : ""}`;

      // Navigate to the products page with filter parameters
      router.push(url);
    } catch (error) {
      console.error("Failed to apply filters:", error);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
    router.push("/product");
  };

  return (
    <Sidebar className="top-[4.5rem] shadow-none ">
      <SidebarContent className="shadow-none bg-white dark:bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold text-black">
            Filter
          </SidebarGroupLabel>
          <SidebarGroupContent className="pt-5">
            <SidebarMenu className="gap-4">
              <Accordion type="single" collapsible className="w-full">
                {/* Brand Filter */}
                <AccordionItem value="brands">
                  <AccordionTrigger className="py-2">
                    Filter by Brand
                  </AccordionTrigger>
                  <AccordionContent>
                    {loading ? (
                      <div className="py-2">Loading brands...</div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        {brands.map((brand) => (
                          <div
                            key={brand.ID}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`brand-${brand.ID}`}
                              checked={selectedBrands.includes(brand.ID)}
                              onCheckedChange={() =>
                                handleBrandChange(brand.ID)
                              }
                            />
                            <Label htmlFor={`brand-${brand.ID}`}>
                              {brand.Name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                {/* Category Filter */}
                <AccordionItem value="categories">
                  <AccordionTrigger className="py-2">
                    Filter by Category
                  </AccordionTrigger>
                  <AccordionContent>
                    {loading ? (
                      <div className="py-2">Loading categories...</div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        {categories.map((category) => (
                          <div
                            key={category.ID}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`category-${category.ID}`}
                              checked={selectedCategories.includes(category.ID)}
                              onCheckedChange={() =>
                                handleCategoryChange(category.ID)
                              }
                            />
                            <Label htmlFor={`category-${category.ID}`}>
                              {category.Name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                {/* Price Range Filter */}
                <AccordionItem value="price">
                  <AccordionTrigger className="py-2">
                    Filter by Price Range
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-4 py-2">
                      <div>
                        <Label htmlFor="min-price">Min Price</Label>
                        <Input
                          id="min-price"
                          type="number"
                          value={priceRange.min}
                          onChange={(e) =>
                            handlePriceChange("min", e.target.value)
                          }
                          placeholder="Min price"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="max-price">Max Price</Label>
                        <Input
                          id="max-price"
                          type="number"
                          value={priceRange.max}
                          onChange={(e) =>
                            handlePriceChange("max", e.target.value)
                          }
                          placeholder="Max price"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex flex-col gap-2 mt-4">
                <Button className="w-full" onClick={applyFilters}>
                  Apply Filters
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
