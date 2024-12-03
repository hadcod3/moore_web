
import { type ClassValue, clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'
import qs from 'query-string'

import { UrlQueryParams, RemoveUrlQueryParams } from '@/types'
import { getItemsByOrganizerId } from './actions/item.actions'
import { auth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { getNotificationByToId } from './actions/notification.actions'
import { getUserByClerkId } from './actions/user.actions'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currentUser = (userId: string) => {
  const data = getUserByClerkId(userId)
  return data
}

export const formatDateTime = (dateString: Date) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit', // ensures the day is always two digits (e.g., '12')
    month: 'short', // abbreviated month name (e.g., 'Jan')
    year: 'numeric', // numeric year (e.g., '2024')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '10')
    minute: '2-digit', // ensures minutes are always two digits (e.g., '10')
    hour12: true, // use 12-hour clock (e.g., 'PM')
  };

  const formattedDate = new Date(dateString).toLocaleDateString('en-US', dateOptions); // e.g., "12 Jan 2024"
  const formattedTime = new Date(dateString).toLocaleTimeString('en-US', timeOptions); // e.g., "10:10 PM"

  // Combine the formatted date and time with the desired separator
  return `${formattedDate} • ${formattedTime}`;
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const formatPrice = (price: number) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price)

  return formattedPrice
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach(key => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}
