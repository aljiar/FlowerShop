import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { Product, Category } from '@/data/products';

export default async function Home() {
  const { data: categoriesData } = await supabase.from('categories').select('*');
  const categories = (categoriesData as Category[]) || [];

  const { data: productsData } = await supabase.from('products').select('*').limit(4);
  const products = (productsData as Product[]) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-muted flex items-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1920&auto=format&fit=crop" 
          alt="Flores hermosas" 
          fill 
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 text-foreground drop-shadow-sm">
              Sentimientos que <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic drop-shadow-sm">florecen</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
              Expresa amor, gratitud y alegría con nuestros arreglos florales de primera calidad. Entregas frescas todos los días para sorprender a quien más quieres.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/productos" className="inline-flex items-center justify-center bg-primary text-background px-8 py-4 rounded-full font-medium text-lg hover:opacity-90 hover:scale-105 transition-all shadow-lg hover:shadow-primary/30">
                Ver Catálogo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Categorías Destacadas</h2>
            <p className="text-foreground/60 max-w-2xl text-lg">Encuentra el arreglo perfecto para cada ocasión especial.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, idx) => (
              <Link href="/productos" key={idx} className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explorar colección &rarr;</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-24 bg-muted/50 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl font-bold mb-4">Recién Llegados</h2>
              <p className="text-foreground/60 max-w-2xl text-lg">Nuestra selección curada de la temporada.</p>
            </div>
            <Link href="/productos" className="hidden sm:inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
              Ver todos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
            <Link href="/productos" className="inline-flex items-center text-primary font-medium border border-primary px-6 py-3 rounded-full hover:bg-primary/10 transition-colors">
              Ver todos los productos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
