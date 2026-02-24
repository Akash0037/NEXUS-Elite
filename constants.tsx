
import { Product } from './types';

export const COLORS = {
  black: '#050505',
  gold: '#FACC15',
  blue: '#3B82F6',
  white: '#FFFFFF',
};

export const PRODUCTS: Product[] = [
  // --- HARDWARE / GEAR ---
  {
    id: 'h1',
    name: 'Nexus X-1 Controller',
    category: 'Gear',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=600&auto=format&fit=crop',
    description: 'Haptic feedback gaming peripheral with zero latency and hall-effect triggers.',
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 'h2',
    name: 'Aether 4090 Workstation',
    category: 'PC',
    price: 3499.00,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop',
    description: 'The ultimate monster for 4K ray-traced gaming with liquid cooling.',
    rating: 5.0,
    isFeatured: true
  },
  {
    id: 'h3',
    name: 'Cryo-Core Fan Cooler',
    category: 'Gear',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=600&auto=format&fit=crop',
    description: 'Smartphone/Laptop external cooler with Peltier cooling technology.',
    rating: 4.6
  },
  {
    id: 'h4',
    name: 'Titan Throne Chair',
    category: 'Gear',
    price: 499.00,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fce66?q=80&w=600&auto=format&fit=crop',
    description: 'Ergonomic racing-style chair with memory foam lumbar support.',
    rating: 4.8
  },
  {
    id: 'h5',
    name: 'Phantom Finger Sleeves',
    category: 'Gear',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=600&auto=format&fit=crop',
    description: 'High-sensitivity silver fiber sleeves for mobile gaming precision.',
    rating: 4.9
  },
  {
    id: 'h6',
    name: 'Nova Pro Console',
    category: 'Console',
    price: 599.00,
    image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=600&auto=format&fit=crop',
    description: 'The next step in living room entertainment. 8K Ready.',
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 'h7',
    name: 'Vortex RGB Headset',
    category: 'Gear',
    price: 189.50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    description: '7.1 Surround sound with bio-leather ear cushions.',
    rating: 4.8
  },

  // --- MERCHANDISE ---
  {
    id: 'm1',
    name: 'Nexus Elite Tee',
    category: 'Merch',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    description: 'Heavyweight cotton printed with metallic Nexus logo.',
    rating: 4.7
  },
  {
    id: 'm2',
    name: 'Cyber Shell Parka',
    category: 'Merch',
    price: 145.00,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    description: 'Water-resistant techwear jacket with reflective piping.',
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 'm3',
    name: 'Tactical Grip Gloves',
    category: 'Merch',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600&auto=format&fit=crop',
    description: 'Fingerless lifestyle gloves with silicone palm grip.',
    rating: 4.5
  },
  {
    id: 'm4',
    name: 'Thermal Ion Flask',
    category: 'Merch',
    price: 40.00,
    image: 'https://images.unsplash.com/photo-1602143399827-bd934304c222?q=80&w=600&auto=format&fit=crop',
    description: 'Stays cold for 24h. Matte black with RGB glow ring.',
    rating: 4.8
  },
  {
    id: 'm5',
    name: 'Quantum Tech Pack',
    category: 'Merch',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    description: 'Anti-theft backpack with built-in USB charging port.',
    rating: 4.7
  },
  {
    id: 'm6',
    name: 'Nexus Snapback',
    category: 'Merch',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop',
    description: 'Premium embroidery on breathable tech mesh.',
    rating: 4.6
  },
  {
    id: 'm7',
    name: 'Overclocked Mug',
    category: 'Merch',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop',
    description: 'Heat-sensitive ceramic that reveals Nexus circuitry.',
    rating: 4.9
  }
];
