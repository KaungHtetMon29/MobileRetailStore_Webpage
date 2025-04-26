"use client";

import { Button } from "@/components/ui/button";

type TrackingInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  btnText?: string;
  isLoading?: boolean;
};

export default function TrackingInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Enter your repair ID",
  btnText = "Track",
  isLoading = false,
}: TrackingInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="w-[900px] h-16 flex items-center justify-between">
      <input
        className="h-full rounded-l-xl px-4 text-lg w-full"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <Button
        variant={"default"}
        className="border-[1px] border-white rounded-l-none rounded-r-xl h-full w-[20rem] text-xl"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : btnText}
      </Button>
    </div>
  );
}
