import ContactCard from "@/components/contactCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <div className="w-full justify-items-center flex flex-col gap-10 items-center">
        <div className=" w-full justify-items-center items-center gap-8 flex flex-col">
          <h2 className="text-4xl font-bold">Get in Touch</h2>
          <p className="text-2xl w-1/2 text-center">
            Have questions about our products or services? Our team is here to
            help you with any inquiries. Reach out to us using any of the
            methods below.
          </p>
        </div>
        <div className="flex w-full justify-between">
          <Card className="w-[450px] items-center justify-items-center shadow-none">
            <CardHeader>
              <div className="w-16 h-16 bg-primary items-center justify-center flex rounded-full p-2">
                <Phone size={32} className="text-background" />
              </div>
            </CardHeader>
            <CardContent className="justify-items-center flex flex-col gap-2 items-center">
              <h3 className="text-2xl font-bold">Call Us</h3>
              <p>Speak directly with our customer service team</p>
              <a
                href="tel:+18005551234"
                className="font-medium text-blue-600 hover:underline"
              >
                +1 (800) 555-1234
              </a>
              <p className="text-sm text-gray-500 mt-2">
                Available during business hours
              </p>
            </CardContent>
          </Card>

          <Card className="w-[450px] items-center justify-items-center shadow-none">
            <CardHeader>
              <div className="w-16 h-16 bg-primary items-center justify-center flex rounded-full p-2">
                <Mail size={32} className="text-background" />
              </div>
            </CardHeader>
            <CardContent className="justify-items-center flex flex-col gap-2 items-center">
              <h3 className="text-2xl font-bold">Email Us</h3>
              <p>Send us your questions anytime</p>
              <a
                href="mailto:support@techstore.com"
                className="font-medium text-blue-600 hover:underline"
              >
                support@techstore.com
              </a>
              <p className="text-sm text-gray-500 mt-2">
                We respond within 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="w-[450px] items-center justify-items-center shadow-none">
            <CardHeader>
              <div className="w-16 h-16 bg-primary items-center justify-center flex rounded-full p-2">
                <MapPin size={32} className="text-background" />
              </div>
            </CardHeader>
            <CardContent className="justify-items-center flex flex-col gap-2 items-center">
              <h3 className="text-2xl font-bold">Visit Us</h3>
              <p>Come to our flagship store</p>
              <address className="not-italic text-center">
                123 Tech Boulevard
                <br />
                San Francisco, CA 94105
                <br />
                United States
              </address>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Get directions
              </a>
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
          <Card className="w-full shadow-none">
            <CardHeader className="text-2xl font-bold">
              Business Hours
            </CardHeader>
            <CardContent className="w-full flex ">
              <div className="w-1/2 flex gap-4 items-start justify-start">
                <div className="justify-center pt-[.5px]">
                  <Clock size={24} />
                </div>
                <div className="flex flex-col gap-4 justify-center">
                  <h3 className="text-xl font-semibold">Weekdays</h3>
                  <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                  <p className="text-sm text-gray-500">
                    Customer service: 8:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
              <div className="w-1/2 flex gap-4 items-start justify-start">
                <div className="justify-center pt-[.5px]">
                  <Clock size={24} />
                </div>
                <div className="flex flex-col gap-4 justify-center">
                  <h3 className="text-xl font-semibold">Weekend</h3>
                  <p>Saturday: 10:00 AM - 5:00 PM</p>
                  <p>Sunday: Closed</p>
                  <p className="text-sm text-gray-500">
                    Online support available 24/7
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-10">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full p-5 rounded-xl bg-white"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">
              What is your return policy?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              We offer a 30-day return policy for all our products. Items must
              be in their original condition with all packaging and accessories.
              Refunds are typically processed within 5-7 business days after we
              receive the returned item.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold">
              How can I track my order?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Once your order ships, you'll receive a tracking number via email.
              You can also view your order status by logging into your account
              and navigating to the "Order History" section. Additionally, you
              can use our delivery tracking tool on the website.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-semibold">
              Do you offer international shipping?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Yes, we ship to over 50 countries worldwide. International
              shipping rates and delivery times vary depending on the
              destination. You can calculate shipping costs at checkout before
              completing your purchase.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-semibold">
              How do I request a repair for my device?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              You can initiate a repair request through our website by visiting
              the "Repair Services" section and filling out the repair form.
              Alternatively, you can contact our customer service team directly
              by phone or email to discuss your repair needs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-xl font-semibold">
              What warranty do you provide on your products?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Most of our products come with a standard 1-year manufacturer's
              warranty that covers defects in materials and workmanship. Select
              premium products may come with extended warranty options. Warranty
              details are specified on each product page and in the
              documentation that comes with your purchase.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-6 mt-10">
        <h2 className="text-2xl font-bold">Send Us a Message</h2>
        <div className="bg-white p-6 rounded-xl">
          <form className="flex flex-col gap-4 w-full">
            <div className="flex gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 rounded-lg border-2"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 rounded-lg border-2"
                required
              />
            </div>
            <div className="flex gap-6">
              <input
                type="tel"
                placeholder="Phone Number (optional)"
                className="w-full p-2 rounded-lg border-2"
              />
              <select className="w-full p-2 rounded-lg border-2">
                <option value="">Select Inquiry Type</option>
                <option value="product">Product Question</option>
                <option value="order">Order Status</option>
                <option value="return">Returns & Refunds</option>
                <option value="repair">Repair Service</option>
                <option value="other">Other</option>
              </select>
            </div>
            <textarea
              placeholder="Your Message"
              className="w-full h-60 p-2 rounded-lg border-2 resize-none"
              required
            ></textarea>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="newsletter" className="rounded" />
              <label htmlFor="newsletter" className="text-sm">
                Subscribe to our newsletter for updates and promotions
              </label>
            </div>
            <div className="flex justify-end">
              <Button className="w-fit text-lg px-10 right-0 py-6">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
