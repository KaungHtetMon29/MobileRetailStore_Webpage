import { Button } from "@/components/ui/button";
import { Order } from "@/lib/types/order";
import {
  calculateOrderTotal,
  SHIPPING_FEE,
} from "@/lib/services/order-service";
import { MapPin, Package, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import OrderItem from "./OrderItem";
import {
  OrderStatusIcon,
  StatusBadge,
  getStatusMessage,
} from "./StatusComponents";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const totalPrice = calculateOrderTotal(order);
  const isValidTotal = !isNaN(totalPrice);
  const orderTotal = isValidTotal ? totalPrice + SHIPPING_FEE : SHIPPING_FEE;

  // Get shipping ID from the ShippingID field or from Shipping.id as fallback
  const shippingId = order.ShippingID || (order.Shipping && order.Shipping.id);

  return (
    <div className="flex flex-col gap-5">
      {/* Order Header with Shipping ID */}
      <div className="bg-gray-50 rounded-lg border p-4">
        <div className="flex flex-wrap justify-between items-center">
          <h3 className="text-lg font-semibold">Order #{order.ID}</h3>
          {shippingId && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">Shipping ID:</span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md font-medium">
                {shippingId}
              </span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Ordered on {new Date(order.CreatedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Order Items Section */}
      <div>
        <h4 className="text-base font-medium mb-3 flex items-center gap-1.5">
          <ShoppingBag size={16} className="text-gray-500" />
          Order Items
        </h4>
        {order.ProductPerOrder && order.ProductPerOrder.length > 0 ? (
          <div className="divide-y border rounded-lg overflow-hidden">
            {order.ProductPerOrder.map((item) => (
              <OrderItem key={item.id || `item-${Math.random()}`} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-4 border rounded-lg">
            No items found in this order
          </div>
        )}
      </div>

      {/* Shipping Information and Order Status - Side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Shipping Information with Shipping ID */}
        <div>
          <h4 className="text-base font-medium mb-3 flex items-center gap-1.5">
            <MapPin size={16} className="text-gray-500" />
            Shipping Information
          </h4>
          <div className="bg-gray-50 rounded-lg border p-4">
            {/* Shipping ID display with raw value */}
            {shippingId ? (
              <div className="mb-3 pb-3 border-b border-gray-200">
                <p className="font-medium">
                  Shipping ID:{" "}
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {shippingId}
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 py-2 mb-1">
                Shipping details pending
              </p>
            )}

            {/* Address and Contact Information */}
            {order.Shipping && order.Shipping.first_name ? (
              <>
                <p className="font-medium">
                  {order.Shipping.first_name} {order.Shipping.last_name}
                </p>
                <p className="mt-1">{order.Shipping.address}</p>
                <p className="text-gray-600">
                  {order.Shipping.city}, {order.Shipping.state}{" "}
                  {order.Shipping.zip_code}
                </p>
                <p className="text-gray-600">{order.Shipping.country}</p>
                <p className="text-gray-600 mt-2">{order.Shipping.phone}</p>
                <p className="text-gray-600">{order.Shipping.email}</p>
              </>
            ) : null}

            {/* Tracking Info if available */}
            {order.TrackingInfo && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">{order.TrackingInfo}</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Status */}
        <div>
          <h4 className="text-base font-medium mb-3 flex items-center gap-1.5">
            <Package size={16} className="text-gray-500" />
            Order Status
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3">
            <div className="bg-white p-2 rounded-full shadow-sm flex-shrink-0">
              <OrderStatusIcon status={order.Status || "processing"} />
            </div>
            <div>
              <StatusBadge status={order.Status || "processing"} />
              <p className="text-sm text-gray-600 mt-1.5">
                {getStatusMessage(order.Status || "")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary/Totals */}
      <div className="border-t border-b py-4 mt-1">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal:</p>
          <p className="font-medium">
            ${isValidTotal ? totalPrice.toFixed(2) : "0.00"}
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-gray-600">Shipping:</p>
          <p className="font-medium">${SHIPPING_FEE.toFixed(2)}</p>
        </div>
        <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
          <p>Total:</p>
          <p>${orderTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-end mt-1">
        {(order.Status === "processing" || order.Status === "shipped") &&
          shippingId && (
            <Link
              href={`/deliveryTrack?orderId=${order.ID}&shippingId=${shippingId}`}
            >
              <Button variant="outline" className="gap-2">
                <Truck size={16} />
                Track Delivery
              </Button>
            </Link>
          )}
        <Button variant="default">Order Support</Button>
      </div>
    </div>
  );
}
