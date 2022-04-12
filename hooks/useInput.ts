import { useState } from "react";

const useInput = (initData = "") => {
  const [value, setValue] = useState(initData);
  const onChange = (e: any) => setValue(e.target.value);
  return { value, onChange };
};

export default useInput;
