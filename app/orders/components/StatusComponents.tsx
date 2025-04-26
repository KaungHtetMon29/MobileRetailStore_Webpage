import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, ShoppingBag, Truck } from "lucide-react";

export const OrderStatusIcon = ({
  status,
}: {
  status: string;
}): JSX.Element => {
  switch (status) {
    case "processing":
      return <Package className="text-blue-500" size={20} />;
    case "shipped":
      return <Truck className="text-orange-500" size={20} />;
    case "delivered":
      return <CheckCircle className="text-green-500" size={20} />;
    case "cancelled":
      return <ShoppingBag className="text-red-500" size={20} />;
    default:
      return <ShoppingBag className="text-gray-500" size={20} />;
  }
};

export const StatusBadge = ({ status }: { status: string }): JSX.Element => {
  const styles: Record<string, string> = {
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    shipped: "bg-orange-100 text-orange-800 border-orange-200",
    delivered: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    default: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const labels: Record<string, string> = {
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    default: "Pending",
  };

  const statusKey = status && status in styles ? status : "default";

  return (
    <Badge className={`${styles[statusKey]} font-medium py-1 px-2.5 border`}>
      {labels[statusKey]}
    </Badge>
  );
};

export const getStatusMessage = (status: string): string => {
  switch (status) {
    case "processing":
      return "Your order is being processed";
    case "shipped":
      return "Your order is on its way";
    case "delivered":
      return "Your order has been delivered";
    case "cancelled":
      return "Your order has been cancelled";
    default:
      return "Your order is pending";
  }
};
