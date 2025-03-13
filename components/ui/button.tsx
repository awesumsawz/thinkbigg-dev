"use client"

import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-green-600 text-black px-4 py-2 rounded hover:bg-green-500 transition-colors font-mono ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }

