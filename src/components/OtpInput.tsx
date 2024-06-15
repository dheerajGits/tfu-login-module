import { useEffect, useRef, useState } from "react";

export default function OtpInput({
  phone,
  onOtpSubmit,
}: {
  phone: string;
  onOtpSubmit: (otp: any) => void;
}) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, e: any) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    //allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combineOtp = newOtp.join("");
    if (combineOtp.length === 6) onOtpSubmit(combineOtp);

    //move to next input if current field is filled
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleClick = (index: number) => {
    inputRefs.current[index]?.setSelectionRange(1, 1);

    //optional
    if (index > 0) {
      inputRefs.current[otp.findIndex((val) => val == "")]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: any) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <p className="text-lato text-[15px] text-[#ACADB9]">
        We Have Sent a Code To Your Phone Number{" "}
        <b className="text-[#FFD700]">{phone}</b>. Please enter the code here
      </p>
      <div className="flex flex-row items-center justify-between w-full gap-10">
        {otp.map((value: number, index: number) => {
          return (
            <input
              key={index}
              required={true}
              type="text"
              name="otp"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              placeholder=""
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="!w-12 !h-12 text-center bg-transparent text-white"
            />
          );
        })}
      </div>
      <button
        className="text-black !w-72 !max-md:h-16 h-12 rounded-full bg-[#FFD700] text-[20px] border-none"
        onClick={onOtpSubmit}
      >
        Verify
      </button>
      <button className="text-[#9C9C9C] !w-72 !max-md:h-16 h-12 rounded-full bg-[#232627] text-[20px] border-none">
        Send Again{" "}
      </button>
    </div>
  );
}
