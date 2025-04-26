export interface ShippingData {
  ID: number; // Changed from id to ID to match Go struct
  Address: string; // Changed capitalization to match Go struct
  FirstName: string;
  LastName: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  Email?: string;
  Phone: string;
  CreatedAt: string; // Changed capitalization to match Go struct
  OrderID: number; // Changed from orderId to OrderID
  ShippingStatus: "preparing" | "shipping" | "arrived";
  UpdatedAt?: string;
  UpdatedBy?: string;
}

export interface TrackingSearchParams {
  id?: string | number;
}
