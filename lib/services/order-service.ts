import { Order, OrdersResponse } from "../types/order";

export const SHIPPING_FEE = 20;

/**
 * Fetches orders for a specific user
 */
export const fetchUserOrders = async (
  userId: string
): Promise<OrdersResponse> => {
  const response = await fetch(`http://localhost:8080/user-orders/${userId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.status}`);
  }

  const result: OrdersResponse = await response.json();
  return result;
};

/**
 * Determines the order status based on creation date
 * In a real app, this would come from the backend
 */
export const determineOrderStatus = (
  order: Order
): "processing" | "shipped" | "delivered" | "cancelled" => {
  const orderDate = new Date(order.CreatedAt);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays > 7) {
    return "delivered";
  } else if (diffDays > 3) {
    return "shipped";
  } else {
    return "processing";
  }
};

/**
 * Calculates the total price of an order
 */
export const calculateOrderTotal = (order: Order): number => {
  // Check if order has ProductPerOrder array
  if (
    !order.ProductPerOrder ||
    !Array.isArray(order.ProductPerOrder) ||
    order.ProductPerOrder.length === 0
  ) {
    console.log("No product orders found for order:", order.ID);
    return 0;
  }

  try {
    // Use safer calculation with explicit validation
    return order.ProductPerOrder.reduce((total, item) => {
      // Check if Product and required fields exist
      if (!item?.Product) {
        console.log("Product missing for item in order:", order.ID, item);
        return total;
      }

      // Parse Price as Number to ensure it's a number
      const priceRaw = item?.Product?.Price;
      const price =
        priceRaw !== undefined && priceRaw !== null
          ? parseFloat(String(priceRaw))
          : 0;

      // Use the same approach for quantity
      const quantityRaw = item?.quantity;
      const rawQuantity =
        quantityRaw !== undefined && quantityRaw !== null
          ? parseFloat(String(quantityRaw))
          : 0;

      // Always ensure quantity is at least 1 and is a valid number
      const quantity = !isNaN(rawQuantity) && rawQuantity > 0 ? rawQuantity : 1;

      // Ensure we're adding valid numbers
      if (isNaN(price) || isNaN(quantity)) {
        console.warn(
          `Invalid price or quantity for order ${order.ID}, item ${item.id}`
        );
        return total;
      }

      return total + price * quantity;
    }, 0);
  } catch (error) {
    console.error("Error calculating order total:", error, order);
    return 0; // Return 0 as fallback
  }
};

/**
 * Helper to extract item price with validation
 */
export const extractItemPrice = (priceRaw: any): number => {
  return priceRaw !== undefined && priceRaw !== null
    ? parseFloat(String(priceRaw))
    : 0;
};

/**
 * Helper to extract item quantity with validation
 */
export const extractItemQuantity = (quantityRaw: any): number => {
  const rawQuantity =
    quantityRaw !== undefined && quantityRaw !== null
      ? parseFloat(String(quantityRaw))
      : 0;

  // Always ensure at least quantity 1 for valid items and prevent NaN
  return !isNaN(rawQuantity) && rawQuantity > 0 ? rawQuantity : 1;
};
