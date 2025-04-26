export interface Product {
  ID: string;
  Name: string;
  Price: number;
  ImageURL: string;
}

export interface ProductPerOrder {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  Product: Product;
}

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  type: string;
  cardholder_name: string;
  card_number_last4: string;
  expiry_date: string;
  created_at: string;
}

export interface Shipping {
  id: string;
  order_id: string;
  address: string;
  first_name: string;
  last_name: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Order {
  ID: string;
  UserID: string;
  CreatedAt: string;
  Payment: Payment;
  Shipping: Shipping;
  ProductPerOrder: ProductPerOrder[];
  Status?: "processing" | "shipped" | "delivered" | "cancelled";
  ShippingID?: number; // Field for shipping ID
  TrackingInfo?: string; // Field for tracking information
}

export interface OrdersResponse {
  data: Order[];
  status: string;
  count: number;
}
