"use client";

import { ShippingData } from "@/lib/types/shipping";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Package, Truck, Home } from "lucide-react";
import { getStatusDisplayInfo } from "@/lib/services/shipping-service";

type DeliveryDetailsProps = {
  shipping: ShippingData;
};

export default function DeliveryDetails({ shipping }: DeliveryDetailsProps) {
  const { text: statusText, variant: statusVariant } = getStatusDisplayInfo(
    shipping.ShippingStatus
  );

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Generate tracking events based on shipping status
  const getTrackingEvents = () => {
    const events = [
      {
        date: formatDate(shipping.CreatedAt),
        title: "Order Received",
        description: "Your order has been received and is being processed",
        icon: Package,
      },
    ];

    if (
      shipping.ShippingStatus === "preparing" ||
      shipping.ShippingStatus === "shipping" ||
      shipping.ShippingStatus === "arrived"
    ) {
      events.push({
        date: formatDate(shipping.UpdatedAt || shipping.CreatedAt),
        title: "Preparing for Shipping",
        description: "Your order is being prepared for delivery",
        icon: Package,
      });
    }

    if (
      shipping.ShippingStatus === "shipping" ||
      shipping.ShippingStatus === "arrived"
    ) {
      // Calculate a date between created and updated
      const inTransitDate = new Date(shipping.CreatedAt);
      inTransitDate.setDate(inTransitDate.getDate() + 1);

      events.push({
        date: formatDate(inTransitDate.toISOString()),
        title: "In Transit",
        description: "Your package is on the way",
        icon: Truck,
      });
    }

    if (shipping.ShippingStatus === "arrived") {
      events.push({
        date: formatDate(shipping.UpdatedAt || shipping.CreatedAt),
        title: "Delivered",
        description: "Your package has been delivered to the destination",
        icon: Home,
      });
    }

    return events;
  };

  const trackingEvents = getTrackingEvents();

  return (
    <Card className="border-0 overflow-hidden">
      <CardHeader className="border-b-2 px-10 flex flex-row justify-between">
        <div className="flex flex-col w-4/5">
          <CardTitle className="text-2xl">Order #{shipping.OrderID}</CardTitle>
          <CardDescription className="flex flex-col gap-4">
            <div className="flex flex-col gap-10 text-xl">
              <p>
                Shipping to: {shipping.FirstName} {shipping.LastName}
              </p>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Calendar size={24} />
                  <p>Ordered: {formatDate(shipping.CreatedAt)}</p>
                </div>
                <div className="flex gap-4">
                  <Home size={24} />
                  <p>
                    Destination: {shipping.City}, {shipping.State}
                  </p>
                </div>
              </div>
            </div>
          </CardDescription>
        </div>
        <Badge
          variant={statusVariant}
          className="h-fit py-2 text-base rounded-full px-4"
        >
          {statusText}
        </Badge>
      </CardHeader>
      <CardContent className="px-10 py-5 flex flex-col gap-5">
        <h3 className="text-2xl font-bold">Delivery Timeline</h3>
        <div className="flex flex-col gap-10">
          {trackingEvents.map((event, index) => (
            <div
              key={index}
              className="flex gap-10 justify-start items-center text-lg"
            >
              <p className="w-32">{event.date}</p>
              <div className="flex gap-4 items-center">
                <event.icon size={24} />
                <div>
                  <p className="text-xl font-bold">{event.title}</p>
                  <p className="font-extralight">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-10 py-5 flex flex-col gap-5 justify-start items-start bg-gray-200">
        <p>
          <span className="font-bold">Delivery Address: </span>
          {shipping.Address}, {shipping.City}, {shipping.State}{" "}
          {shipping.ZipCode}, {shipping.Country}
        </p>
        <p>
          <span className="font-bold">Contact: </span>
          {shipping.Phone} {shipping.Email ? `| ${shipping.Email}` : ""}
        </p>
      </CardFooter>
    </Card>
  );
}
