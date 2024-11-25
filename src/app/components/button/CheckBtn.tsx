import React, { InputHTMLAttributes } from "react";

interface CheckBtnProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string; // 체크박스의 레이블을 추가
  name: string; // 체크박스의 name 속성
  value: string; // 체크박스의 value 속성
  checked?: boolean; // 체크박스가 선택된 상태인지 여부
  disabled?: boolean; // 체크박스가 비활성화된 상태인지 여부
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 체크박스 상태 변화 처리 함수
}

const CheckBtn = ({ label, name, value, checked = false, disabled = false, onChange, ...props }: CheckBtnProps) => {
  const baseStyles = "flex items-center justify-between rounded-lg";

  const textColor = disabled ? "text-gray-400" : "text-black";
  const cursorStyle = disabled ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <div className={`${baseStyles} ${cursorStyle} p-2`}>
      <label htmlFor={value} className={`text-sm ${textColor}`}>
        {label}
      </label>
      <input
        type="checkbox"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="ml-2"
        {...props}
      />
    </div>
  );
};

export default CheckBtn;
