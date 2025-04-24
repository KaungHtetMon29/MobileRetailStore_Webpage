import { signIn } from "@/auth";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FcGoogle } from "react-icons/fc";
import { AuthFormChange } from "./authContainer";

export default function SignIn() {
  return (
    <>
      {/* <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <button type="submit">Signin with Google</button>
      </form> */}
      <Card className="w-1/3 p-5">
        <CardTitle className="text-center py-5 text-2xl">Login</CardTitle>
        <CardContent className="gap-5 flex flex-col">
          <Button
            onClick={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <FcGoogle size={24} />
            Continue with Google
          </Button>
          <div className="flex items-center justify-center">
            <hr className="w-full border-2" />
            <p className="w-full text-center">or continue with</p>
            <hr className="w-full border-2" />
          </div>
          <div className="flex flex-col gap-5 items-center w-full">
            <InputField type="Email" />
            <InputField type="Password" />
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 text-lg">
                <Input type="checkbox" id="remember" className="w-4" />
                <Label htmlFor="remember" className="text-md">
                  Remember me
                </Label>
              </div>
              <p className="text-md">Forgot Password?</p>
            </div>
            <Button className="w-full">Login</Button>
            <AuthFormChange
              label="Don't have an account?"
              route="signup"
              text="Signup"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

const InputField = ({ type }: { type: string }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor={type.toLowerCase()}>{type}</Label>
      <Input
        type={type.toLowerCase()}
        id={type.toLowerCase()}
        placeholder={type}
      />
    </div>
  );
};
