
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
    image: '/products/Nexus-X-1-Controller.png',
    description: 'Haptic feedback gaming peripheral with zero latency and hall-effect triggers.',
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 'h2',
    name: 'Aether 4090 Workstation',
    category: 'PC',
    price: 3499.00,
    image: '/products/Aether_4090_Workstation.png',
    description: 'The ultimate monster for 4K ray-traced gaming with liquid cooling.',
    rating: 5.0,
    isFeatured: true
  },
  {
    id: 'h3',
    name: 'Cryo-Core Fan Cooler',
    category: 'Gear',
    price: 45.00,
    image: '/products/Cryo-Core_Fan_Cooler.jpg',
    description: 'Smartphone/Laptop external cooler with Peltier cooling technology.',
    rating: 4.6
  },
  {
    id: 'h4',
    name: 'Titan Throne Chair',
    category: 'Gear',
    price: 499.00,
    image: '/products/Titan_Throne_Chair.jpg',
    description: 'Ergonomic racing-style chair with memory foam lumbar support.',
    rating: 4.8
  },
  {
    id: 'h5',
    name: 'Phantom Finger Sleeves',
    category: 'Gear',
    price: 12.99,
    image: '/products/Phantom_Finger_Sleeves.jpg',
    description: 'High-sensitivity silver fiber sleeves for mobile gaming precision.',
    rating: 4.9
  },
  {
    id: 'h6',
    name: 'Nova Pro Console',
    category: 'Console',
    price: 599.00,
    image: '/products/Nova_Pro_Console.jpg',
    description: 'The next step in living room entertainment. 8K Ready.',
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 'h7',
    name: 'Vortex RGB Headset',
    category: 'Gear',
    price: 189.50,
    image: '/products/Vortex_RGB_Headset.jpg',
    description: '7.1 Surround sound with bio-leather ear cushions.',
    rating: 4.8
  },

  // --- MERCHANDISE ---
  {
    id: 'm1',
    name: 'Nexus Elite Tee',
    category: 'Merch',
    price: 35.00,
    image: '/Merch/Nexus_Elite_Tee.jpg',
    description: 'Heavyweight cotton printed with metallic Nexus logo.',
    rating: 4.7
  },
  {
    id: 'm2',
    name: 'Cyber Shell Parka',
    category: 'Merch',
    price: 145.00,
    image: '/Merch/Cyber_Shell_Parka.jpg',
    description: 'Water-resistant techwear jacket with reflective piping.',
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 'm3',
    name: 'Tactical Grip Gloves',
    category: 'Merch',
    price: 25.00,
    image: '/Merch/Tactical_Grip_Gloves.jpg',
    description: 'Fingerless lifestyle gloves with silicone palm grip.',
    rating: 4.5
  },
  {
    id: 'm4',
    name: 'Thermal Ion Flask',
    category: 'Merch',
    price: 40.00,
    image: '/Merch/Thermal_Ion_Flask.jpg',
    description: 'Stays cold for 24h. Matte black with RGB glow ring.',
    rating: 4.8
  },
  {
    id: 'm5',
    name: 'Quantum Tech Pack',
    category: 'Merch',
    price: 120.00,
    image: '/Merch/Quantum_Tech_Pack.jpg',
    description: 'Anti-theft backpack with built-in USB charging port.',
    rating: 4.7
  },
  {
    id: 'm6',
    name: 'Nexus Snapback',
    category: 'Merch',
    price: 28.00,
    image: '/Merch/Nexus_Snapback.jpg',
    description: 'Premium embroidery on breathable tech mesh.',
    rating: 4.6
  },
  {
    id: 'm7',
    name: 'Overclocked Mug',
    category: 'Merch',
    price: 18.00,
    image: '/Merch/Overclocked_Mug.jpg',
    description: 'Heat-sensitive ceramic that reveals Nexus circuitry.',
    rating: 4.9
  }
];
