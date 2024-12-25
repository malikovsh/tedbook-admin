import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { uz } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToReadableDate = (dateString: string): string => {
  const date = new Date(dateString);

  return format(date, 'd MMM yyyy, HH:mm', { locale: uz });
};
