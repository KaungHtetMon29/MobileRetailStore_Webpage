import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Order } from "@/lib/types/order";
import {
  calculateOrderTotal,
  SHIPPING_FEE,
} from "@/lib/services/order-service";
import { Calendar, ChevronDown } from "lucide-react";
import { StatusBadge } from "./StatusComponents";
import OrderDetails from "./OrderDetails";

interface OrderCardProps {
  order: Order;
  activeOrderId: string | null;
  toggleOrderDetails: (orderId: string) => void;
}

export default function OrderCard({
  order,
  activeOrderId,
  toggleOrderDetails,
}: OrderCardProps) {
  const totalPrice = calculateOrderTotal(order);
  const isValidTotal = !isNaN(totalPrice);
  const orderTotal = isValidTotal ? totalPrice + SHIPPING_FEE : SHIPPING_FEE;

  // Get shipping ID from the ShippingID field or from Shipping.id as fallback
  const shippingId = order.ShippingID || (order.Shipping && order.Shipping.id);

  const isActive = activeOrderId === order.ID;

  // Format date to match the design (April 26, 2025)
  const formattedDate = new Date(order.CreatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="w-full bg-white border border-gray-200 shadow-sm mb-6 overflow-hidden">
      <CardHeader className="bg-white py-4 px-6 flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Order with ID: {order.ID}</h3>
            <StatusBadge status={order.Status || "processing"} />
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 text-sm mt-1">
            <Calendar size={14} className="text-gray-400" />
            <p>{formattedDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-medium">TOTAL</p>
            <p className="text-lg font-bold">${orderTotal.toFixed(2)}</p>
            {shippingId && (
              <p className="text-xs text-gray-500 mt-1">
                Shipping ID: {shippingId}
              </p>
            )}
          </div>
          <Button
            onClick={() => toggleOrderDetails(order.ID)}
            variant="ghost"
            size="sm"
            className="gap-1 hover:bg-gray-100"
          >
            {isActive ? "Hide Details" : "View Details"}
            <ChevronDown
              size={16}
              className={`transition-transform ${isActive ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
      </CardHeader>

      {isActive && (
        <CardContent className="py-5 px-6 bg-white border-t border-gray-100">
          <OrderDetails order={order} />
        </CardContent>
      )}
    </Card>
  );
}
