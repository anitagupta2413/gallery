import React from "react";

const PlusIcon = ({size = 30 , ...props}) => {
    return (
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 56 56"
    fill="none"
    {...props}
  >
    <path
      opacity="0.4"
      d="M21 23.3333C23.5773 23.3333 25.6667 21.244 25.6667 18.6667C25.6667 16.0893 23.5773 14 21 14C18.4227 14 16.3333 16.0893 16.3333 18.6667C16.3333 21.244 18.4227 23.3333 21 23.3333Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30.3333 4.66602H21C9.33332 4.66602 4.66666 9.33268 4.66666 20.9993V34.9993C4.66666 46.666 9.33332 51.3327 21 51.3327H35C46.6667 51.3327 51.3333 46.666 51.3333 34.9993V23.3327"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g opacity="0.4">
      <path
        d="M36.75 11.666H49.5833"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M43.1667 18.0833V5.25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
    <path
      opacity="0.4"
      d="M6.23001 44.2166L17.7333 36.4933C19.5767 35.2566 22.2367 35.3966 23.8933 36.82L24.6633 37.4966C26.4833 39.06 29.4233 39.06 31.2433 37.4966L40.95 29.1666C42.77 27.6033 45.71 27.6033 47.53 29.1666L51.3333 32.4333"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
    )
}

export default PlusIcon;