
'use client';

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  dataAiHint: string;
  description?: string;
  material?: string;
  features?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col animate-in fade-in zoom-in-95">
      <CardContent className="p-0 flex-grow">
        <div className="relative aspect-square">
          <Link href={`/product/${product.id}`} aria-label={`View details for ${product.name}`}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={product.dataAiHint}
              loading="lazy"
            />
          </Link>
        </div>
        <div className="p-4 space-y-2">
          <CardTitle className="text-lg font-semibold h-14">
            <Link href={`/product/${product.id}`} className="hover:underline">
              {product.name}
            </Link>
          </CardTitle>
          <p className="text-2xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 grid grid-cols-3 gap-2">
        <Button className="col-span-2" onClick={() => addToCart(product)}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
        <Button asChild variant="outline">
            <Link href={`/product/${product.id}`}>
                <Eye className="mr-2 h-4 w-4" /> Details
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
