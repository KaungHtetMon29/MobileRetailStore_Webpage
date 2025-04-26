"use client";

import { useState } from "react";
import { getRepairById } from "@/lib/services/repair-service";

// Updated repair status types based on backend

// Define status entry type
export interface RepairStatusEntry {
  ID: number;
  UpdatedBy: string;
  UpdatedAt: string;
  Status: string;
  RepairID: number;
}

// Updated repair data structure to match backend
export interface RepairData {
  ID: number;
  UserId: string;
  RepairStatus: RepairStatusEntry[];
  Product: string;
  Category: string;
  CreatedAt: string;
  UpdatedAt: string;
  Description: string;
}

// Transformed data for frontend display
export interface RepairDisplayData {
  id: number;
  deviceName: string;
  repairType: string;
  startDate: string;
  estimatedCompletion: string;
  status: string;
  notes: string;
  events: {
    date: string;
    status: string;
    description: string;
  }[];
}

export function useRepairTracking() {
  const [repairId, setRepairId] = useState<string>("");
  const [repair, setRepair] = useState<RepairDisplayData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepairId(e.target.value);
  };

  // Transform backend data to frontend display format
  const transformRepairData = (data: RepairData): RepairDisplayData => {
    // Sort repair statuses by date (newest first)
    const sortedStatuses = [...data.RepairStatus].sort(
      (a, b) =>
        new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime()
    );

    // Get the current status (most recent)
    const currentStatus =
      sortedStatuses.length > 0 ? sortedStatuses[0].Status : "unknown";

    // Create events from repair status history (oldest first)
    const events = [...sortedStatuses].reverse().map((status) => ({
      date: new Date(status.UpdatedAt).toLocaleDateString(),
      status: getStatusDisplayName(status.Status),
      description: getStatusDescription(status.Status),
    }));

    // Calculate estimated completion date (3 days from creation for demo)
    const startDate = new Date(data.CreatedAt);
    const estimatedCompletion = new Date(startDate);
    estimatedCompletion.setDate(startDate.getDate() + 3);

    return {
      id: data.ID,
      deviceName: data.Product,
      repairType: data.Category,
      startDate: startDate.toLocaleDateString(),
      estimatedCompletion: estimatedCompletion.toLocaleDateString(),
      status: currentStatus,
      notes: data.Description,
      events: events,
    };
  };

  // Get display name for status
  const getStatusDisplayName = (status: string): string => {
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

  // Get description for status
  const getStatusDescription = (status: string): string => {
    switch (status) {
      case "analyzing":
        return "Technician performing diagnostics";
      case "repairing":
        return "Repair in progress";
      case "ready to pickup":
        return "Repair completed successfully";
      default:
        return "Status updated";
    }
  };

  const trackRepair = async () => {
    if (!repairId) {
      setError("Please enter a repair ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use the repair service
      const result = await getRepairById(repairId);

      if (result.status === "success" && result.data) {
        setRepair(transformRepairData(result.data));
      } else {
        // Display the specific error message from the service
        setError(result.error || `Unable to find repair with ID: ${repairId}`);
        setRepair(null);
      }
    } catch (err) {
      console.error("Failed to fetch repair information:", err);
      setError(
        "An unexpected error occurred while retrieving repair information. Please try again."
      );
      setRepair(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the repair tracking results and form
  const clearTracking = () => {
    setRepairId("");
    setRepair(null);
    setError(null);
  };

  return {
    repairId,
    repair,
    isLoading,
    error,
    handleInputChange,
    trackRepair,
    clearTracking,
  };
}
