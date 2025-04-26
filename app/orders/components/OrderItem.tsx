import Image from "next/image";
import { ProductPerOrder } from "@/lib/types/order";
import {
  extractItemPrice,
  extractItemQuantity,
} from "@/lib/services/order-service";

interface OrderItemProps {
  item: ProductPerOrder;
}

export default function OrderItem({ item }: OrderItemProps) {
  // Use robust parsing to prevent NaN values
  const price = extractItemPrice(item?.Product?.Price);
  const quantity = extractItemQuantity(item?.quantity);
  const itemTotal = !isNaN(price) && !isNaN(quantity) ? price * quantity : 0;

  return (
    <div
      key={item.id || `item-${Math.random()}`}
      className="flex justify-between py-4 px-4 items-center hover:bg-gray-50"
    >
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden flex-shrink-0 border">
          <div className="relative w-full h-full">
            <Image
              src={item?.Product?.ImageURL || "/images/placeholder.png"}
              alt={item?.Product?.Name || "Product"}
              fill
              sizes="64px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-800">
            {item?.Product?.Name || "Unknown Product"}
          </p>
          <div className="flex gap-3 text-sm text-gray-600 mt-1">
            <p>${!isNaN(price) ? price.toFixed(2) : "0.00"}</p>
            <p>×</p>
            <p>Qty: {!isNaN(quantity) ? quantity : 1}</p>
          </div>
        </div>
      </div>
      <p className="font-medium text-gray-900">
        ${!isNaN(itemTotal) ? itemTotal.toFixed(2) : "0.00"}
      </p>
    </div>
  );
}
