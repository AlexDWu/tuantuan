import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Hashids from 'hashids'

export const hashids = new Hashids(process.env.HASHIDS_SALT)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
