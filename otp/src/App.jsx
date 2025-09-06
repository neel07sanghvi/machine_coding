import { Otp } from "./components/Otp";

export default function App() {

  return (
    <div className="App">
      <Otp OTP_DIGIT={5} />
    </div>
  );
}
