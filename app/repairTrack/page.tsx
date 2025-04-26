"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, XCircle } from "lucide-react";
import { useRepairTracking } from "./tracking-logic";
import TrackingInput from "./tracking-input";

export default function Page() {
  const {
    repairId,
    repair,
    isLoading,
    error,
    handleInputChange,
    trackRepair,
    clearTracking,
  } = useRepairTracking();

  // Get appropriate badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "analyzing":
        return "secondary";
      case "repairing":
        return "default";
      case "ready to pickup":
        return "success";
      default:
        return "outline";
    }
  };

  // Get user-friendly status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "analyzing":
        return "Analyzing";
      case "repairing":
        return "Repairing";
      case "ready to pickup":
        return "Ready for Pickup";
      default:
        return status;
    }
  };

  return (
    <>
      <div className="w-full justify-center flex flex-col gap-10 items-center pb-20">
        <h2 className="text-4xl font-bold">Repair Status Tracking</h2>
        <div className="w-[1000px] justify-center p-7 bg-gray-200 items-center flex rounded-xl">
          <TrackingInput
            value={repairId}
            onChange={handleInputChange}
            onSubmit={trackRepair}
            placeholder="Enter Your Repair ID"
            btnText="Track"
            isLoading={isLoading}
          />
        </div>

        {error && (
          <Alert variant="destructive" className="w-[1000px]">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {(repair || error) && (
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

        {repair && (
          <div className="w-[1000px]">
            <Card className="border-0 overflow-hidden">
              <CardHeader className="border-b-2 px-10 flex flex-row justify-between">
                <div className="flex flex-col w-4/5">
                  <CardTitle className="text-2xl">
                    {repair.deviceName}
                  </CardTitle>
                  <CardDescription className="flex flex-col gap-4">
                    <div className="flex flex-col gap-10 text-xl">
                      <p>{repair.repairType}</p>
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <Calendar size={24} />
                          <p>Start Date: {repair.startDate}</p>
                        </div>
                        <div className="flex gap-4">
                          <Clock size={24} />
                          <p>Est. Completion: {repair.estimatedCompletion}</p>
                        </div>
                      </div>
                    </div>
                  </CardDescription>
                </div>
                <Badge
                  variant={getBadgeVariant(repair.status)}
                  className="h-fit py-2 text-base rounded-full px-4"
                >
                  {getStatusText(repair.status)}
                </Badge>
              </CardHeader>
              <CardContent className="px-10 py-5 flex flex-col gap-5">
                <h3 className="text-2xl font-bold">Repair Timeline</h3>
                <div className="flex flex-col gap-10">
                  {repair.events.map((event, index) => (
                    <div
                      key={index}
                      className="flex gap-10 justify-start items-center text-lg"
                    >
                      <p>{event.date}</p>
                      <div>
                        <p className="text-xl font-bold">{event.status}</p>
                        <p className="font-extralight">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-10 py-5 flex flex-col gap-5 justify-start items-start bg-gray-200">
                <p>
                  <span className="font-bold">Notes: </span>
                  {repair.notes}
                </p>
              </CardFooter>
            </Card>
          </div>
        )}

        {!repair && !error && !isLoading && (
          <div className="w-[1000px] text-center p-10 bg-gray-100 rounded-xl">
            <p className="text-lg text-gray-600">
              Enter your repair ID above to see the status of your repair.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
