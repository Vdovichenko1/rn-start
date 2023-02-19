import { useState } from "react";

export const togglePassword = () => {
  const [passVisibility, setPassVisibility] = useState(true);
  const [passHidden, setPassHidden] = useState("visible");

  const handlePassword = () => {
    if (passHidden === "visible") {
      setPassHidden("hidden");
      setPassVisibility(!passVisibility);
    } else if (passHidden === "hidden") {
      setPassHidden("visible");
      setPassVisibility(!passVisibility);
    }
  };
  return {
    passVisibility,
    passHidden,
    handlePassword,
  };
};
