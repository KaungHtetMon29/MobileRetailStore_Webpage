import { ShippingData } from "@/lib/types/shipping";

const API_BASE_URL = "http://localhost:8080";

/**
 * Fetch shipping details by ID
 */
export async function getShippingById(
  id: string | number
): Promise<ShippingData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/shipping/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching shipping details:", error);
    return null;
  }
}

/**
 * Fetch all shipping records
 */
export async function getAllShippings(): Promise<ShippingData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/shipping`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching all shipping details:", error);
    return [];
  }
}

/**
 * Create new shipping record
 */
export async function createShipping(
  shippingData: Omit<
    ShippingData,
    "id" | "createdAt" | "updatedAt" | "updatedBy"
  >
): Promise<ShippingData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/shipping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shippingData),
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error creating shipping:", error);
    return null;
  }
}

/**
 * Update shipping status
 */
export async function updateShippingStatus(
  id: string | number,
  status: string
): Promise<ShippingData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/shipping/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error updating shipping status:", error);
    return null;
  }
}

/**
 * Map shipping status to more user-friendly display text
 */
export function getStatusDisplayInfo(status: string): {
  text: string;
  variant: "default" | "destructive" | "success" | "outline" | "secondary";
  description: string;
} {
  switch (status) {
    case "preparing":
      return {
        text: "Preparing",
        variant: "secondary",
        description: "Your order is being prepared for shipping",
      };
    case "shipping":
      return {
        text: "In Transit",
        variant: "default",
        description: "Your order is on the way",
      };
    case "arrived":
      return {
        text: "Delivered",
        variant: "success",
        description: "Your order has been delivered",
      };
    default:
      return {
        text: "Unknown",
        variant: "outline",
        description: "Status information unavailable",
      };
  }
}
