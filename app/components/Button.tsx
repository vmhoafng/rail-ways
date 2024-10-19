import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}