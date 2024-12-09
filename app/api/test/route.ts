export async function GET(request: Request) {
  console.log("TEST");
  return Response.json({ message: "Hello, World!" });
}
