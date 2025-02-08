import ContactCard from "@/components/contactCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock } from "lucide-react";
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
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </div>
        <div className="flex w-full justify-between">
          <ContactCard />
          <ContactCard />
          <ContactCard />
        </div>
        <div className="w-full">
          <Card className="w-full shadow-none">
            <CardHeader>Business Hours</CardHeader>
            <CardContent className="w-full flex">
              <div className="w-1/2 flex gap-4">
                <div className="justify-center pt-[.5px]">
                  <Clock size={24} />
                </div>
                <div className="flex flex-col gap-4 justify-center">
                  <h3 className="text-xl font-semibold">Weekdays</h3>
                  <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
              <div className="w-1/2 flex gap-4">
                <div className="justify-center pt-[.5px]">
                  <Clock size={24} />
                </div>
                <div className="flex flex-col gap-4 justify-center">
                  <h3 className="text-xl font-semibold">Weekend</h3>
                  <p>Saturday: 10:00 AM - 5:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full p-5 rounded-xl bg-white"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold">
              Is it styled?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-semibold">
              Is it animated?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Send Us a Message</h2>
        <div className="bg-white p-6 rounded-xl">
          <form className="flex flex-col gap-4 w-full">
            <div className="flex gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 rounded-lg border-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded-lg border-2"
              />
            </div>

            <textarea
              placeholder="Message"
              className="w-full h-60 p-2 rounded-lg border-2 resize-none"
            ></textarea>
            <div className="flex justify-end">
              <Button className="w-fit text-lg px-10 right-0 py-6">Send</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
