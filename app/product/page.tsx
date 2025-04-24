import ProductCard from "@/components/productCard";

export default async function Home() {
  const res = await fetch("http://localhost:8080/products");
  const data = await res.json();
  console.log(data);
  // useEffect(() => {
  //   fetch("/api/test").then((data) => data.json());
  // }, []);
  return (
    <div className="w-full h-full justify-items-center items-center my-10 ">
      <div className="grid grid-flow-row grid-cols-4 gap-8">
        {data.data.map((product: any) => (
          <ProductCard key={product.ID} product={product} />
        ))}
      </div>
    </div>
  );
}
