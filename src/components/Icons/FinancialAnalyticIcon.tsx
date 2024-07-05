import * as React from "react";
import type { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1234_2935)">
      <path
        d="M0.922852 0.923096V23.0769H23.0767M4.62439 19.3754L18.4609 5.53894M18.4609 5.53894H14.0365M18.4609 5.53894V9.96325"
        stroke="currentColor"
        strokeWidth={0.802197}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.922852 0.923096V23.0769H23.0767M4.62439 19.3754L18.4609 5.53894M18.4609 5.53894H14.0365M18.4609 5.53894V9.96325"
        stroke="currentColor"
        strokeWidth={0.802197}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1234_2935">
        <rect width={24} height={24} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default SVGComponent;
