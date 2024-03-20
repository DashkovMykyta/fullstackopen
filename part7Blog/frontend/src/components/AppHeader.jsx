import React from "react";
import { Button } from "./ui/button";

export default function AppHeader({ text, description, btnText, onClick }) {
  return (
    <div className="mb-6 mt-2 flex flex-row justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">{text}</h1>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      {btnText && <Button onClick={onClick}>{btnText}</Button>}
    </div>
  );
}
