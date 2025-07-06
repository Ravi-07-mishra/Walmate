'use client';

import ProductCard from './product-card';
import type { Product } from './product-card';
import ProductDetailModal from './product-detail-modal';
import { useState } from 'react';

const featuredProducts: Product[] = [
  {
    name: 'Classic Denim Jacket',
    price: 3499,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'denim jacket',
    description: 'A timeless denim jacket for all seasons. Made with 100% cotton for comfort and durability.',
    material: '100% Cotton',
    features: 'Button-front, Chest pockets, Washed look',
  },
  {
    name: 'Urban Leather Boots',
    price: 4999,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'leather boots',
    description: 'Step out in style with these rugged yet refined leather boots. Perfect for urban adventures.',
    material: 'Genuine Leather',
    features: 'Lace-up, Ankle support, Non-slip sole',
  },
  {
    name: 'Minimalist Canvas Tote',
    price: 1999,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'canvas tote',
    description: 'Carry your essentials in this chic and simple canvas tote bag. Versatile and eco-friendly.',
    material: 'Heavy-duty Canvas',
    features: 'Spacious interior, Inner pocket, Sturdy handles',
  },
  {
    name: 'Aviator Sunglasses',
    price: 2499,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'aviator sunglasses',
    description: 'Classic aviator sunglasses with a modern twist. Offers 100% UV protection.',
    material: 'Metal Alloy Frame',
    features: 'Polarized lenses, UV400 protection, Lightweight',
  },
  {
    name: 'Striped Cotton Shirt',
    price: 2199,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'cotton shirt',
    description: 'A sharp and comfortable striped shirt, perfect for casual or semi-formal occasions.',
    material: '100% Premium Cotton',
    features: 'Breathable fabric, Slim fit, Button-down collar',
  },
  {
    name: 'Running Sport Shoes',
    price: 3999,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'sport shoes',
    description: 'Enhance your performance with these lightweight and responsive running shoes.',
    material: 'Mesh and Synthetic',
    features: 'Cushioned midsole, Breathable upper, Durable outsole',
  },
  {
    name: 'Leather Crossbody Bag',
    price: 3299,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'leather bag',
    description: 'A sleek and functional crossbody bag, crafted from high-quality leather.',
    material: 'Full-grain Leather',
    features: 'Adjustable strap, Multiple compartments, Secure zipper',
  },
  {
    name: 'Retro Round Eyeglasses',
    price: 1899,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'round eyeglasses',
    description: 'Achieve a vintage-inspired look with these stylish round eyeglasses.',
    material: 'Acetate and Metal',
    features: 'Comfortable fit, Blue light blocking, Classic design',
  },
];

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, index) => (
          <ProductCard key={index} product={product} onViewDetails={setSelectedProduct} />
        ))}
      </div>
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
