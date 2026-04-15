import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { Product } from '@/data/products';

export default async function ProductosPage() {
  const { data: productsData } = await supabase.from('products').select('*');
  const products = (productsData as Product[]) || [];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Nuestro Catálogo</h1>
          <p className="text-foreground/60 text-lg max-w-2xl">
            Explora nuestra selecta variedad de arreglos florales, ramos y cajas exclusivas. Todo preparado con la mayor frescura y amor.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium cursor-pointer border border-primary/20">Todos</div>
          <div className="bg-muted px-4 py-2 rounded-full text-sm font-medium text-foreground/70 cursor-pointer hover:bg-primary/10 transition-colors">Ramos</div>
          <div className="bg-muted px-4 py-2 rounded-full text-sm font-medium text-foreground/70 cursor-pointer hover:bg-primary/10 transition-colors">Aniversarios</div>
          <div className="bg-muted px-4 py-2 rounded-full text-sm font-medium text-foreground/70 cursor-pointer hover:bg-primary/10 transition-colors">Condolencias</div>
          <div className="bg-muted px-4 py-2 rounded-full text-sm font-medium text-foreground/70 cursor-pointer hover:bg-primary/10 transition-colors">Exclusivos</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
