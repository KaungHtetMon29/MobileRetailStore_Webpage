import { Phone } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function ContactCard() {
  return (
    <Card className="w-[450px] items-center justify-items-center shadow-none">
      <CardHeader>
        <PhoneIcon />
      </CardHeader>
      <CardContent className="justify-items-center flex flex-col gap-2 items-center">
        <h3 className="text-2xl font-bold">Call us</h3>
        <p>Speak directly with our support team</p>
        <a href="tel:555-555-555">+1 (555) 123-4567</a>
      </CardContent>
    </Card>
  );
}

const PhoneIcon = () => {
  return (
    <div className="w-16 h-16 bg-primary items-center justify-center flex rounded-full p-2">
      <Phone size={32} className="text-background" />
    </div>
  );
};
