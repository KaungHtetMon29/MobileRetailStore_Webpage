"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft, CircleCheckBig, Loader2 } from "lucide-react";
import Form from "next/form";
import handleFormSubmit from "./action";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useCart } from "@/lib/contexts/CartContext";
import {
  ShippingInfo,
  PaymentInfo,
  CheckoutResult,
} from "@/lib/contexts/CartContext";
import Link from "next/link";

export default function Page() {
  const [step, setStep] = useState(3);
  const { totalItems, totalPrice, items } = useCart();
  const SHIPPING_FEE = 20; // Add shipping fee constant
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    email: "",
    phone: "",
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvc: "",
    billingAddressSameAsShipping: true,
  });
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResult | null>(
    null
  );

  // Redirect back to cart if cart is empty
  useEffect(() => {
    if (totalItems === 0 && step !== 1) {
      // Only redirect if not already on confirmation step
      window.location.href = "/cart";
    }
  }, [totalItems, step]);

  return (
    <div className="w-3/4">
      <div className="flex flex-col items-center w-full gap-10">
        <div className="flex gap-4 w-full flex-col">
          <div className="flex gap-4 items-center">
            <Link href="/cart">
              <ArrowLeft size={24} className="cursor-pointer" />
            </Link>
            <h2 className="text-2xl font-bold">Checkout</h2>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex w-full justify-between">
              <Steps
                no={1}
                label="Shipping"
                setStep={() => step !== 1 && setStep(3)}
              />
              <Steps
                no={2}
                label="Payment"
                setStep={() =>
                  step !== 1 && shippingInfo.firstName && setStep(2)
                }
              />
              <Steps no={3} label="Confirmation" setStep={() => {}} />
            </div>
            <Progress value={100 / step} className="bg-gray-300" />
          </div>
        </div>
        {totalItems > 0 && (
          <div className="w-full bg-gray-200 py-6 px-12 flex flex-col gap-5 rounded-xl">
            <div className="flex justify-between w-full text-xl">
              <h4 className="font-semibold">Order Summary</h4>
              <h4>Items ({totalItems})</h4>
            </div>

            {/* Items List */}
            <div className="flex flex-col w-full gap-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex items-center gap-3">
                    {item.ImageURL && (
                      <img
                        src={item.ImageURL}
                        alt={item.Name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium">{item.Name}</p>
                      <p className="text-sm text-gray-600">
                        {item.Brand?.Name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${item.Price.toFixed(2)} × {item.quantity}
                    </p>
                    <p className="font-semibold">
                      ${(item.Price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="border-t pt-3 mt-2">
              <div className="flex justify-between w-full">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium">${SHIPPING_FEE.toFixed(2)}</p>
              </div>
              <div className="flex justify-between w-full text-xl font-bold mt-2">
                <p>Total</p>
                <p>${(totalPrice + SHIPPING_FEE).toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
        <div className="w-full">
          {step === 3 && (
            <ShippingForm
              setStep={setStep}
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
            />
          )}
          {step === 2 && (
            <PaymentForm
              setStep={setStep}
              paymentInfo={paymentInfo}
              setPaymentInfo={setPaymentInfo}
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
              setCheckoutResult={setCheckoutResult}
            />
          )}
          {step === 1 && <ConfirmationForm result={checkoutResult} />}
        </div>
      </div>
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
  shippingInfo,
  setShippingInfo,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  shippingInfo: ShippingInfo;
  setShippingInfo: Dispatch<SetStateAction<ShippingInfo>>;
}) => {
  return (
    <div className="w-full p-6 bg-white rounded-xl flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Shipping Information</h2>
      <Form action={handleFormSubmit} className="w-full flex flex-col gap-6">
        <div className="w-full flex justify-between gap-10">
          <div className="w-full flex-col flex gap-2">
            <Label>First Name</Label>
            <Input
              className="shadow-none py-4"
              type="text"
              value={shippingInfo.firstName}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, firstName: e.target.value })
              }
            />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>Last Name</Label>
            <Input
              className="shadow-none py-4"
              type="text"
              value={shippingInfo.lastName}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, lastName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="w-full flex-col flex gap-2">
          <Label>Address</Label>
          <Input
            className=" shadow-none py-4"
            type="text"
            value={shippingInfo.address}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, address: e.target.value })
            }
          />
        </div>
        <div className="w-full flex justify-between gap-10">
          <div className="w-full flex-col flex gap-2">
            <Label>City</Label>
            <Input
              className=" shadow-none py-4"
              type="text"
              value={shippingInfo.city}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, city: e.target.value })
              }
            />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>State</Label>
            <Input
              className=" shadow-none py-4"
              type="text"
              value={shippingInfo.state}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, state: e.target.value })
              }
            />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>Zip Code</Label>
            <Input
              className=" shadow-none py-4"
              type="text"
              value={shippingInfo.zipCode}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
              }
            />
          </div>
        </div>
        <div className="w-full flex justify-between gap-10">
          <div className="w-full flex-col flex gap-2">
            <Label>Country</Label>
            <Input
              className=" shadow-none py-4"
              type="text"
              value={shippingInfo.country}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, country: e.target.value })
              }
            />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>Phone Number</Label>
            <Input
              className=" shadow-none py-4"
              type="tel"
              placeholder="+1 (123) 456-7890"
              value={shippingInfo.phone || ""}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, phone: e.target.value })
              }
            />
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
  paymentInfo,
  setPaymentInfo,
  shippingInfo,
  setShippingInfo,
  setCheckoutResult,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  paymentInfo: PaymentInfo;
  setPaymentInfo: Dispatch<SetStateAction<PaymentInfo>>;
  shippingInfo: ShippingInfo;
  setShippingInfo: Dispatch<SetStateAction<ShippingInfo>>;
  setCheckoutResult: Dispatch<SetStateAction<CheckoutResult | null>>;
}) => {
  const { checkout, isCheckingOut } = useCart();
  const SHIPPING_FEE = 20; // Add shipping fee constant

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Basic validation
      if (
        !paymentInfo.cardNumber ||
        !paymentInfo.expiryDate ||
        !paymentInfo.cvc
      ) {
        alert("Please fill in all payment details");
        return;
      }

      if (
        !shippingInfo.firstName ||
        !shippingInfo.lastName ||
        !shippingInfo.address ||
        !shippingInfo.phone
      ) {
        alert(
          "Please fill in all required shipping details including phone number"
        );
        return;
      }

      // Process checkout
      const result = await checkout(shippingInfo, paymentInfo, SHIPPING_FEE);

      if (result.success) {
        setCheckoutResult({
          ...result,
        });
        setStep(1); // Move to confirmation page
      } else {
        alert(result.error || "Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Payment Information</h2>
      <form onSubmit={handleCheckout} className="w-full flex flex-col gap-6">
        <div className="w-full flex-col flex gap-2">
          <Label>Email</Label>
          <Input
            className="shadow-none py-4"
            type="email"
            required
            value={shippingInfo.email}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, email: e.target.value })
            }
          />
        </div>
        <div className="w-full flex-col flex gap-2">
          <Label>Card Information</Label>
          <Input
            className="shadow-none py-4"
            type="text"
            required
            placeholder="Card number"
            value={paymentInfo.cardNumber}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
            }
          />
        </div>
        <div className="w-full flex justify-between gap-10">
          <div className="w-full flex-col flex gap-2">
            <Label>Cardholder Name</Label>
            <Input
              className="shadow-none py-4"
              type="text"
              required
              value={paymentInfo.cardholderName}
              onChange={(e) =>
                setPaymentInfo({
                  ...paymentInfo,
                  cardholderName: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="w-full flex justify-between gap-10">
          <div className="w-full flex-col flex gap-2">
            <Label>Expiry Date</Label>
            <Input
              className="shadow-none py-4"
              type="text"
              required
              placeholder="MM/YY"
              value={paymentInfo.expiryDate}
              onChange={(e) =>
                setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
              }
            />
          </div>
          <div className="w-full flex-col flex gap-2">
            <Label>CVC</Label>
            <Input
              className="shadow-none py-4"
              type="text"
              required
              maxLength={4}
              value={paymentInfo.cvc}
              onChange={(e) =>
                setPaymentInfo({ ...paymentInfo, cvc: e.target.value })
              }
            />
          </div>
        </div>

        <div className="w-full flex justify-between gap-10">
          <div className="w-full flex-col flex gap-2">
            <Label>Billing Country</Label>
            <Input
              className="shadow-none py-4"
              type="text"
              value={shippingInfo.country}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, country: e.target.value })
              }
            />
          </div>
        </div>

        <Button
          className="w-full text-lg py-6"
          type="submit"
          disabled={isCheckingOut}
        >
          {isCheckingOut ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={20} /> Processing...
            </span>
          ) : (
            "Complete Payment"
          )}
        </Button>
      </form>
    </div>
  );
};

const ConfirmationForm = ({ result }: { result: CheckoutResult | null }) => {
  return (
    <div className="flex flex-col gap-3 items-center bg-white py-12 rounded-xl">
      <div className="w-24 h-24 rounded-full bg-green-300 flex items-center justify-center">
        <CircleCheckBig size={50} className="text-green-600" />
      </div>
      <h2 className="text-3xl font-bold">Order Confirmed</h2>
      <p className="text-xl text-gray-600">Thank you for your purchase</p>
      {result && (
        <h2 className="text-3xl font-bold">Order Number: {result.orderId}</h2>
      )}
    </div>
  );
};
