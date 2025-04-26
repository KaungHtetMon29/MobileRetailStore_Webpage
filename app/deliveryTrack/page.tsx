"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useDeliveryTracking } from "./tracking-logic";
import TrackingInput from "./tracking-input";
import DeliveryDetails from "./delivery-details";
import { XCircle } from "lucide-react";

export default function Page() {
  const {
    trackingId,
    shipping,
    isLoading,
    error,
    handleInputChange,
    trackDelivery,
    clearTracking,
  } = useDeliveryTracking();

  return (
    <>
      <div className="w-full justify-center flex flex-col gap-10 items-center pb-20">
        <h2 className="text-4xl font-bold">Delivery Tracking</h2>
        <div className="w-[1000px] justify-center p-7 bg-gray-200 items-center flex rounded-xl">
          <TrackingInput
            value={trackingId}
            onChange={handleInputChange}
            onSubmit={trackDelivery}
            placeholder="Enter Your Tracking ID"
            btnText="Track Delivery"
            isLoading={isLoading}
          />
        </div>

        {error && (
          <Alert variant="destructive" className="w-[1000px]">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {(shipping || error) && (
          <div className="w-[1000px] flex justify-end mb-2">
            <Button
              variant="outline"
              className="flex gap-2 items-center"
              onClick={clearTracking}
            >
              <XCircle size={18} />
              Clear Results
            </Button>
          </div>
        )}

        {shipping && (
          <div className="w-[1000px]">
            <DeliveryDetails shipping={shipping} />
          </div>
        )}

        {!shipping && !error && !isLoading && (
          <div className="w-[1000px] text-center p-10 bg-gray-100 rounded-xl">
            <p className="text-lg text-gray-600">
              Enter your tracking ID above to see the status of your delivery.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
