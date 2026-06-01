/**
 * LAURA PREMIUM BOUTIQUE - DYNAMIC API INTEGRATION CONFIG
 */

export const API_BASE_URL = 'http://localhost:5000/api';

export interface Product {
  _id?: string;
  id: number;
  name: string;
  price: string;
  rawPrice: number;
  image: string;
  badge: string;
  category: string;
  desc: string;
  details?: string;
  care?: string;
  shipping?: string;
  isFeatured?: boolean;
  sizes?: string[];
}

export interface Settings {
  whatsapp_number: string;
  imgbb_api_key: string;
  imgbb_upload_url: string;
  store_announcement: string;
}

export interface Category {
  _id?: string;
  name: string;
  code: string;
}

/**
 * Fetch dynamic store settings from Express backend API
 */
export async function getSettings(): Promise<Settings> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Settings API failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend server settings unreachable, using default hotlines.', err);
    return {
      whatsapp_number: '94768455271', // Default phone fallback
      imgbb_api_key: 'f2ac2dc4433d0a5a6cdb4831b9a0d68c',
      imgbb_upload_url: 'https://api.imgbb.com/1/upload',
      store_announcement: 'FREE DELIVERY ISLANDWIDE | CASH ON DELIVERY AVAILABLE | NEW ARRIVALS EVERY WEEK'
    };
  }
}

/**
 * Helper to generate pre-filled wa.me links with configured settings phone number
 */
export function formatWhatsappUrl(number: string, message: string): string {
  const cleanNumber = number.replace(/[\s\-\+]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
