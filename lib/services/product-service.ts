// Service functions for product API interactions

export interface Product {
  ID: number;
  Name: string;
  Description: string;
  Price: number;
  StockQuantity: number;
  ImageURL: string;
  Brand: {
    ID: number;
    Name: string;
  };
  CategoryID: number;
  CreatedAt: string;
  UpdatedAt: string;
}

const API_BASE_URL = "http://localhost:8080";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching to always get fresh data
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array instead of throwing an error
  }
}

export async function getLatestProducts(limit = 3): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts();
    // Sort by most recent first
    const sortedProducts = allProducts.sort(
      (a, b) =>
        new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
    );

    // Return only the requested number of products
    return sortedProducts.slice(0, limit);
  } catch (error) {
    console.error("Error getting latest products:", error);
    return [];
  }
}

export async function getRandomProducts(limit = 3): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts();

    // Shuffle the array
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());

    // Return only the requested number of products
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error("Error getting random products:", error);
    return [];
  }
}
