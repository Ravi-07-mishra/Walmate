'use client';

import ProductCard from '@/components/product-card';
import ProductDetailModal from '@/components/product-detail-modal';
import type { Product } from '@/components/product-card';
import { useState } from 'react';

const recentlyViewed: Product[] = [
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
    name: 'Aviator Sunglasses',
    price: 2499,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'aviator sunglasses',
    description: 'Classic aviator sunglasses with a modern twist. Offers 100% UV protection.',
    material: 'Metal Alloy Frame',
    features: 'Polarized lenses, UV400 protection, Lightweight',
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
];

export default function HistoryPage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Shopping History</h1>
        <p className="text-muted-foreground">Here are some of the items you've recently viewed.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((product, index) => (
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
    </div>
  );
}
