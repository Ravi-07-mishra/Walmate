'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import type { Product } from './product-card';
import { Badge } from './ui/badge';
import { useCart } from '@/context/cart-context';
import { ShoppingCart } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.dataAiHint}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">{product.name}</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              {product.description || 'A high-quality product from WalMate.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
             <p className="text-4xl font-extrabold text-primary">₹{product.price.toLocaleString('en-IN')}</p>
            
            <div>
              <h4 className="font-semibold mb-2">Material</h4>
              <p className="text-muted-foreground">{product.material || 'High-quality materials'}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <div className="flex flex-wrap gap-2">
                {(product.features?.split(',') || ['Durable', 'Stylish', 'Comfortable']).map(f => <Badge key={f.trim()} variant="secondary">{f.trim()}</Badge>)}
              </div>
            </div>
          </div>
          
          <DialogFooter className="!mt-auto pt-4 gap-2 sm:!justify-start">
            <Button size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5"/>
                Add to Cart
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
