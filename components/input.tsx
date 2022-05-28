import React, { ChangeEvent, useCallback, useState } from "react";
import { isWord, splitWords } from "../utils/caviarding";

const Input: React.FC<{
  disabled: boolean;
  onConfirm: (value: string) => void;
}> = ({ disabled, onConfirm }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value.replace(/\s/gi, ""));
    },
    [setValue]
  );

  const handleSubmit = useCallback(() => {
    onConfirm(splitWords(value).filter(isWord).join().toLocaleLowerCase());
    setValue("");
  }, [onConfirm, value]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    },
    [onConfirm, value, handleSubmit]
  );

  return (
    <div className="guess-input">
      <input
        type="text"
        disabled={disabled}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="你的猜测（单个汉字）？"
      />
      <input
        type="submit"
        disabled={disabled}
        onClick={handleSubmit}
        value="提交"
      />
    </div>
  );
};

export default Input;
