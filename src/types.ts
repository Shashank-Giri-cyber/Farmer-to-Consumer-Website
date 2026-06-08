export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  badge?: string;
  tag?: string;
  farm: string;
  image: string;
  organic: boolean;
  harvestInfo: string;
  category: string;
}

export interface OrderItem {
  id: string;
  items: string;
  distance: string;
  location: string;
  price: number;
  status: 'New' | 'Processing' | 'Delivered';
  tag: 'Urgent' | 'Pick-up' | 'Standard';
}

export interface BoxPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  itemCountLabel: string;
  properties: string[];
  featured?: boolean;
}

export interface FarmerListing {
  id: string;
  name: string;
  harvestDate: string;
  price: number;
  unit: string;
  image: string;
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface VerificationRequest {
  id: string;
  farmName: string;
  location: string;
  specialty: string;
  status: 'Pending Inspection' | 'Verified' | 'License Expiring';
  image: string;
  uid: string;
}

export type PortalMode = 'buyer-home' | 'buyer-shop' | 'farmer' | 'admin';
