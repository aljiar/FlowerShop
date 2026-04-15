import Link from 'next/link';
import { Flower2, Heart, MessageCircle, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-primary/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2 space-y-6">
             <Link href="/" className="flex items-center space-x-2 group">
              <Flower2 className="h-8 w-8 text-primary" strokeWidth={1.5} />
              <span className="font-serif text-2xl font-bold tracking-tight">Elegance Florería</span>
            </Link>
            <p className="text-foreground/70 max-w-sm leading-relaxed">
              Expresamos tus sentimientos a través de arreglos florales únicos y llenos de vida. Entregas frescas todos los días.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-card flex items-center justify-center text-foreground/60 hover:text-primary hover:shadow-md transition-all shadow-sm">
                <Heart className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-card flex items-center justify-center text-foreground/60 hover:text-primary hover:shadow-md transition-all shadow-sm">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif font-bold text-lg mb-6">Enlaces</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary/50"></span> Inicio</Link></li>
              <li><Link href="/productos" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary/50"></span> Catálogo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-6">Ubicación</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-foreground/70">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Av. de las Rosas 123,<br/>Col. Primavera, CP 00000<br/>Ciudad, País</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-primary/10 text-center text-foreground/50 text-sm">
          © {new Date().getFullYear()} Elegance Florería. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
