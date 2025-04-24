import ConnectInputBox from "@/components/connectInputBox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="w-full justify-center flex flex-col gap-10 items-center">
        <h2 className="text-4xl font-bold">Repair Status Tracking</h2>
        <div className="w-[1000px] justify-center p-7 bg-gray-200 items-center flex rounded-xl">
          <ConnectInputBox
            ConnectInputBoxStyle={{ BoxWidth: "w-[900px]" }}
            ConnectInputBoxProps={{
              btnText: "Track",
              placeHolder: "Enter Your Repair ID",
            }}
          />
        </div>
        <div className="w-[1000px]">
          <Card className="border-0 overflow-hidden">
            <CardHeader className="border-b-2 px-10 flex flex-row justify-between">
              <div className="flex flex-col w-4/5">
                <CardTitle className="text-2xl">IPhone 13</CardTitle>
                <CardDescription className="flex flex-col gap-4">
                  <div className="flex flex-col gap-10 text-xl">
                    <p>Charging port repair</p>
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <Calendar size={24} />
                        <p>Start Date: 2023-10-12</p>
                      </div>
                      <div className="flex gap-4">
                        <Clock size={24} />
                        <p>Est. Completion:2023-10-15</p>
                      </div>
                    </div>
                  </div>
                </CardDescription>
              </div>
              <Badge
                variant="success"
                className="h-fit py-2 text-base rounded-full px-4"
              >
                In Progress
              </Badge>
            </CardHeader>
            <CardContent className="px-10 py-5 flex flex-col gap-5">
              <h3 className="text-2xl font-bold">Repair Time</h3>
              <div className="flex flex-col gap-10">
                <div className="flex gap-10 justify-start items-center text-lg ">
                  <p>2023-10-12</p>
                  <div>
                    <p className="text-xl font-bold">Received</p>
                    <p className="font-extralight">
                      Device received for repair
                    </p>
                  </div>
                </div>
                <div className="flex gap-10 justify-start items-center text-lg ">
                  <p>2023-10-12</p>
                  <div>
                    <p className="text-xl font-bold">Received</p>
                    <p className="font-extralight">
                      Device received for repair
                    </p>
                  </div>
                </div>
                <div className="flex gap-10 justify-start items-center text-lg ">
                  <p>2023-10-12</p>
                  <div>
                    <p className="text-xl font-bold">Received</p>
                    <p className="font-extralight">
                      Device received for repair
                    </p>
                  </div>
                </div>
                <div className="flex gap-10 justify-start items-center text-lg ">
                  <p>2023-10-12</p>
                  <div>
                    <p className="text-xl font-bold">Received</p>
                    <p className="font-extralight">
                      Device received for repair
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-10 py-5 flex flex-col gap-5 justify-start items-start bg-gray-200">
              <p>
                <span className="font-bold">Technician: </span>Mike Chen
              </p>
              <p>
                <span className="font-bold">Notes: </span>Repair completed.
                Ready for pickup.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
