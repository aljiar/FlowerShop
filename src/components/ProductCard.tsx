'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { ShoppingBag } from 'lucide-react';
import PurchaseModal from './PurchaseModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuy = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="group flex flex-col bg-card rounded-2xl overflow-hidden shadow-sm border border-primary/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-foreground uppercase tracking-wider">
            {product.category_name}
          </div>
        </div>
        
        <div className="flex flex-col flex-1 p-6">
          <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-foreground/60 text-sm mb-4 line-clamp-2">{product.description}</p>
          
          <div className="mt-auto flex items-center justify-between">
            <p className="text-lg font-bold">
              Bs. {product.price.toLocaleString('es-BO')}
            </p>
            <button 
              onClick={handleBuy}
              className="flex items-center space-x-2 bg-foreground text-background px-4 py-2 rounded-full hover:bg-primary transition-colors font-medium text-sm group-hover:shadow-md"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Comprar</span>
            </button>
          </div>
        </div>
      </div>

      <PurchaseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  );
}
