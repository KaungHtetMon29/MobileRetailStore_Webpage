import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AuthCardContainer, { AuthFormChange } from "@/components/authContainer";
import { Button } from "@/components/ui/button";
import { HTMLInputTypeAttribute } from "react";

export default async function Page() {
  const Header = () => {
    return (
      <div className="text-center flex flex-col gap-2 pb-2 items-center">
        <h2 className="font-bold text-2xl">Signup</h2>
        <p className="font-light w-2/3 leading-relaxed">
          Join Zenshop for exclusive offers and easy order tracking
        </p>
      </div>
    );
  };
  return (
    <AuthCardContainer header={<Header />}>
      <div className="flex justify-between">
        <SignupInput label="First Name" type="text" />
        <SignupInput label="Last Name" type="text" />
      </div>
      <SignupInput label="Email Address" type="email" />
      <SignupInput label="Password" type="password" />
      <SignupInput label="Confirm Password" type="password" />
      <Button>Sign Up</Button>
      <AuthFormChange
        label="Already have an account?"
        route="login"
        text="Login"
      />
    </AuthCardContainer>
  );
}

const SignupInput = ({
  label,
  type,
}: {
  label: string;
  type: HTMLInputTypeAttribute;
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input type={type} />
    </div>
  );
};
