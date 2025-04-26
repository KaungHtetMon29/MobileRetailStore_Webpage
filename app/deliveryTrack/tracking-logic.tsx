"use client";

import { useState } from "react";
import { getShippingById } from "@/lib/services/shipping-service";
import { ShippingData } from "@/lib/types/shipping";

export function useDeliveryTracking() {
  const [trackingId, setTrackingId] = useState<string>("");
  const [shipping, setShipping] = useState<ShippingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingId(e.target.value);
  };

  const trackDelivery = async () => {
    if (!trackingId) {
      setError("Please enter a tracking ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getShippingById(trackingId);

      if (!data) {
        setError(`No delivery found with ID: ${trackingId}`);
        setShipping(null);
      } else {
        setShipping(data);
      }
    } catch (err: any) {
      console.error("Failed to fetch delivery information:", err);

      // Handle connection/CORS issues specifically
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError(
          "Cannot connect to the delivery server. Please ensure it's running at http://localhost:8080"
        );
      } else {
        setError("Failed to fetch delivery information. Please try again.");
      }

      setShipping(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clear the tracking results and form
  const clearTracking = () => {
    setTrackingId("");
    setShipping(null);
    setError(null);
  };

  return {
    trackingId,
    shipping,
    isLoading,
    error,
    handleInputChange,
    trackDelivery,
    clearTracking,
  };
}
