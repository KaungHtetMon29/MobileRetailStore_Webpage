"use client";
import { useEffect, useRef, useState } from "react";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import Footer from "@/components/footer";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, StarIcon } from "lucide-react";
import {
  Product,
  getLatestProducts,
  getRandomProducts,
} from "@/lib/services/product-service";
import { useCart } from "@/lib/contexts/CartContext";

export default function Home() {
  const parallax = useRef<IParallax>(null!);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Scroll to specific page when navigation is clicked
  const scrollTo = (page: number) => {
    parallax.current.scrollTo(page);
    setActiveSection(page);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Fetch random products for "Which phone is right for you?" section
        const random = await getRandomProducts(3);
        setRandomProducts(random);

        // Fetch latest products for "Latest Releases" section
        const latest = await getLatestProducts(3);
        setLatestProducts(latest);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Please enter your email");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Handle successful subscription
    // In a real app, you would send this to your API
    console.log("Subscribing with email:", email);
    setIsSubscribed(true);
    setEmail("");

    // Reset subscription status after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  // Fallback products in case API fails or returns empty results
  const fallbackProducts: Product[] = [
    {
      ID: 1,
      Name: "iPhone 15 Pro",
      Description: "Apple's latest flagship smartphone",
      Price: 999,
      StockQuantity: 50,
      ImageURL: "/images/Iphone15Pro.png",
      Brand: { ID: 1, Name: "Apple" },
      CategoryID: 1,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    },
    {
      ID: 2,
      Name: "Samsung Galaxy S24",
      Description: "Samsung's flagship smartphone",
      Price: 899,
      StockQuantity: 45,
      ImageURL: "/images/Iphone15Pro.png",
      Brand: { ID: 2, Name: "Samsung" },
      CategoryID: 1,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    },
    {
      ID: 3,
      Name: "Google Pixel 8",
      Description: "Google's premium smartphone",
      Price: 799,
      StockQuantity: 30,
      ImageURL: "/images/Iphone15Pro.png",
      Brand: { ID: 3, Name: "Google" },
      CategoryID: 1,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    },
  ];

  // Use fallback products if API returns empty results
  const displayRandomProducts =
    randomProducts.length > 0 ? randomProducts : fallbackProducts;
  const displayLatestProducts =
    latestProducts.length > 0 ? latestProducts : fallbackProducts;

  return (
    <>
      <div className="fixed right-10 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full ${
              activeSection === index ? "bg-primary" : "bg-white/50"
            } transition-all duration-300 hover:bg-primary hover:scale-125`}
            aria-label={`Scroll to section ${index + 1}`}
          />
        ))}
      </div>
      <Parallax
        ref={parallax}
        pages={5}
        className="w-full h-screen no-scrollbar bg-black"
      >
        {/* background 1*/}
        <ParallaxLayer
          offset={0}
          speed={-3}
          factor={1}
          className="w-full h-full justify-center flex"
        >
          <div className="container flex h-full w-full gap-10 items-center justify-between relative">
            <div className="absolute top-10 right-10 z-10 flex space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
            </div>

            <Image
              src="/images/Iphone15Pro.png"
              className="object-contain animate-float"
              width={600}
              height={600}
              alt="iphone15pro"
              priority
            />
            <div className="text-background flex justify-center w-full h-full text-6xl gap-10 font-bold flex-col">
              <p className="animate-fadeIn">Tech Made Easy.</p>
              <p className="animate-fadeIn animation-delay-300">
                Shop Smart. Repair Smarter.
              </p>
              <p className="animate-fadeIn animation-delay-600">
                Track Every Step.
              </p>
              <Button
                onClick={() => scrollTo(1)}
                className="font-normal text-xl mt-10 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full w-fit flex items-center group"
              >
                Explore Products
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Button>
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
          className="justify-center bg-repeat-round flex items-center"
        >
          <div className="container flex items-center justify-center flex-col gap-10 py-20">
            <h2 className="text-6xl tracking-tight font-bold relative">
              <span className="text-black">Which Phone is right for you?</span>
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-[500px]">
                <Loader2 className="h-10 w-10 animate-spin" />
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-[500px]">
                <p className="text-red-500 text-lg">{error}</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-10 items-center justify-center">
                {displayRandomProducts.map((product, index) => (
                  <div
                    key={product.ID}
                    className="transform hover:scale-105 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 200}ms`,
                      animation: "fadeIn 0.6s ease-out forwards",
                      opacity: 0,
                    }}
                  >
                    <HomeProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
            <Button
              onClick={() => scrollTo(2)}
              variant="outline"
              className="mt-10 border-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Explore Latest Releases
            </Button>
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
            <h2 className="text-6xl tracking-tight font-bold text-white relative">
              <span className="relative z-10">Latest Releases</span>
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-[500px]">
                <Loader2 className="h-10 w-10 animate-spin text-white" />
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-[500px]">
                <p className="text-red-500 text-lg bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  {error}
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-10 items-center justify-center">
                {displayLatestProducts.map((product, index) => (
                  <div
                    key={product.ID}
                    className="transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                    style={{
                      animationDelay: `${index * 300}ms`,
                      animation: "fadeIn 0.8s ease-out forwards",
                      opacity: 0,
                    }}
                  >
                    <LatestProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
            <Button
              onClick={() => scrollTo(3)}
              className="mt-10 bg-white text-primary hover:bg-white/80 transition-all duration-300"
            >
              See What Our Customers Say
            </Button>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0} factor={1} className="bg-gray-50" />
        <ParallaxLayer
          offset={3}
          speed={-3}
          factor={1}
          className="w-full h-full justify-center flex items-center"
        >
          <div className="container flex h-full w-full pt-20 flex-col gap-14 items-center justify-center">
            <h2 className="text-6xl tracking-tight font-bold relative inline-block">
              <span>What Our Customers Say</span>
              <div className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-primary rounded-full"></div>
            </h2>
            <div className="flex flex-wrap gap-10 items-center justify-center">
              <div
                className="transform hover:scale-105 transition-all duration-300"
                style={{
                  animation: "fadeIn 0.8s ease-out forwards",
                  opacity: 0,
                }}
              >
                <CustomerReviewCard
                  name="Sarah Johnson"
                  profession="Professional Photographer"
                  rating={5}
                  review="The camera quality on this smartphone is phenomenal! As a photographer, I need something reliable for on-the-go shots, and this device has exceeded my expectations. The battery life is impressive too."
                  imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
                />
              </div>
              <div
                className="transform hover:scale-105 transition-all duration-300"
                style={{
                  animation: "fadeIn 0.8s ease-out forwards",
                  animationDelay: "200ms",
                  opacity: 0,
                }}
              >
                <CustomerReviewCard
                  name="Michael Rodriguez"
                  profession="Software Developer"
                  rating={4}
                  review="I've been using this laptop for coding projects and it handles everything I throw at it. Fast compile times and the display is perfect for long coding sessions. My only wish is for slightly better battery life."
                  imageUrl="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200"
                />
              </div>
              <div
                className="transform hover:scale-105 transition-all duration-300"
                style={{
                  animation: "fadeIn 0.8s ease-out forwards",
                  animationDelay: "400ms",
                  opacity: 0,
                }}
              >
                <CustomerReviewCard
                  name="Emily Chen"
                  profession="Digital Marketing Specialist"
                  rating={5}
                  review="The customer service here is unmatched! Had an issue with my device and they resolved it promptly. Their technical support team really knows their stuff - they explained everything clearly and fixed my problem in minutes."
                  imageUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
                />
              </div>
            </div>
            <Button
              onClick={() => scrollTo(4)}
              className="mt-10 bg-primary text-white hover:bg-primary/90 flex items-center gap-2 group"
            >
              Subscribe to Our Newsletter
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Button>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={0} factor={1} className="bg-primary" />
        <ParallaxLayer
          offset={4}
          speed={1}
          factor={0.5}
          className="w-fit h-fit justify-center items-center flex z-30"
        >
          <div className="container flex h-full w-full pt-20 flex-col gap-14 items-center justify-center text-white relative z-40">
            <h2 className="text-6xl tracking-tight font-bold relative inline-block">
              <span>Stay Updated</span>
              <span className="absolute -bottom-3 left-0 w-full h-1 bg-white/70"></span>
            </h2>
            <p className="text-xl text-center max-w-2xl">
              Subscribe to our newsletter for exclusive deals, product updates,
              and tech tips delivered directly to your inbox.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="w-[800px] flex flex-col items-center pointer-events-auto"
            >
              <div className="h-16 flex items-center justify-between relative group w-full">
                <input
                  type="email"
                  name="email"
                  id="email-subscription"
                  className="h-full rounded-xl px-6 text-lg w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all pointer-events-auto z-50"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  aria-describedby="email-subscription-error"
                  required
                  style={{ pointerEvents: "auto" }}
                />
                <Button
                  type="submit"
                  variant={"default"}
                  className="absolute right-0 border-[1px] border-white rounded-xl h-full w-[12rem] text-xl bg-white text-primary hover:bg-white/90 transition-all group-hover:w-[13rem] pointer-events-auto z-50"
                  style={{ pointerEvents: "auto" }}
                >
                  <span className="flex items-center gap-2">
                    {isSubscribed ? "Subscribed!" : "Subscribe"}
                    {!isSubscribed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:translate-x-1 transition-transform"
                      >
                        <path d="m5 12 14 0"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    )}
                  </span>
                </Button>
              </div>
              {emailError && (
                <p
                  className="text-red-300 mt-2 self-start text-sm"
                  id="email-subscription-error"
                >
                  {emailError}
                </p>
              )}
              {isSubscribed && (
                <p className="text-green-300 mt-2 flex items-center gap-2">
                  <Check size={16} className="inline-block" />
                  Thank you! You've been subscribed to our newsletter.
                </p>
              )}
            </form>
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
    </>
  );
}

const HomeProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Format the product to match what CartContext expects
    const cartProduct = {
      id: product.ID,
      Name: product.Name,
      Price: product.Price,
      ImageURL: product.ImageURL,
      Brand: product.Brand,
      quantity: 1,
    };

    addToCart(cartProduct);
    setIsAdded(true);

    // Reset the button state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <Card className="w-[350px] h-[500px] rounded-lg border-0 flex flex-col">
      <div className="h-[250px] w-full flex justify-center items-center p-4">
        <Image
          src={product.ImageURL}
          alt={product.Name}
          width={200}
          height={200}
          className="object-contain h-full w-auto"
        />
      </div>
      <CardContent className="flex flex-col gap-3 flex-1 justify-between bg-primary rounded-b-lg p-4">
        <CardTitle className="text-background pt-3 text-xl leading-tight">
          {product.Name}
        </CardTitle>
        <CardDescription className="flex flex-col gap-1 text-background text-base">
          <h2 className="font-semibold text-sm">
            Brand - {product.Brand?.Name || "Unknown"}
          </h2>
          <h2 className="font-semibold text-sm mt-1">Specification</h2>
          <ul className="text-sm">
            <li>Price - ${product.Price}</li>
          </ul>
        </CardDescription>
        <Button
          className={`${
            isAdded ? "bg-green-500" : "bg-background"
          } text-primary mt-auto text-sm font-medium transition-colors`}
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {isAdded ? (
            <span className="flex items-center gap-2">
              <Check size={16} /> Added to Cart
            </span>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

const LatestProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Format the product to match what CartContext expects
    const cartProduct = {
      id: product.ID,
      Name: product.Name,
      Price: product.Price,
      ImageURL: product.ImageURL,
      Brand: product.Brand,
      quantity: 1,
    };

    addToCart(cartProduct);
    setIsAdded(true);

    // Reset the button state after  seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <Card className="w-[350px] h-[500px] bg-white/40 border-0 backdrop-blur-2xl">
      <div className="h-[200px] w-full flex justify-center items-center p-4">
        <Image
          src={product.ImageURL}
          alt={product.Name}
          width={200}
          height={200}
          className="object-contain h-full w-auto"
        />
      </div>
      <CardContent className="flex w-full flex-col gap-3 justify-between bg-primary rounded-b-lg p-4 h-[300px]">
        <CardTitle className="text-background pt-3 text-xl leading-tight">
          {product.Name}
        </CardTitle>
        <CardDescription className="flex flex-col gap-1 text-background text-base">
          <h2 className="font-semibold text-sm">
            Brand - {product.Brand?.Name || "Unknown"}
          </h2>
          <h2 className="font-semibold text-sm mt-1">Specification</h2>
          <p className="text-sm line-clamp-2">{product.Description}</p>
          <ul className="text-sm mt-2">
            <li>Price - ${product.Price}</li>
            <li className="mt-1">Stock - {product.StockQuantity} units</li>
          </ul>
          <p className="text-xs mt-2">
            Released: {new Date(product.CreatedAt).toLocaleDateString()}
          </p>
        </CardDescription>
        <Button
          className={`${
            isAdded ? "bg-green-500" : "bg-background"
          } text-primary mt-auto text-sm font-medium transition-colors`}
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {isAdded ? (
            <span className="flex items-center gap-2">
              <Check size={16} /> Added to Cart
            </span>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

const CustomerReviewCard = ({
  name = "Sarah Johnson",
  profession = "Professional Photographer",
  rating = 5,
  review = "The camera quality on this smartphone is phenomenal! As a photographer, I need something reliable for on-the-go shots, and this device has exceeded my expectations. The battery life is impressive too.",
  imageUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
} = {}) => {
  return (
    <Card className="w-[400px] h-auto bg-primary border-0 rounded-2xl py-5 text-white">
      <CardHeader className="flex flex-row gap-5 items-center">
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="object-cover w-16 h-16 rounded-full justify-center"
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-md">{name}</h3>
          <p className="text-sm">{profession}</p>
        </div>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3 h-full">
        <div className="pt-3 flex gap-2">
          {[...Array(rating)].map((_, i) => (
            <StarIcon
              key={i}
              size={20}
              className="text-yellow-400 fill-yellow-400"
            />
          ))}
          {[...Array(5 - rating)].map((_, i) => (
            <StarIcon key={i} size={20} className="text-gray-300" />
          ))}
        </div>
        <CardDescription className="flex flex-col gap-1 text-lg ">
          <p className="overflow-y-auto h-auto text-white ">{review}</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
