import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenBytes32 = (bytes32: string) => {
  return (
    bytes32?.substring(0, 6) +
    `...` +
    bytes32?.substring(bytes32.length - 8, bytes32.length)
  );
};
