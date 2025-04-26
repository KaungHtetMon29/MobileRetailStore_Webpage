// Service functions for repair tracking API interactions
import { RepairData } from "@/app/repairTrack/tracking-logic";

const API_BASE_URL = "http://localhost:8080";

export async function getRepairById(id: string): Promise<{
  status: string;
  data?: RepairData;
  error?: string;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/repairs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      return {
        status: "error",
        error: `Repair ID ${id} does not exist. Please check the ID and try again.`,
      };
    }

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      return {
        status: "error",
        error:
          errorData.message ||
          `Error ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();

    if (!data.data) {
      return {
        status: "error",
        error: "No repair data found for this ID",
      };
    }

    return data;
  } catch (error) {
    console.error("Error fetching repair:", error);
    return {
      status: "error",
      error:
        error instanceof Error
          ? error.message
          : "Unable to connect to repair service",
    };
  }
}

export async function getAllRepairs(): Promise<{
  status: string;
  data?: RepairData[];
  count?: number;
  error?: string;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/repairs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      return {
        status: "error",
        error:
          errorData.message ||
          `Error ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching repairs:", error);
    return {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
