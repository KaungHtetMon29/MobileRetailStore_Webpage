"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Order } from "@/lib/types/order";
import {
  determineOrderStatus,
  fetchUserOrders,
} from "@/lib/services/order-service";
import OrderCard from "./components/OrderCard";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use useCallback to memoize the getOrders function
  const getOrders = useCallback(async () => {
    if (!session?.user?.id) {
      setError("User ID not available");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userId = session.user.id;

      console.log(`Fetching orders for user: ${userId}`);
      const result = await fetchUserOrders(userId);

      // Log the full order data response
      console.log(
        "Order data received from backend:",
        JSON.stringify(result, null, 2)
      );

      if (result && result.data) {
        // Assign default status for display purposes
        const ordersWithStatus = result.data.map((order) => ({
          ...order,
          Status: determineOrderStatus(order),
        }));

        // Log the processed orders with status
        console.log("Processed orders with status:", ordersWithStatus);

        setOrders(ordersWithStatus);
      } else {
        setOrders([]);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(
        `Failed to load orders: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // Fetch orders when session is available
    if (status === "authenticated" && session?.user?.id) {
      getOrders();
    }
  }, [status, session, router, getOrders]);

  const filteredOrders = searchQuery
    ? orders.filter(
        (order) =>
          order.ID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.ProductPerOrder?.some((item) =>
            item.Product?.Name?.toLowerCase().includes(
              searchQuery.toLowerCase()
            )
          )
      )
    : orders;

  const toggleOrderDetails = (orderId: string) => {
    if (activeOrderId === orderId) {
      setActiveOrderId(null);
    } else {
      setActiveOrderId(orderId);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            My Orders
          </h1>
          <div className="w-full flex justify-center">
            <div className="animate-pulse bg-gray-200 rounded-md h-96 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          My Orders
        </h1>

        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search orders by ID or product name"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Error display */}
        {error && (
          <Card className="w-full bg-white shadow-sm border mb-6 border-red-200">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="bg-red-50 p-3 rounded-full mb-3">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-red-800">
                Error Loading Orders
              </h3>
              <p className="text-red-600 mt-2 text-center max-w-md">{error}</p>
              <Button
                onClick={getOrders}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white"
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {/* No orders message */}
        {!error && filteredOrders.length === 0 && (
          <Card className="w-full bg-white shadow-sm border">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="bg-gray-100 p-5 rounded-full mb-4">
                <ShoppingBag size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700">
                No orders found
              </h3>
              <p className="text-gray-500 mt-2 text-center max-w-md">
                {searchQuery
                  ? "No orders match your search criteria."
                  : "You haven't placed any orders yet."}
              </p>
              {searchQuery ? (
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                  className="mt-6"
                >
                  Clear Search
                </Button>
              ) : (
                <Link href="/product">
                  <Button className="mt-6">Start Shopping</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}

        {/* Order list */}
        <div className="flex flex-col items-center w-full">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.ID}
              order={order}
              activeOrderId={activeOrderId}
              toggleOrderDetails={toggleOrderDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
