import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { Product } from '@/data/products';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function CategoriaPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);

  // Fetch products inside this category, case-insensitive
  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .ilike('category_name', decodedName);
    
  const products = (productsData as Product[]) || [];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors mb-6 hover:-translate-x-1 duration-300">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
        </Link>
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 capitalize">
            {decodedName}
          </h1>
          <p className="text-foreground/60 text-lg max-w-2xl">
            Explora todos los ramos y arreglos exclusivos de nuestra colección de {decodedName.toLowerCase()}.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-2xl border border-primary/10">
            <p className="text-foreground/60 text-lg mb-4">Aún no hay ramos disponibles en esta categoría.</p>
            <Link href="/productos" className="inline-block bg-primary text-background px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all hover:shadow-lg">
              Ver Catálogo Completo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
