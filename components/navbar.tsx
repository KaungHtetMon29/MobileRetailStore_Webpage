import Container from "@/layouts/container";
import { Search, ShoppingCartIcon, User } from "lucide-react";
import Link from "next/link";

export default function Nav() {
  return (
    <header className="w-full justify-center flex backdrop-blur-lg bg-black/90 top-0 fixed z-50 ">
      <Container>
        <div className="flex text-white justify-between py-4 items-center">
          <div>
            <h2 className="font-bold text-2xl">ZanShop</h2>
          </div>
          <div className="flex gap-20">
            <Link href="/">Home</Link>
            <Link href="/product">Product</Link>
            <Link href="/repairTrack">Track Repair</Link>
            <Link href="/deliveryTrack">Track Delivery</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="flex gap-6">
            <SearchBox />
            <LoginBtn />
            <ShoppingCart />
          </div>
        </div>
      </Container>
    </header>
  );
}

const SearchBox = () => {
  return (
    <div className="flex gap-4 rounded-full bg-white items-center px-3 py-1">
      <Search size={20} className="text-zinc-600" />
      <input
        className="w-[200px] text-md text-foreground outline-none"
        placeholder="Search..."
      />
    </div>
  );
};

const LoginBtn = () => {
  return (
    <div className=" items-center gap-2 flex">
      <User />
      <Link href="/login">Login</Link>
    </div>
  );
};

const ShoppingCart = () => {
  return (
    <Link
      href={"/cart"}
      className="items-center gap-2 flex relative cursor-pointer"
    >
      <ShoppingCartIcon size={25} />
      <span className="absolute -top-0 -right-2 bg-white w-5 h-5 text-primary flex justify-center items-center text-center rounded-full text-sm">
        0
      </span>
    </Link>
  );
};
