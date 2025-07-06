import ProductCard from './product-card';
import type { Product } from './product-card';

const featuredProducts: Product[] = [
  {
    name: 'Classic Denim Jacket',
    price: 3499,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'denim jacket',
  },
  {
    name: 'Urban Leather Boots',
    price: 4999,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'leather boots',
  },
  {
    name: 'Minimalist Canvas Tote',
    price: 1999,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'canvas tote',
  },
  {
    name: 'Aviator Sunglasses',
    price: 2499,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'aviator sunglasses',
  },
  {
    name: 'Striped Cotton Shirt',
    price: 2199,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'cotton shirt',
  },
  {
    name: 'Running Sport Shoes',
    price: 3999,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'sport shoes',
  },
  {
    name: 'Leather Crossbody Bag',
    price: 3299,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'leather bag',
  },
  {
    name: 'Retro Round Eyeglasses',
    price: 1899,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'round eyeglasses',
  },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}
