"use client";

import Container from "@/layouts/container";
import {
  Search,
  ShoppingCartIcon,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/contexts/CartContext";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

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
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="items-center gap-2 flex">
        <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return (
      <div className="items-center gap-2 flex">
        <User />
        <Link href="/login">Login</Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="items-center gap-2 flex cursor-pointer"
        onClick={toggleDropdown}
      >
        {session.user.image ? (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            {session.user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        <span className="text-sm font-medium">
          {session.user.name?.split(" ")[0] || "User"}
        </span>
        <ChevronDown size={16} />
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800 z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile
          </Link>
          <Link
            href="/orders"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            My Orders
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

const ShoppingCart = () => {
  const { totalItems } = useCart();

  return (
    <Link
      href={"/cart"}
      className="items-center gap-2 flex relative cursor-pointer"
    >
      <ShoppingCartIcon size={25} />
      {totalItems > 0 && (
        <span className="absolute -top-0 -right-2 bg-white w-5 h-5 text-primary flex justify-center items-center text-center rounded-full text-sm">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
};
