'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface Product {
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
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col animate-in fade-in zoom-in-95">
      <CardContent className="p-0 flex-grow">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={product.dataAiHint}
          />
        </div>
        <div className="p-4 space-y-2">
          <CardTitle className="text-lg font-semibold h-14">{product.name}</CardTitle>
          <p className="text-2xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 grid grid-cols-3 gap-2">
        <Button className="col-span-3 bg-primary hover:bg-primary/90">Buy Now</Button>
        <Button variant="outline" className="col-span-2">Add to Cart</Button>
        <Button variant="outline" onClick={onViewDetails ? () => onViewDetails(product) : undefined}>
          Try
        </Button>
      </CardFooter>
    </Card>
  );
}
