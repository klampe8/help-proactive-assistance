import React from "react";

export const IconCornerDownRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 4V8C4 8.88 4.35 9.72 4.98 10.35C5.61 10.98 6.45 11.33 7.33 11.33H15.33M15.33 11.33L12 8M15.33 11.33L12 14.67"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
