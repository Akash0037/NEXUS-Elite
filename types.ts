
export interface Product {
  id: string;
  name: string;
  category: 'Gear' | 'Console' | 'PC' | 'Merch';
  price: number;
  image: string;
  description: string;
  rating: number;
  isFeatured?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}

export enum AnimationState {
  IDLE = 'IDLE',
  HOVER = 'HOVER',
  ACTIVE = 'ACTIVE'
}
