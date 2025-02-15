"use client";
import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/tailwindUtil";
import { positionOptions } from "@/constants/positionOptions";

export interface RadioBtnProps extends ButtonHTMLAttributes<HTMLInputElement> {
  key: string;
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  position?: typeof positionOptions.POSITION_LEFT | typeof positionOptions.POSITION_RIGHT;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioBtn = ({
  key,
  label,
  name,
  value,
  checked,
  position = positionOptions.POSITION_LEFT,
  className,
  onChange,
  ...props
}: RadioBtnProps) => {
  const handleClick = () => {
    const event = {
      target: { value },
      currentTarget: { value },
      bubbles: true,
      preventDefault: () => {},
      stopPropagation: () => {},
    } as React.ChangeEvent<HTMLInputElement>;

    if (onChange) {
      onChange(event);
    }
  };

  const input = (
    <input
      key={key}
      type="radio"
      id={props.id || value}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="radio-custom cursor-pointer"
      {...props}
    />
  );

  const labelElement = label && (
    <label htmlFor={props.id || value} className="cursor-pointer text-sm lg:text-lg">
      {label}
    </label>
  );

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex w-full cursor-pointer items-center rounded-lg border border-grayscale-200 p-4 transition-colors lg:px-6 lg:py-[17px]",
        checked && "border-primary-orange-300 bg-primary-orange-50",
        !checked && "hover:border-grayscale-300 hover:bg-grayscale-50",
        position === positionOptions.POSITION_RIGHT ? "justify-between" : "gap-2",
        className
      )}
    >
      {position === positionOptions.POSITION_LEFT ? (
        <>
          {input}
          {labelElement}
        </>
      ) : (
        <>
          {labelElement}
          {input}
        </>
      )}
    </div>
  );
};

export default RadioBtn;
