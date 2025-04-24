import Link from "next/link";
import { Card, CardContent, CardTitle } from "./ui/card";

export default function AuthCardContainer({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <Card className="w-1/3 p-5">
      <CardTitle className="text-center py-5 ">{header}</CardTitle>
      <CardContent className="gap-5 flex flex-col">{children}</CardContent>
    </Card>
  );
}
export const AuthFormChange = ({
  label,
  route,
  text,
}: {
  label: string;
  route: string;
  text: string;
}) => {
  return (
    <p className="flex gap-2 w-full justify-center">
      {label}
      <Link href={route} className="text-blue-600 underline">
        {text}
      </Link>
    </p>
  );
};
