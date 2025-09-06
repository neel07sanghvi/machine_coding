import { useState, useRef, useEffect } from "react";
import './Otp.css'

export function Otp({ OTP_DIGIT }) {
  const [otpArr, setOtpArr] = useState(new Array(OTP_DIGIT).fill(""));

  const inputRefArr = useRef([]);

  const handleInputChange = (value, index) => {
    if (isNaN(value)) {
      return;
    }

    const newValue = value.trim();
    const newOtpArr = [...otpArr];
    newOtpArr[index] = newValue.slice(-1);
    setOtpArr(newOtpArr);

    newValue && inputRefArr.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!e.target.value) {
        inputRefArr.current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    inputRefArr.current[0]?.focus();
  }, []);

  return (
    <>
      {otpArr.map((value, index) => {
        return (
          <input
            type="text"
            name="otp"
            key={index}
            className={"otp"}
            value={value}
            onChange={(e) => handleInputChange(e.target.value, index)}
            ref={(input) => (inputRefArr.current[index] = input)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </>
  )
}