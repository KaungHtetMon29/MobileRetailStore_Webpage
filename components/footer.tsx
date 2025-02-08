import {
  Facebook,
  Instagram,
  Linkedin,
  MailIcon,
  MapPin,
  PhoneIcon,
  Twitter,
} from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="w-full justify-items-center bg-primary z-10">
      <div className="container justify-center text-white py-20 items-center w-full flex flex-col gap-10">
        <div className="flex w-full justify-between">
          <div className="w-1/4 flex  flex-col gap-6 pr-4">
            <h3 className="text-2xl font-bold">ZenShop</h3>
            <p className="leading-8 w-3/4">
              Your trusted destination for the latest smartphones and
              professional repair services
            </p>
            <div className="flex justify-between w-1/3">
              <Facebook size={20} />
              <Twitter size={20} />
              <Instagram size={20} />
              <Linkedin size={20} />
            </div>
          </div>
          <div className="w-1/4 flex flex-col gap-6 pr-4 h-full grow">
            <h3 className="text-2xl font-bold">Quick Links</h3>
            <ul className="space-y-3">
              <li>Home</li>
              <li>Product</li>
              <li>Track Repair</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="w-1/4 flex flex-col gap-6 pr-4">
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <p>123 Tech Street, Digital City</p>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon size={20} />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon size={20} />
                <p>support@phonestore.com</p>
              </div>
            </div>
          </div>
          <div className="w-1/4 flex flex-col gap-6 pr-4">
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <p>Subscribe for updates and exclusive offers</p>
            <div className="w-fit items-center flex">
              <input
                className="h-full rounded-l-lg p-2 text-sm"
                placeholder="Enter Email"
              />
              <Button
                variant={"default"}
                className="border-[1px] border-white rounded-l-none"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <hr className="border-[.5px] w-full" />
        <div className="w-full items-center justify-center flex">
          <p>&copy; 2023 Zehshop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
