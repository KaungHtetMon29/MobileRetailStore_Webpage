import { NextRequest, NextResponse } from "next/server";

// Sample shipping data (in a real app, this would come from a database)
const sampleShippings = [
  {
    id: 1,
    address: "123 Main St",
    firstName: "John",
    lastName: "Doe",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "USA",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    createdAt: "2025-04-20T10:30:00Z",
    orderId: 12345,
    shippingStatus: "shipping",
    updatedAt: "2025-04-22T14:45:00Z",
    updatedBy: "Shipping Dept",
  },
  {
    id: 2,
    address: "456 Market St",
    firstName: "Jane",
    lastName: "Smith",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    email: "jane.smith@example.com",
    phone: "555-987-6543",
    createdAt: "2025-04-18T09:15:00Z",
    orderId: 12346,
    shippingStatus: "preparing",
    updatedAt: "2025-04-18T15:20:00Z",
    updatedBy: "Order Dept",
  },
  {
    id: 3,
    address: "789 Park Ave",
    firstName: "Robert",
    lastName: "Johnson",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    country: "USA",
    email: "robert.j@example.com",
    phone: "555-555-5555",
    createdAt: "2025-04-15T11:45:00Z",
    orderId: 12347,
    shippingStatus: "arrived",
    updatedAt: "2025-04-23T09:30:00Z",
    updatedBy: "Delivery Dept",
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // Find the shipping by ID
  const shipping = sampleShippings.find((s) => s.id === parseInt(id));

  if (!shipping) {
    return NextResponse.json(
      { success: false, error: "Shipping not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: shipping,
  });
}
