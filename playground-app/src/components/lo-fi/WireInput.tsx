import type { InputHTMLAttributes } from 'react';

export interface WireInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

/**
 * Lo-fi wireframe text input. Uses .wire-input from lo-fi.css.
 */
export function WireInput({ className = '', ...rest }: WireInputProps) {
  return <input className={`wire-input ${className}`.trim()} {...rest} />;
}
