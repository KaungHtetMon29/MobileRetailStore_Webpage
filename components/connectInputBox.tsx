import { Button } from "./ui/button";

type ConnectInputBoxStyle = {
  BoxWidth?: string;
  BoxHeight?: string;
  BtnWidth?: string;
};
const defaultConnectInputBoxStyle: ConnectInputBoxStyle = {
  BoxWidth: "w-[800px]",
  BoxHeight: "h-16",
  BtnWidth: "w-[20rem]",
};
type ConnectInputBoxProps = {
  placeHolder: string;
  btnText: string;
};
export default function ConnectInputBox({
  ConnectInputBoxStyle = defaultConnectInputBoxStyle,
  ConnectInputBoxProps = { placeHolder: "Enter Email", btnText: "Subscribe" },
}: Readonly<{
  ConnectInputBoxStyle?: ConnectInputBoxStyle;
  ConnectInputBoxProps?: ConnectInputBoxProps;
}>) {
  return (
    <div
      className={`w-[800px] h-16 flex items-center justify-between ${ConnectInputBoxStyle.BoxWidth} ${ConnectInputBoxStyle.BoxHeight}`}
    >
      <input
        className="h-full rounded-l-xl px-4  text-lg w-full"
        placeholder={ConnectInputBoxProps.placeHolder}
      />
      <Button
        variant={"default"}
        className={`border-[1px] border-white rounded-l-none rounded-r-xl h-full w-[20rem] text-xl ${ConnectInputBoxStyle.BtnWidth}`}
      >
        {ConnectInputBoxProps.btnText}
      </Button>
    </div>
  );
}
