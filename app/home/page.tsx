"use client";
import { useEffect, useRef } from "react";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import Footer from "@/components/footer";
import Image from "next/image";
import ProductCard from "@/components/productCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

export default function Home() {
  const parallax = useRef<IParallax>(null!);
  useEffect(() => {
    fetch("/api/test").then((data) => data.json());
  }, []);
  return (
    <div>
      <Parallax ref={parallax} pages={5} className=" no-scrollbar bg-black">
        {/* background 1*/}
        {/* <ParallaxLayer
          offset={0}
          speed={0}
          factor={0.5}
          className="w-full h-full bg-black"
        /> */}
        <ParallaxLayer
          offset={0}
          speed={-3}
          factor={1}
          className="w-full h-full justify-center flex"
        >
          <div className="container flex h-full w-full gap-10 items-center justify-between">
            <Image
              src="/images/Iphone15Pro.png"
              className="object-contain"
              width={600}
              height={600}
              alt="iphone15pro"
            />
            <div className="text-background flex justify-center w-full h-full text-6xl gap-10 font-bold flex-col">
              <p>Tech Made Easy.</p>
              <p>Shop Smart. Repair Smarter.</p>
              <p>Track Every Step.</p>
              <div className="font-normal text-xl cursor-pointer">
                Check Latest Models {">"} Buy Now
              </div>
            </div>
          </div>
        </ParallaxLayer>
        {/* background 2*/}
        <ParallaxLayer
          offset={1}
          speed={0}
          factor={1}
          className="bg-gray-50 w-full h-full"
        />
        <ParallaxLayer
          offset={1}
          speed={-2}
          factor={1}
          className="justify-center bg-repeat-round flex items-center "
        >
          <div className="container flex items-center justify-center flex-col gap-10 py-20">
            <h2 className="text-6xl tracking-tight font-bold">
              Which Phone is right for you?
            </h2>
            <div className="flex gap-20 items-center justify-between">
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </ParallaxLayer>
        {/* background 3*/}
        <ParallaxLayer
          offset={2}
          speed={0}
          factor={1}
          className="w-full h-full relative"
        >
          <div className="absolute w-full h-full bg-black/60 backdrop-blur-sm z-40"></div>
          <Image
            src="/images/devices.jpg"
            className="object-cover w-full h-full blur-sm"
            width={1000}
            height={1000}
            alt="devices"
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          speed={-2}
          factor={1}
          className="w-full h-full justify-center flex"
        >
          <div className="container flex h-full w-full pt-20 flex-col gap-14 items-center justify-center">
            <h2 className="text-6xl tracking-tight font-bold text-white">
              Comparing Models
            </h2>
            <div className="flex gap-20 items-center justify-between">
              <ComparisonCard />
              <ComparisonCard />
              <ComparisonCard />
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0} factor={1} className="bg-gray-50" />
        <ParallaxLayer
          offset={3}
          speed={-3}
          factor={1}
          className="w-full h-full justify-center flex items-center"
        >
          <div className="container flex h-full w-full pt-20 flex-col gap-14 items-center justify-center ">
            <h2 className="text-6xl tracking-tight font-bold ">
              What Our Customers Say
            </h2>
            <div className="flex gap-20 items-center justify-between">
              <CustomerReviewCard />
              <CustomerReviewCard />
              <CustomerReviewCard />
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={0} factor={1} className="bg-primary" />
        <ParallaxLayer
          offset={4}
          speed={1}
          factor={0.5}
          className="w-fit h-fit justify-center items-center flex "
        >
          <div className="container flex h-full w-full pt-20 flex-col gap-14 items-center justify-center text-white">
            <h2 className="text-6xl tracking-tight font-bold ">Stay Updated</h2>
            <div className="w-[800px] h-16 flex items-center justify-between">
              <input
                className="h-full rounded-l-xl px-4  text-lg w-full"
                placeholder="Enter Email"
              />
              <Button
                variant={"default"}
                className="border-[1px] border-white rounded-l-none rounded-r-xl h-full w-[20rem] text-xl"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={4}
          speed={3.5}
          factor={1}
          className="w-fit h-fit justify-end items-end flex"
        >
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

const ComparisonCard = () => {
  return (
    <Card className="w-[350px] h-[500px] bg-white/40 border-0 backdrop-blur-2xl">
      <div className="h-1/2 w-full flex justify-center ">
        <Image
          src="/images/Iphone15Pro.png"
          alt="product"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
      <CardContent className="flex w-full flex-col gap-3 h-1/2 justify-between bg-primary rounded-b-lg">
        <CardTitle className="text-background pt-3">IPhone 16 pro</CardTitle>
        <CardDescription className="flex flex-col gap-1 text-background">
          <h2 className="font-semibold">Specification</h2>
          <ul>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
          </ul>
        </CardDescription>
        <Button className="bg-background text-primary">Add to Cart</Button>
      </CardContent>
    </Card>
  );
};

const CustomerReviewCard = () => {
  return (
    <Card className="w-[400px] h-auto bg-primary border-0 rounded-2xl py-5 text-white">
      <CardHeader className="flex flex-row gap-5 items-center">
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
          alt="product"
          width={100}
          height={100}
          className="object-cover w-16 h-16 rounded-full justify-center"
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-md">Name</h3>
          <p className="text-sm">Professional Photographer</p>
        </div>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3 h-full">
        <CardTitle className="text-background pt-3 flex gap-4">
          <StarIcon size={20} /> <StarIcon size={20} /> <StarIcon size={20} />
          <StarIcon size={20} />
        </CardTitle>
        <CardDescription className="flex flex-col gap-1 text-lg ">
          <p className="overflow-y-auto h-auto text-white ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            omnis quae minima dolore laudantium, velit dignissimos nemo ducimus
            earum expedita tempora aut rem maiores, error vitae voluptatum!Lorem
            ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
