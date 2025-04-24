"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft, CircleCheckBig } from "lucide-react";
import Form from "next/form";
import handleFormSubmit from "./action";
import { Dispatch, SetStateAction, useState } from "react";

export default function Page() {
  const [step, setstep] = useState(3);
  return (
    <div className="w-3/4 ">
      <div className="flex flex-col items-center w-full gap-10">
        <div className="flex gap-4 w-full flex-col">
          <div className="flex gap-4 items-center">
            <ArrowLeft size={24} />
            <h2 className="text-2xl font-bold">Checkout</h2>
          </div>
          <div className="flex flex-col gap-6">
            <div className=" flex w-full justify-between">
              <Steps no={1} label="Shipping" setStep={() => setstep(3)} />
              <Steps no={2} label="Payment" setStep={() => setstep(2)} />
              <Steps no={3} label="Confirmation" setStep={() => setstep(1)} />
            </div>
            <Progress value={100 / step} className="bg-gray-300" />
          </div>
        </div>
        <div className="w-full bg-gray-200 py-6 px-12 flex flex-col gap-5 rounded-xl">
          <div className="flex justify-between w-full text-xl">
            <h4>Order Total</h4>
            <h4>Items</h4>
          </div>
          <div className="flex justify-between w-full text-2xl font-bold">
            <p>$999.00</p>
            <p>iphone 14 Pro</p>
          </div>
        </div>
        <div className="w-full">
          {step === 3 && <ShippingForm setStep={setstep} />}
          {step === 2 && <PaymentForm setStep={setstep} />}
          {step === 1 && <ConfirmationForm />}
        </div>
      </div>
      <div></div>
    </div>
  );
}

const Steps = ({
  no,
  label,
  setStep,
}: {
  no: number;
  label: string;
  setStep: () => void;
}) => {
  return (
    <div className="w-1/3 ">
      <div className="flex gap-2 flex-col items-center ">
        <h3
          onClick={() => setStep()}
          className="w-14 cursor-pointer h-14 bg-primary text-white font-bold rounded-full flex items-center justify-center"
        >
          {no}
        </h3>
        <h2 className="text-xl font-bold">{label}</h2>
      </div>
    </div>
  );
};

const ShippingForm = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="w-full p-6 bg-white rounded-xl flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Shipping Information</h2>
      <Form action={handleFormSubmit} className="w-full flex flex-col gap-6">
        <div className="w-full flex justify-between gap-10">
          <div className="w-full flex-col flex gap-2">
            <Label>First Name</Label>
            <Input className="shadow-none py-4" type="text" />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>Last Name</Label>
            <Input className="shadow-none py-4" type="text" />
          </div>
        </div>
        <div className="w-full flex-col flex gap-2">
          <Label>Address</Label>
          <Input className=" shadow-none py-4" type="text" />
        </div>
        <div className="w-full flex justify-between gap-10">
          <div className="w-full flex-col flex gap-2">
            <Label>City</Label>
            <Input className=" shadow-none py-4" type="text" />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>State</Label>
            <Input className=" shadow-none py-4" type="text" />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>Zip Code</Label>
            <Input className=" shadow-none py-4" type="text" />
          </div>
        </div>
        <Button
          className="w-full text-lg py-6"
          type="submit"
          onClick={() => setStep(2)}
        >
          Continue to Payment
        </Button>
      </Form>
    </div>
  );
};

const PaymentForm = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="w-full p-6 bg-white rounded-xl flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Payment Information</h2>
      <Form action={handleFormSubmit} className="w-full flex flex-col gap-6">
        <div className="w-full flex-col flex gap-2">
          <Label>Email</Label>
          <Input className=" shadow-none py-4" type="text" />
        </div>
        <div className="w-full flex-col flex gap-2">
          <Label>Card Information</Label>
          <Input className=" shadow-none py-4" type="text" />
        </div>
        <div className="w-full flex justify-between gap-10">
          <div className="w-full flex-col flex gap-2">
            <Label>Expiry Date</Label>
            <Input className="shadow-none py-4" type="text" />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>CVC</Label>
            <Input className="shadow-none py-4" type="text" />
          </div>
        </div>

        <div className="w-full flex justify-between gap-10">
          <div className="w-full flex-col flex gap-2">
            <Label>Country</Label>
            <Input className=" shadow-none py-4" type="text" />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>Address Line1</Label>
            <Input className=" shadow-none py-4" type="text" />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>Suburb</Label>
            <Input className=" shadow-none py-4" type="text" />
          </div>
        </div>
        <div className="w-full flex justify-between gap-10">
          <div className="w-full flex-col flex gap-2">
            <Label>City</Label>
            <Input className=" shadow-none py-4" type="text" />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>Province</Label>
            <Input className=" shadow-none py-4" type="text" />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>Postal code</Label>
            <Input className=" shadow-none py-4" type="text" />
          </div>
        </div>
        <Button
          className="w-full text-lg py-6"
          type="submit"
          onClick={() => setStep(1)}
        >
          Continue to Payment
        </Button>
      </Form>
    </div>
  );
};

const ConfirmationForm = () => {
  return (
    <div className="flex flex-col gap-3 items-center bg-white py-12 rounded-xl">
      <div className="w-24 h-24 rounded-full bg-green-300 flex items-center justify-center">
        <CircleCheckBig size={50} className="text-green-600" />
      </div>
      <h2 className="text-3xl font-bold">Order Confirmed</h2>
      <p className="text-xl text-gray-600">Thank you for your purchase</p>
      <h2 className="text-3xl font-bold">Order Number:#12334</h2>
    </div>
  );
};
