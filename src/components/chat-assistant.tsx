
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Send,
  Mic,
  ImageUp,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  suggestProducts,
  type SuggestProductsOutput,
} from '@/ai/flows/suggest-products';
import {
  displaySuggestedProducts,
  type DisplaySuggestedProductsOutput,
} from '@/ai/flows/display-suggested-products';
import type { Product } from './product-card';
import { useCart } from '@/context/cart-context';
import allProductsData from '@/data/products.json';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content?: string;
  products?: SuggestProductsOutput['productSuggestions'] | DisplaySuggestedProductsOutput;
}

const suggestedQuestions = [
  'Suggest trending shoes under ₹2000',
  'Show me some stylish backpacks',
  'What are the best sunglasses for a round face?',
];

const allProducts = allProductsData.products;

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleSendMessage = async (messageContent?: string) => {
    const text = messageContent || input;
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response: Message;
      // Check if it's a suggested question
      if (suggestedQuestions.includes(text)) {
        const products = await displaySuggestedProducts({ query: text });
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Here are some products based on your request: "${text}"`,
          products,
        };
      } else {
        const result = await suggestProducts({ textInput: text });
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I found some suggestions for you!',
          products: result.productSuggestions,
        };
      }
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error('AI Error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with the AI assistant.',
      });
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleProductSelect = (product: any) => {
    // The AI product doesn't have an ID. Find the full product details from our DB.
    const fullProduct = allProducts.find(p => p.name === product.name);

    if (fullProduct) {
        addToCart(fullProduct as Product);
    } else {
        toast({
            variant: 'destructive',
            title: 'Product not available',
            description: 'Sorry, this specific product could not be added to the cart right now.',
        });
    }
  }

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-14 rounded-full shadow-lg hover:bg-primary/90 animate-in fade-in zoom-in-95 text-lg font-semibold px-6 bg-primary text-primary-foreground"
        size="lg"
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="h-6 w-6 mr-3" />
        Shop with WalMate AI
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" />
              WalMate AI Assistant
            </SheetTitle>
            <SheetDescription>
              Your smart shopping partner. Ask me anything!
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-1 -mx-6">
            <div className="px-6 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-sm text-muted-foreground space-y-4 py-8">
                  <p>How can I help you today?</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestedQuestions.map((q) => (
                      <Button
                        key={q}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendMessage(q)}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Sparkles className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content && <p className="text-sm">{message.content}</p>}
                    {message.products && message.products.length > 0 && (
                      <div className="mt-2">
                        <Carousel className="w-full max-w-xs">
                          <CarouselContent>
                            {message.products.map((product, index) => {
                              const fullProduct = allProducts.find(p => p.name === product.name);
                              return (
                                <CarouselItem key={index} className="basis-4/5">
                                  <Card className="overflow-hidden">
                                    <CardContent className="p-0">
                                      <Link href={fullProduct ? `/product/${fullProduct.id}` : '#'} onClick={() => fullProduct && setIsOpen(false)}>
                                        <img
                                          src={product.imageUrl || 'https://placehold.co/200x200.png'}
                                          alt={product.name || 'product'}
                                          className="w-full h-auto aspect-square object-cover"
                                          data-ai-hint={product.name?.toLowerCase().split(' ').slice(0,2).join(' ')}
                                          loading="lazy"
                                        />
                                      </Link>
                                      <div className="p-3">
                                        <p className="font-semibold truncate">
                                          <Link href={fullProduct ? `/product/${fullProduct.id}` : '#'} onClick={() => fullProduct && setIsOpen(false)} className="hover:underline">
                                            {product.name}
                                          </Link>
                                        </p>
                                        <p className="text-sm text-primary font-bold">₹{product.price?.toLocaleString('en-IN')}</p>
                                        <Button size="sm" className="w-full mt-2" onClick={() => handleProductSelect(product)}>
                                          Add to Cart
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </CarouselItem>
                              )
                            })}
                          </CarouselContent>
                          <CarouselPrevious className="-left-2" />
                          <CarouselNext className="-right-2" />
                        </Carousel>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Sparkles className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <SheetFooter className="pt-4">
            <div className="flex w-full items-center gap-2">
              <Input
                type="text"
                placeholder="Ask about products..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <Button variant="ghost" size="icon" disabled={isLoading}><Mic /></Button>
              <Button variant="ghost" size="icon" disabled={isLoading}><ImageUp /></Button>
              <Button type="submit" size="icon" onClick={() => handleSendMessage()} disabled={isLoading}>
                <Send />
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
