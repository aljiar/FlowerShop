import Link from 'next/link';
import { Flower2, ShoppingBag, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <Flower2 className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" strokeWidth={1.5} />
            <span className="font-serif text-2xl font-bold tracking-tight">Elegance</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground/80 hover:text-primary transition-colors hover:scale-105">Inicio</Link>
            <Link href="/productos" className="text-foreground/80 hover:text-primary transition-colors hover:scale-105">Catálogo</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/productos" className="hidden sm:flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full hover:bg-primary/20 transition-all font-medium">
              <ShoppingBag className="h-5 w-5" />
              <span>Ver Catálogo</span>
            </Link>
            <button className="md:hidden text-foreground/80 hover:text-primary">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
